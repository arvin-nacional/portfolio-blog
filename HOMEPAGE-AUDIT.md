# Homepage audit — October 7, 2026

## Implementation update

The homepage fixes have been implemented locally. The hero now uses content-driven height and fluid imagery, keyboard-accessible menus cover mobile and tablet widths, and selected projects follow the hero. Newsletter errors preserve the input and never show success; project and article failures have independent retry states. Cards render short text excerpts, the video has native controls, the decorative CTA uses CSS, and copy, metadata, focus styling, social links, and headings have been cleaned up.

Verified at 320, 390, 700, 768, and 1440px widths. The 320px heading is below the fixed header with no horizontal overflow. Keyboard menu opening, mobile project navigation, carousel advancement, one main heading, and the absence of drafting notes in homepage card content were checked in the browser. TypeScript, ten isolated regression tests, Next.js core lint checks, and the diff whitespace check pass. The full repository lint command remains blocked by its existing missing `eslint-plugin-n` dependency. No valid subscription, database content edit, or deployment was performed. Draft text on project detail pages remains an editorial follow-up requiring verified project information.

Verification screenshots: `audit-results/homepage-desktop.png` and `audit-results/homepage-mobile.png`. Regression tests: `node --test tests/homepage.test.cjs`.

The original findings below are retained as the audit record.

Reviewed the homepage source and local development preview connected to the configured database. Checked desktop at 1440×900, tablet at 700×900, mobile at 390×844, and a compact screen at 320×568. This is a local audit, not a production performance or availability measurement. No application source was changed.

## Repair order

### 1. High: Compact screens lose the hero heading

At 320×568 with scrollY = 0, the hero heading begins at y = -66px. Its bottom is approximately 46px, while the fixed navigation extends to 84px. Much of the heading is outside the viewport or behind navigation. The fixed `h-screen` container centers a stack taller than the available height.

Source: `components/Hero2.tsx:22`.

Use content-driven height, a minimum viewport height, and sufficient top padding for the header. Make the illustration fluid. At 390px, its 350px width exceeds the actual 311px content area by 39px; at 320px, it extends beyond the viewport. Verify the complete headline and CTA remain reachable at both sizes and with enlarged text.

### 2. High: Tablet visitors lose main navigation

At 700px, desktop navigation is hidden and the visible menu opens the contact/subscription sidebar without Home, About, Portfolio, Blog, Services, or Contact navigation. Desktop links hide below 768px; mobile navigation hides from 640px upward.

Sources: `components/shared/navbar/Navbar.tsx:44`, `MobileNav.tsx:63`, and `Sidebar.tsx:27`.

Align the responsive breakpoints and keep a complete navigation menu available at every width. Use a labeled button for each trigger instead of an image with click behavior.

### 3. High: Newsletter saving failures show success

The form resets and shows “Subscribed” inside `finally`, so failures also trigger success feedback. The server action catches failures without returning a structured failure result or throwing. Empty-email validation works in the browser, but no valid subscription was submitted during this audit.

Sources: `components/forms/Subscriber.tsx:45`, `lib/actions/subscriber.action.ts:18`.

Only reset and show success after a confirmed save. Preserve the email on failure, show an actionable error, and provide a retry. Add an input label, email type/autocomplete, and visible keyboard focus.

### 4. High: Database failures have no local recovery

With restricted network access, the initial page rendered and then a project query timeout replaced it with a development runtime error. After approved network access, project and blog data loaded successfully. The original timeout is not evidence that the deployed database is unavailable.

Sources: `app/(root)/(home)/page.tsx:24`, `lib/actions/project.action.ts:256`, `lib/actions/post.action.ts:172`, and `lib/mongoose.ts`.

Loading skeletons do not provide error recovery. Await a shared database connection promise and handle failure within each data section so the hero, services, and contact information remain available. Distinguish loading, empty, and failed states.

### 5. Medium: Positioning is broad and evidence arrives late

The headline does not specify an audience or concrete outcome. The page switches between “I,” “we,” and “our creative team.” Projects begin approximately 3,374px down the desktop page, after the branding video, About, and Services.

Sources: `components/Hero2.tsx`, `components/Services.tsx`, and the homepage section order.

Clarify who you serve and what you deliver. Keep the voice consistent. Add a “View my work” action near the hero and bring selected project evidence closer to it. Present your actual role and outcomes instead of broad claims about dominating a market.

### 6. Medium: Homepage cards expose entire articles and draft content

Project and blog cards render complete rich HTML, then visually clamp it. The accessibility tree includes full article bodies, headings, tables, and lists. The Worship Chord Transposer content includes “Technical Stack & Architecture (suggested / presumed)” and “You may adjust this based on your actual implementation.” Those notes are exposed in the homepage DOM/accessibility tree, even though they are outside the visible excerpt.

Sources: `components/ui/projectCard.tsx`, `components/ui/blogCard.tsx`, and `components/shared/ParseHTML.tsx`.

Use concise plain-text summaries for homepage cards. Keep full content on detail pages and replace drafting notes with verified implementation details. This also avoids bringing syntax highlighting for complete articles into every card.

### 7. Medium: “Recent news” appears stale

The newest displayed blog post is November 8, 2024, almost two years before this audit. The section title “Recent news and updates” emphasizes the gap.

Source: loaded homepage blog content and `components/Blogs.tsx`.

Rename the section to “Articles and insights” for evergreen content, or publish current material before presenting it as news.

### 8. Medium: Accessibility and page semantics need cleanup

Menu images have neither button semantics nor a tabindex. The video has mouse-only play/pause behavior without native controls. Social links are announced as “logo,” and decorative icons add redundant words to contact links. Several section titles use h1, and card dates use h2. The dark blue About/Services contact links are visually subdued against dark backgrounds.

Use semantic buttons and accessible media controls, meaningful link names, empty alt text for decorative images, logical section headings, time elements for dates, and brighter contact-link styling. Check keyboard access and contrast after changing styles.

### 9. Medium: Decorative rendering and metadata need improvement

The closing CTA builds 2,025 animated cells plus row wrappers and SVGs. The loaded desktop DOM had approximately 4,006 elements. These are code/DOM observations, not a measured performance regression. Replace the decorative grid with CSS or a substantially smaller effect.

Sources: `components/ui/background-boxes.tsx:7`, `app/layout.tsx:22`.

The metadata title omits Arvin Paul, and the description contains “understandingof” and “combinecreativity.” Use a concise name-and-service title and a polished description.

## Verified behavior and limits

- Project and blog records loaded successfully with approved network access. Thumbnails completed loading; initial blank image areas were transient.
- Both carousel Next controls work and enable Previous after advancing.
- About anchor navigation reaches the section; its content remains below the fixed header because of existing section spacing.
- The 390px mobile menu opens and exposes all six navigation destinations.
- Empty newsletter submission produces “Invalid email” without saving a subscription.
- No valid newsletter submission, contact message, database edit, or production change was performed.
- Production Core Web Vitals, search indexing, full assistive-technology behavior, and remote destination availability were not measured.
