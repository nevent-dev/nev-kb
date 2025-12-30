#!/bin/bash

# AWS Setup Script for NevKB Deployment
# This script sets up the initial AWS infrastructure for deploying NevKB
# Run this script ONCE to create S3 bucket, CloudFront Function, and OAC

set -e  # Exit on error

echo "🚀 Setting up AWS infrastructure for NevKB..."
echo ""

# Configuration
BUCKET_NAME="help.nevent.ai"
DOMAIN="help.nevent.ai"
REGION="us-east-1"

# Get AWS account ID
echo "📋 Getting AWS account information..."
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "")

if [ -z "$ACCOUNT_ID" ]; then
  echo "❌ Error: AWS CLI not configured or credentials invalid"
  echo "Run 'aws configure' to set up your AWS credentials first"
  exit 1
fi

echo "✅ AWS Configuration:"
echo "  - Bucket: $BUCKET_NAME"
echo "  - Domain: $DOMAIN"
echo "  - Region: $REGION"
echo "  - Account ID: $ACCOUNT_ID"
echo ""

# 1. Create S3 bucket
echo "📦 Creating S3 bucket..."
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
  echo "⚠️  Bucket already exists: $BUCKET_NAME"
else
  aws s3api create-bucket \
    --bucket "$BUCKET_NAME" \
    --region "$REGION" \
    --object-ownership BucketOwnerEnforced
  echo "✅ Bucket created"
fi

# 2. Enable versioning
echo "🔄 Enabling versioning..."
aws s3api put-bucket-versioning \
  --bucket "$BUCKET_NAME" \
  --versioning-configuration Status=Enabled
echo "✅ Versioning enabled"

# 3. Enable encryption
echo "🔒 Enabling encryption..."
aws s3api put-bucket-encryption \
  --bucket "$BUCKET_NAME" \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      },
      "BucketKeyEnabled": true
    }]
  }'
echo "✅ Encryption enabled"

# 4. Block public access
echo "🚫 Blocking public access..."
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
    BlockPublicAcls=true,\
IgnorePublicAcls=true,\
BlockPublicPolicy=true,\
RestrictPublicBuckets=true
echo "✅ Public access blocked"

# 5. Add tags
echo "🏷️  Adding tags..."
aws s3api put-bucket-tagging \
  --bucket "$BUCKET_NAME" \
  --tagging 'TagSet=[
    {Key=Project,Value=NevKB},
    {Key=Environment,Value=Production},
    {Key=ManagedBy,Value=Script}
  ]'
echo "✅ Tags added"

# 6. Create CloudFront Function
echo "⚡ Creating CloudFront Function..."
cat > /tmp/cf-function.js << 'EOF'
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
EOF

FUNCTION_NAME="url-rewrite-index-html"

# Check if function already exists
if aws cloudfront describe-function --name "$FUNCTION_NAME" 2>/dev/null; then
  echo "⚠️  CloudFront Function already exists: $FUNCTION_NAME"
else
  aws cloudfront create-function \
    --name "$FUNCTION_NAME" \
    --function-config Comment="Append index.html for Astro routing",Runtime=cloudfront-js-1.0 \
    --function-code fileb:///tmp/cf-function.js >/dev/null
  echo "✅ CloudFront Function created"
fi

# 7. Publish CloudFront Function
echo "📤 Publishing CloudFront Function..."
FUNCTION_ETAG=$(aws cloudfront describe-function \
  --name "$FUNCTION_NAME" \
  --query 'ETag' \
  --output text)

aws cloudfront publish-function \
  --name "$FUNCTION_NAME" \
  --if-match "$FUNCTION_ETAG" >/dev/null
echo "✅ CloudFront Function published"

# 8. Create CloudFront OAC
echo "🔐 Creating Origin Access Control..."
OAC_NAME="help-nevent-ai-OAC"

# Check if OAC already exists
EXISTING_OAC=$(aws cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?Name=='$OAC_NAME'].Id" \
  --output text 2>/dev/null || echo "")

if [ -n "$EXISTING_OAC" ]; then
  echo "⚠️  OAC already exists: $EXISTING_OAC"
  OAC_ID="$EXISTING_OAC"
else
  OAC_CONFIG="{
    \"Name\": \"$OAC_NAME\",
    \"Description\": \"OAC for help.nevent.ai S3 bucket\",
    \"SigningProtocol\": \"sigv4\",
    \"SigningBehavior\": \"always\",
    \"OriginAccessControlOriginType\": \"s3\"
  }"

  OAC_ID=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config "$OAC_CONFIG" \
    --query 'OriginAccessControl.Id' \
    --output text)
  echo "✅ OAC created"
fi

echo "  OAC ID: $OAC_ID"

# Save OAC ID for later use
echo "$OAC_ID" > .cloudfront-oac-id
echo "✅ OAC ID saved to .cloudfront-oac-id"

# Cleanup
rm -f /tmp/cf-function.js

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ AWS INFRASTRUCTURE SETUP COMPLETED!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  NEXT STEPS (Manual in AWS Console):"
echo ""
echo "1️⃣  REQUEST ACM CERTIFICATE:"
echo "   - Go to ACM in us-east-1 region"
echo "   - Request certificate for: $DOMAIN"
echo "   - Validation method: DNS"
echo "   - Add the CNAME record to Route 53"
echo "   - Wait for 'Issued' status (5-30 minutes)"
echo ""
echo "2️⃣  CREATE CLOUDFRONT DISTRIBUTION:"
echo "   - Origin domain: $BUCKET_NAME.s3.$REGION.amazonaws.com"
echo "   - Origin access: Use Origin Access Control"
echo "   - OAC ID: $OAC_ID"
echo "   - Alternate domain name (CNAME): $DOMAIN"
echo "   - SSL certificate: Select the ACM certificate"
echo "   - Viewer protocol: Redirect HTTP to HTTPS"
echo "   - Function association: Viewer request → $FUNCTION_NAME"
echo "   - Custom error response: 403 → /404.html (404 status)"
echo "   - Copy the Distribution ID for next step"
echo ""
echo "3️⃣  UPDATE S3 BUCKET POLICY:"
echo "   Run: ./scripts/update-bucket-policy.sh"
echo "   (You'll need the CloudFront distribution ID)"
echo ""
echo "4️⃣  CREATE ROUTE 53 RECORDS:"
echo "   - A record: Alias to CloudFront distribution"
echo "   - AAAA record: Alias to CloudFront distribution"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📚 For detailed instructions, see: docs/DEPLOYMENT_AWS.md"
echo ""
