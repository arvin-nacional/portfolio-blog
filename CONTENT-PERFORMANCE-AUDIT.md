# Portfolio and blog performance audit

Audited October 7, 2026. Changes cover `/projects`, `/blog`, their detail pages, and shared content components.

## Measured results

Local production builds before and after the changes, using the same Node 24 runtime and configured MongoDB. Each route was requested three times sequentially. Sizes below are decimal KB/MB and include the complete streamed HTML/RSC response. They do not measure image downloads or browser LCP.

| Route | HTML before | HTML after | Reduction | Repeat full-response time before | After |
| --- | ---: | ---: | ---: | --- | --- |
| Portfolio listing | 76.8 KB | 68.3 KB | 11.1% | 150–1,161 ms | 23–32 ms |
| Blog listing | 67.5 KB | 64.0 KB | 5.2% | 101–104 ms | 14–15 ms |
| Sample portfolio detail | 701 KB | 65.5 KB | 90.7% | 250–349 ms | 18–29 ms |
| Sample blog detail | 5.12 MB | 81.5 KB | 98.4% | 1,729–2,950 ms | 17–18 ms |

Detail-page JavaScript decreased from approximately 344 KB to 253 KB with estimated gzip compression, a 26% reduction. Listing JavaScript increased by about 1.3 KB compressed because of pending-state handling and chunk changes. The measurement sums unique first-party scripts referenced by the document; deferred gallery code and third-party chat scripts are excluded.

Raw results: [before](audit-results/content-before.json), [after](audit-results/content-after.json). Reproduce with `node scripts/measure-content.cjs http://localhost:3001 audit-results/content-after.json` against a running production build.

## Findings and fixes

- Related content serialized a large base64 image into HTML/RSC. Embedded cover and gallery images now become content-versioned public image URLs, served separately with immutable caching. The observed 1,658,191-byte image produces an 8,270-byte optimized sidebar thumbnail. Existing remote Cloudinary URLs use HTTPS.
- The shared contact section rendered over a thousand decorative SVGs. A CSS grid now supplies the decoration while retaining its heading and contact link.
- Public content repeatedly queried MongoDB and populated oversized tag/category objects. Public queries now use lean projections, compact card excerpts and taxonomy fields, and 60-second tagged caches. Admin create/edit/delete actions immediately invalidate the relevant tags. Authentication stays outside the public data cache.
- Pagination issued a separate count query. Listings fetch one extra record to determine whether the next page exists. Category filters query projects directly; recent/related queries exclude the current record before limiting. Metadata and detail content share a request-level lookup.
- Sidebars delayed the main detail content. Suspense streams the main content independently while recent and related sections resolve.
- Every detail page shipped client HTML parsing and syntax grammars. HTML parsing and code highlighting now run on the server; grammars load only for content with language-marked code. The zoom lightbox loads when a gallery is opened.
- Search could navigate on initial mount and reset pagination incorrectly. Search now debounces changes, preserves other URL parameters, resets the page only when the query changes, and exposes pending status. Category filters also reset pagination and work on mobile.
- Loading screens mounted interactive search components. Static skeletons now reserve space without navigation effects. Listing empty states, retryable error boundaries, missing-record handling, descriptive image text, and responsive gallery buttons were added or corrected.

## Verification and limits

- Production build and TypeScript checks passed. ESLint has zero errors and 118 warnings, mostly pre-existing; warnings remain to be addressed separately.
- All 27 original checks passed, including cache/query behavior, image validation and binary responses, safe server code highlighting, and existing authentication/homepage regressions. They were subsequently migrated to Jest and reorganized into source-mirrored files, producing 29 passing tests across 18 suites. Tests use mocks and do not modify live content. See [testing guide](TESTING.md).
- Browser checks passed for portfolio search and empty results, category changes resetting pagination, blog search, gallery open/close, loaded hero images, and mobile listing/detail layouts at 390 px without horizontal overflow. [Rendered portfolio detail](audit-results/portfolio-detail-after.png).
- The actual image endpoint and Next image optimizer returned HTTP 200 with the expected image content and cache headers. Invalid detail IDs render Next's missing-page response; streaming may already have committed HTTP 200, as observed locally.
- Cold requests still depend on MongoDB, image processing and network latency: optimized sampled first responses ranged from 151 to 1,526 ms. Cache expiry can also incur background revalidation. These are local measurements, not deployed Core Web Vitals or a guaranteed visitor latency.
- Content changes through the app invalidate caches immediately. Changes made directly in MongoDB become visible through timed revalidation; they can briefly return stale content during revalidation. No production deployment or database schema/index changes were performed.
