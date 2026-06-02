#!/usr/bin/env node
/**
 * IndexNow API submission for Bing, Yandex, Naver, Seznam.
 *
 * Usage:
 *   node scripts/indexnow-submit.js                    # submit all URLs from sitemap
 *   node scripts/indexnow-submit.js url1 url2 ...      # submit specific URLs
 *
 * Setup (one-time):
 *   1. Generate a 32-char key: openssl rand -hex 16
 *   2. Create public/{KEY}.txt with the key as its only content
 *   3. Replace REPLACE_WITH_GENERATED_KEY below with the actual key
 *   4. Add to package.json: "seo:indexnow": "node scripts/indexnow-submit.js"
 *
 * Requires: Node.js 22+ (built-in fetch). No extra npm deps needed.
 *
 * @see https://www.indexnow.org/documentation
 */

// ─── Configuration ─────────────────────────────────────────────────────────
// TODO: Replace with the actual 32-char key generated with: openssl rand -hex 16
// After replacing, rename public/REPLACE_WITH_GENERATED_KEY.txt to public/{KEY}.txt
const KEY = 'REPLACE_WITH_GENERATED_KEY';
const HOST = 'help.nevent.ai';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// IndexNow endpoints. All major search engines share key/verification,
// so submitting to one propagates to others. api.indexnow.org is the neutral endpoint.
const ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
];

// ─── Sitemap parsing ────────────────────────────────────────────────────────

/**
 * Parse a sitemap XML response and extract all <loc> URLs.
 *
 * @param {string} text - Raw XML content of a sitemap.
 * @returns {string[]} List of canonical URLs found in the sitemap.
 */
function extractLocsFromXml(text) {
  const locs = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(text)) !== null) {
    locs.push(match[1].trim());
  }
  return locs;
}

/**
 * Load all page URLs from the sitemap index.
 * Handles sitemap index files (sitemapindex > sitemap > loc) and
 * standard sitemaps (urlset > url > loc) transparently.
 *
 * @returns {Promise<string[]>} All canonical page URLs across all sub-sitemaps.
 */
async function loadUrlsFromSitemap() {
  const sitemapIndexUrl = `https://${HOST}/sitemap-index.xml`;
  console.log(`Fetching sitemap index: ${sitemapIndexUrl}`);

  const indexRes = await fetch(sitemapIndexUrl);
  if (!indexRes.ok) {
    throw new Error(`Failed to fetch sitemap index: ${indexRes.status} ${indexRes.statusText}`);
  }
  const indexText = await indexRes.text();

  // Detect if this is a sitemapindex (contains <sitemapindex>) or a single sitemap
  const isSitemapIndex = indexText.includes('<sitemapindex');
  if (!isSitemapIndex) {
    // Single sitemap — extract URLs directly
    return extractLocsFromXml(indexText);
  }

  // Extract sub-sitemap URLs from the index
  const subSitemapUrls = extractLocsFromXml(indexText);
  console.log(`Found ${subSitemapUrls.length} sub-sitemaps`);

  // Fetch each sub-sitemap and collect page URLs
  const allUrls = [];
  for (const subUrl of subSitemapUrls) {
    console.log(`  Fetching: ${subUrl}`);
    try {
      const subRes = await fetch(subUrl);
      if (!subRes.ok) {
        console.warn(`  Warning: ${subUrl} returned ${subRes.status} — skipping`);
        continue;
      }
      const subText = await subRes.text();
      const pageUrls = extractLocsFromXml(subText);
      allUrls.push(...pageUrls);
      console.log(`  Found ${pageUrls.length} URLs`);
    } catch (err) {
      console.warn(`  Warning: could not fetch ${subUrl}: ${err.message}`);
    }
  }

  return allUrls;
}

// ─── Submission ─────────────────────────────────────────────────────────────

/**
 * Submit a list of URLs to IndexNow endpoints.
 * Splits into batches of 10,000 URLs (API limit) automatically.
 *
 * @param {string[]} urls - Canonical URLs to submit (must belong to HOST).
 * @returns {Promise<void>}
 */
async function submit(urls) {
  if (urls.length === 0) {
    console.log('No URLs to submit.');
    return;
  }

  if (KEY === 'REPLACE_WITH_GENERATED_KEY') {
    console.error('ERROR: IndexNow key not configured.');
    console.error('Run: openssl rand -hex 16');
    console.error('Then update KEY in this script and create public/{KEY}.txt');
    process.exit(1);
  }

  // IndexNow API allows up to 10,000 URLs per request
  const BATCH_SIZE = 10_000;
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`\nSubmitting ${urls.length} URLs in ${batches.length} batch(es)...`);

  for (const [batchIndex, batch] of batches.entries()) {
    console.log(`\nBatch ${batchIndex + 1}/${batches.length} (${batch.length} URLs)`);

    for (const endpoint of ENDPOINTS) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: batch,
          }),
        });
        const status = `${res.status} ${res.statusText}`;
        if (res.ok || res.status === 202) {
          console.log(`  ${endpoint}: OK (${status})`);
        } else {
          console.warn(`  ${endpoint}: WARN (${status})`);
          const body = await res.text().catch(() => '');
          if (body) console.warn(`  Response: ${body}`);
        }
      } catch (err) {
        console.error(`  ${endpoint}: ERROR — ${err.message}`);
      }
    }
  }

  console.log('\nDone.');
}

// ─── Main ────────────────────────────────────────────────────────────────────

const cliUrls = process.argv.slice(2);

if (cliUrls.length > 0) {
  // Explicit URLs provided as CLI args
  console.log(`Submitting ${cliUrls.length} URL(s) from CLI arguments...`);
  await submit(cliUrls);
} else {
  // Load from sitemap
  console.log('No URLs provided — loading from sitemap...');
  try {
    const allUrls = await loadUrlsFromSitemap();
    console.log(`Total URLs found: ${allUrls.length}`);
    await submit(allUrls);
  } catch (err) {
    console.error(`Failed to load sitemap: ${err.message}`);
    process.exit(1);
  }
}
