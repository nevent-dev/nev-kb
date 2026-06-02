#!/usr/bin/env bash
#
# Deploy script para help.nevent.ai
#
# Ejecuta:
#   1. Build de Astro
#   2. S3 sync con Cache-Control granular (5 passes)
#   3. CloudFront invalidation
#   4. IndexNow submission a Bing/Yandex/Naver
#   5. Verificacion post-deploy
#
# Requisitos:
#   - Node 22+ (con nvm: 'nvm use 22')
#   - AWS CLI con credenciales validas para el bucket y distribution
#
# Uso:
#   ./scripts/deploy.sh
#   o bien
#   npm run deploy

set -euo pipefail

BUCKET="help.nevent.ai"
REGION="eu-west-1"
DISTRIBUTION_ID="E272KMWLLZW6G1"
SITE="https://help.nevent.ai"

cd "$(dirname "$0")/.."  # repo root

echo ""
echo "=== 1/5: Build ==="
echo ""
rm -rf dist .astro
npm run build
du -sh dist/
PAGE_COUNT=$(find dist -name "index.html" | wc -l | tr -d ' ')
echo "Paginas generadas: $PAGE_COUNT"

echo ""
echo "=== 2/5: S3 sync con Cache-Control granular ==="
echo ""

# 2a. HTML pages (60s, must-revalidate, --delete)
echo "-- HTML (60s, --delete) --"
aws s3 sync dist/ "s3://${BUCKET}/" \
  --delete \
  --region "$REGION" \
  --cache-control "public, max-age=60, must-revalidate" \
  --exclude "_astro/*" \
  --exclude "*.js" --exclude "*.css" \
  --exclude "*.png" --exclude "*.jpg" --exclude "*.jpeg" \
  --exclude "*.svg" --exclude "*.webp" --exclude "*.ico" \
  --exclude "*.woff*" --exclude "*.ttf" \
  --exclude "llms*.txt" --exclude "robots.txt" \
  --exclude "sitemap*.xml" --exclude "pagefind/*" \
  --exclude ".well-known/*" \
  --only-show-errors

# 2b. Assets con hash (immutable 1 ano)
echo "-- Assets immutable --"
aws s3 sync dist/ "s3://${BUCKET}/" \
  --region "$REGION" \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*" \
  --include "_astro/*" --include "pagefind/*" \
  --only-show-errors

# 2c. Imagenes (1 ano)
echo "-- Imagenes (1y) --"
aws s3 sync dist/ "s3://${BUCKET}/" \
  --region "$REGION" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "og/*" --include "images/*" \
  --include "favicon*" --include "apple-touch-icon*" \
  --only-show-errors

# 2d. LLMs txt files (300s)
echo "-- llms*.txt (300s) --"
aws s3 sync dist/ "s3://${BUCKET}/" \
  --region "$REGION" \
  --cache-control "public, max-age=300, must-revalidate" \
  --exclude "*" \
  --include "llms.txt" --include "llms-full.txt" --include "llms-small.txt" \
  --only-show-errors

# 2e. robots, sitemaps (1 hora)
echo "-- robots/sitemap --"
aws s3 sync dist/ "s3://${BUCKET}/" \
  --region "$REGION" \
  --cache-control "public, max-age=3600" \
  --exclude "*" \
  --include "robots.txt" --include "sitemap*.xml" \
  --only-show-errors

# llms-policy.txt y security.txt (24h)
echo "-- llms-policy.txt + security.txt (24h) --"
aws s3 cp dist/llms-policy.txt "s3://${BUCKET}/llms-policy.txt" \
  --region "$REGION" \
  --cache-control "public, max-age=86400, must-revalidate"

if [ -f dist/.well-known/security.txt ]; then
  aws s3 cp dist/.well-known/security.txt "s3://${BUCKET}/.well-known/security.txt" \
    --region "$REGION" \
    --cache-control "public, max-age=86400"
fi

echo ""
echo "=== 3/5: CloudFront invalidation ==="
echo ""

INVALIDATION_OUTPUT=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query "Invalidation.{Id:Id,Status:Status}" \
  --output json)
echo "$INVALIDATION_OUTPUT"
INVALIDATION_ID=$(echo "$INVALIDATION_OUTPUT" | grep -oE '"Id": "[^"]+"' | cut -d'"' -f4)

echo "Esperando propagacion inicial (50s)..."
sleep 50

echo ""
echo "=== 4/5: IndexNow submission ==="
echo ""

# IndexNow necesita que el key file este accesible en produccion
# Detectar el key file automaticamente
KEY_FILE=$(ls public/*.txt 2>/dev/null | grep -v REPLACE | grep -v llms | grep -v robots | head -1 | xargs basename 2>/dev/null || echo "")

if [ -z "$KEY_FILE" ]; then
  echo "WARN: No se encontro key file en public/. Saltando IndexNow."
else
  echo "Key file detectado: $KEY_FILE"
  KEY_URL="${SITE}/${KEY_FILE}"
  KEY_STATUS=$(curl -s -o /dev/null -w '%{http_code}' "$KEY_URL")
  if [ "$KEY_STATUS" = "200" ]; then
    echo "Key file accesible en $KEY_URL (200 OK)"
    node scripts/indexnow-submit.js || echo "WARN: IndexNow submission fallo (no bloquea)"
  else
    echo "WARN: Key file NO accesible ($KEY_STATUS). Saltando IndexNow."
    echo "Esto puede pasar en el primer deploy. Re-ejecuta el script en el siguiente deploy."
  fi
fi

echo ""
echo "=== 5/5: Verificacion post-deploy ==="
echo ""

# Spot checks de paginas criticas
ROUTES=(
  "/"
  "/segmentacion/motor-segmentacion/categorias/"
  "/segmentacion/capacidades/"
  "/segmentacion/casos/"
  "/analitica/"
  "/analitica/casos/"
  "/en/segmentation/use-cases/"
  "/en/analytics/use-cases/"
  "/nevent-ai/"
  "/llms.txt"
  "/llms-policy.txt"
  "/robots.txt"
  "/.well-known/security.txt"
)

FAIL_COUNT=0
for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w '%{http_code}' "${SITE}${route}")
  if [ "$STATUS" = "200" ]; then
    echo "  OK  $STATUS  $route"
  else
    echo "  WARN  $STATUS  $route"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done

if [ $FAIL_COUNT -gt 0 ]; then
  echo ""
  echo "WARN: $FAIL_COUNT URLs no devolvieron 200. Revisar manualmente."
  exit 1
fi

echo ""
echo "Deploy completado:"
echo "   - Paginas: $PAGE_COUNT"
echo "   - Invalidation: $INVALIDATION_ID"
echo "   - Verificacion: todas las URLs OK"
echo ""
