# Arvin's blog and full-stack learning plan

Prepared October 8, 2026. Designed for someone who already builds apps and can spend 8–12 hours per week. Dates are suggested Sunday publication targets in Asia/Manila, not scheduled jobs.

## The direction

Use your website as a working laboratory: learn one concept, investigate or build something small, verify it, and publish what you learned. Aim to understand a system from browser to database to deployment, explain your choices, and learn unfamiliar tools confidently. Expertise grows through repeated practice; this roadmap is a first cycle, not a promise of mastering every technology in six months.

**Series:** Full-Stack Field Notes: Building and Improving My Portfolio.

**Primary reader:** developers who can build a basic app and want to understand how to make it reliable. Write for the developer who was one step behind you before this experiment. Your background in design and digital marketing gives you a useful angle: connect engineering decisions to usability and clear communication.

**Core stack:** deepen the stack already in this repository: TypeScript, React, Next.js, Node.js, Tailwind, MongoDB/Mongoose, Zod, iron-session, and Jest. Add PostgreSQL in one small local issue-tracker lab so you learn relational modeling without rebuilding your portfolio. Reuse that lab for transactions and background jobs.

**Starting checkpoint:** before the first experiment, check that you can explain semantic HTML, responsive CSS, JavaScript functions/objects/modules/promises, Git commits/branches, terminal basics, and the browser Network panel. Use one small task from your own site to expose gaps. Extend the foundation phase where needed; already shipping apps does not require every foundation to be equally strong.

## What the existing website gives you

- The blog already has rich-text editing, code blocks, images, tags, search, pagination, related articles, and homepage article cards.
- `HOMEPAGE-AUDIT.md` and `CONTENT-PERFORMANCE-AUDIT.md` document recent work that can become specific case studies. Reproduce or trace the relevant result before explaining it. These reports describe local checks; they do not establish current production behavior.
- The October 7 performance report records a sampled blog detail response shrinking from 5.12 MB to 81.5 KB, a 98.4% reduction in streamed HTML/RSC response size. This is useful evidence for a post about payloads. It is not a 98.4% improvement in page-load time or Core Web Vitals.
- The current post model has no draft or scheduled-publication field. Keep unfinished articles in local Markdown; creating a post makes it available to public queries.
- The form allows 1–3 tags and up to 10,000 characters of content, including HTML markup. Aim for about 600–900 words with one compact code example, and check the final editor content against the limit. Split larger explanations into linked articles.
- The subscription feature stores email addresses. A complete sending and unsubscribe workflow would be a separate project.

## The 24-post roadmap

Treat each week as one experiment, not a complete new product. Existing features can be traced, measured, or tested instead of rewritten. If a topic needs two weeks, move the later dates; publish a short investigation note only when it contains a useful result.

| # / target | Working title | What to learn and demonstrate |
| --- | --- | --- |
| 1 · Oct 18, 2026 | **How My Portfolio Blog Works, From Browser to Database** | Relaunch the blog with a request trace: DNS, TLS, HTTP methods/status/headers/cookies, Next.js rendering, MongoDB, and the browser. Follow one article through actual files and the Network panel; show one architecture diagram and one limitation you want to improve. |
| 2 · Oct 25 | **What a 98% Smaller Blog Response Actually Means** | Study serialization, HTML/RSC payloads, embedded images, and measurement. Explain one cause from the local performance audit, reproduce the measurement if practical, and distinguish bytes, response time, JavaScript, and visitor experience. |
| 3 · Nov 1 | **Testing My Portfolio With a Keyboard and a Small Screen** | Revisit semantic HTML, CSS layout, responsive design, focus, labels, and contrast. Trace the documented homepage fixes and check a single navigation journey at 320, 390, 768, and 1440 px. Include concrete observations and before/after evidence where available. |
| 4 · Nov 8 | **Why a Failed Form Must Never Say Success** | Deepen JavaScript promises, async/await, event-loop basics, and error handling. Trace the newsletter failure fix, then reproduce success and failure in an isolated test. Explain why cleanup and confirmed success need different behavior. |
| 5 · Nov 15 | **TypeScript and Zod Solve Different Problems** | Study narrowing, discriminated unions, compile-time checking, and runtime validation. Use one publishing-form field and one operation result to demonstrate valid input, malformed input, and a useful error. Verify the server boundary as well as the UI. |
| 6 · Nov 22 | **Keeping Blog Search in Sync With the URL** | Deepen React state, effects, derived state, and navigation. Trace the existing debounced search and pagination reset; exercise browser Back, clearing a query, and rapid typing. Explain which state belongs in the URL. |
| 7 · Nov 29 | **What Belongs on the Server in My Next.js Blog?** | Trace Server Components, Client Components, streaming, hydration, and serialized props. Show one interactive boundary and one server data lookup; explain what the browser receives. Use the installed Next.js documentation for version-specific behavior. |
| 8 · Dec 6 | **Designing a Small HTTP API That Fails Clearly** | Learn HTTP methods, status codes, request/response contracts, validation, and cookie/CORS basics. Build or sketch one local issue-list endpoint with bounded pagination and a consistent error response. Test success, bad input, and unavailable storage. |
| 9 · Dec 13 | **Measuring a MongoDB Query Before Adding an Index** | Study document modeling, projections, stable sorting, pagination, and index tradeoffs. Use synthetic local records and an explain plan for one blog-style query. Compare records examined and latency; include index storage/write costs and limits of the experiment. |
| 10 · Dec 20 | **Modeling a Small Issue Tracker in PostgreSQL** | Learn SQL, primary/foreign keys, joins, constraints, and migrations. Create a tiny local lab with projects and issues; add one migration and answer one useful query. Compare its relational model with your blog's document model. |
| 11 · Dec 27 | **How My Admin Area Decides Who Can Publish** | Distinguish authentication from authorization; trace session cookies, password verification, expiry, and mutation checks. Verify an unauthorized write is rejected in an isolated test. Explain the existing implementation before proposing changes. |
| 12 · Jan 3, 2027 | **Why Parsing Rich-Text HTML Is Not Sanitization** | Study stored XSS, trust boundaries, safe rendering, and validation. Inspect the publishing/rendering path and test harmless allowed/disallowed HTML examples locally. Explain what a parser does and what a sanitizer policy must do; report only verified findings. |
| 13 · Jan 10 | **When Should an Edited Blog Post Leave the Cache?** | Study cache keys, public versus private data, expiration, and invalidation. Demonstrate read → edit → read with fixtures. Compare the current implementation with the installed Next.js guidance before deciding whether a migration is useful. |
| 14 · Jan 17 | **Images Are a Backend Feature Too** | Trace upload validation, public image URLs, content versions, sizing, alt text, and cache headers. Follow one cover image to the media endpoint and optimized thumbnail. Verify a valid response and an invalid request. |
| 15 · Jan 24 | **Testing the Failure Paths of a Real Blog** | Deepen unit and integration test boundaries, fixtures, and useful assertions. Choose one behavior—such as an unauthorized mutation or failed subscription—and show what the existing Jest checks prove and what needs an integration/browser check. |
| 16 · Jan 31 | **A Browser Test for My Blog's Most Important Journey** | Learn end-to-end testing with Playwright in a local environment. Automate one journey: find an article, open it, and navigate back. Include empty results or keyboard behavior and explain how to avoid timing-dependent tests. |
| 17 · Feb 7 | **What Happens When Node.js Work Blocks the Event Loop?** | Deepen Node.js runtime behavior, I/O versus CPU work, and profiling. Make a tiny local experiment with a deliberately slow task and concurrent requests. Measure the effect and explain when a worker or separate service could help. |
| 18 · Feb 14 | **Preventing Two Requests From Claiming the Same Task** | Reuse the SQL issue-tracker lab to learn transactions, atomic updates, and concurrency. Simulate two claims for one issue; demonstrate one winner and a consistent final state. Compare one naive approach with one database-enforced solution. |
| 19 · Feb 21 | **Retrying a Background Job Without Duplicating Its Work** | Reuse the same lab for a small job table, worker, retries, and idempotency. Process a simulated notification without sending real messages. Force one failure and one duplicate delivery; show the resulting state and remaining limitations. |
| 20 · Feb 28 | **Following One Failed Request Through My Logs** | Learn structured logs, request IDs, metrics, and tracing concepts. Instrument one local request path and diagnose an injected failure. Explain the distinction between debugging data, an alert, and evidence that a user-facing operation failed. |
| 21 · Mar 7 | **Making One Deployment Easy to Verify and Undo** | Learn CI, configuration, build artifacts, health checks, and rollback. Prepare a small release workflow around the existing checks and rehearse a rollback in a disposable environment. Document database-change compatibility; do not assume a code rollback reverses a migration. |
| 22 · Mar 14 | **Threat-Modeling My Blog's Publishing Workflow** | Review the browser → session → mutation → database → HTML/image path against OWASP guidance. Pick three realistic failure/abuse cases, verify controls, and record one prioritized improvement. Security checks also belong in the earlier experiments. |
| 23 · Mar 21 | **Did My Website Improvements Help? Measuring Again** | Repeat selected performance and accessibility checks under comparable conditions; review metadata and indexing evidence if available. Separate local lab results, production field data, and traffic. Publish a small results table with uncertainty and next actions. |
| 24 · Mar 28 | **Six Months of Full-Stack Field Notes: What I Can Explain Now** | Write a portfolio case study: architecture, your contribution, key decisions, evidence, tradeoffs, and remaining gaps. Link the strongest articles and a working demo where available. Evaluate what you can now build and debug independently. |

## Briefs for the first four posts

### 1. How My Portfolio Blog Works, From Browser to Database

**Reader question:** What actually happens when someone opens an article?

Outline: why you are restarting the blog → browser/network request → route and server lookup → document and images → interactive client behavior → one failure path → the next thing you will investigate. Include a diagram and links to the relevant project/code where shareable. Introduce the series in a short paragraph; make the technical walkthrough the main value.

**Done when:** you can trace one real request and explain which layer owns each responsibility without following a tutorial.

### 2. What a 98% Smaller Blog Response Actually Means

**Reader question:** How can one image make an article response unexpectedly large?

Outline: the observed local payload → the embedded-image cause → serving image bytes separately → how the audit measured it → before/after table → what those numbers cannot tell us → next measurement. Start with one cause; leave the cache and streaming explanations for their own posts.

**Done when:** the table can be traced to the recorded audit or a repeat measurement, with units and environment clearly identified.

### 3. Testing My Portfolio With a Keyboard and a Small Screen

**Reader question:** How do I find usability problems that a desktop screenshot misses?

Outline: one user journey → viewport and keyboard checks → a concrete issue from the homepage audit → the relevant layout/semantic decision → observed result → a repeatable check readers can use. Explain why the design choice helps the user.

**Done when:** the journey is checked, screenshots have descriptive captions, and observations are separated from untested accessibility claims.

### 4. Why a Failed Form Must Never Say Success

**Reader question:** How can cleanup code accidentally report that a failed operation succeeded?

Outline: expected behavior → the old failure pattern documented in the audit → promise success/failure/cleanup → current flow → isolated success and failure checks → broader lesson for mutations. Keep the example small enough for readers to reason about.

**Done when:** you can explain the failure mechanism and show input preservation and truthful feedback after an injected failure.

## A weekly routine you can sustain

| Activity | Hours | Result |
| --- | --- | --- |
| Read the relevant official guide and define one question | 1.5 | A small hypothesis and a clear scope |
| Build, trace, or measure one experiment | 3.5 | Working behavior or useful evidence |
| Verify behavior and explain it without the guide | 1.5 | A test, measurement, or reproducible observation |
| Write and edit | 2 | A focused article with one example |
| Publish, connect articles, and review results | 0.5 | One finished post and links to its context |
| **Base total** | **9** | **One experiment and one article** |

With 8 hours, narrow the experiment rather than skip verification. With 12 hours, use the extra time for a harder failure case, a code review, and deliberate practice. Holiday weeks can move to a lighter note or a later target date.

Throughout the plan, practice Git branches, readable commits, reviewing diffs, debugging with breakpoints, and writing clear tradeoff notes. Spend 30–45 minutes each week on a practical data-structure exercise: arrays/maps/sets for lookup, queues for jobs, trees for navigation, and time/space complexity. Use examples you can connect to your current experiment.

Use appropriate behavior checks from the first experiment onward. Weeks 15–16 deepen testing rather than introduce it. When you first change application code, use the existing checks and establish a minimal automated check/build workflow if needed; week 21 builds on that with release verification and recovery.

Use AI to question your design, suggest failure cases, or review a draft. Before publishing, explain the key behavior yourself and rebuild one small part without following the generated answer. Write accurately about your contribution and assistance.

## The reusable article outline

1. **Problem:** one concrete reader question or observed failure.
2. **Context:** the smallest amount of architecture needed to understand it.
3. **Experiment:** what you tried, with a compact example or diagram.
4. **Decision:** one alternative and why you chose this approach.
5. **Evidence:** a behavior check, test, measurement, or screenshot.
6. **Limits:** what remains uncertain or outside the experiment.
7. **Takeaway:** something readers can apply, followed by the relevant demo/code and next article.

Use specific titles about a problem you investigated. Save broad claims of expertise for evidence you can support. Treat tutorials, investigations, and case studies as different forms: an investigation can be worthwhile even when it ends with a limitation rather than a shipped feature.

## Making the website active

During the first week, inventory the existing public posts and identify which are still accurate. The old homepage audit observed stale article dates, but the current live inventory has not been checked for this plan. Update an old article only after checking its claims; link it to newer material when useful.

For each new article:

- Use one shared series tag, such as `Full-Stack Field Notes`, and up to two topic tags supported by the existing 1–3-tag form.
- Add a clear opening summary, descriptive cover-image text, and readable code blocks. Verify the public page on mobile after publication.
- Link to the previous/next related post inside the content, and connect the article to a relevant portfolio project. The site has related-post behavior but no dedicated series field.
- Check the article title, description, share preview, canonical URL, and public accessibility. Early in the series, review sitemap/robots/indexing configuration against Google's guide; record missing work as a separate task. Clean slugs can be considered later with redirects.
- If you share the article publicly, post one useful finding and its URL in an appropriate place you already participate in. Answer follow-up questions and use them to improve the article or choose a later topic.

Keep a simple monthly log of published URLs, the lesson learned, the working evidence, reader questions, and available traffic data. Existing post-view counts should not be treated as unique readers or proof of engagement. Search impressions/clicks require indexing and access to the relevant reporting; traffic growth is an outcome to observe, not a guarantee from a publishing schedule.

**Success after 12 weeks:** up to 12 focused posts, evidence you can reproduce, a clearer understanding of your own stack, and several issues you can now debug without guessing. If fewer posts contain better work, keep that pace.

**Success after the first cycle:** an honest engineering case study and a list of remaining gaps, alongside the articles and experiments. Review progress every four posts and revise scope based on time and reader questions.

## Broadening after the first cycle

Use two substantial articles per month for the next six months, with the remaining time going into deeper projects. Choose tools to answer a technical question; broaden languages after you can operate the first stack reliably.

| Next phase | Two possible posts | Practical learning target |
| --- | --- | --- |
| Month 7: operating systems and deployment | **Running a Small App on Linux**; **Packaging My Lab With Docker** | Processes, ports, permissions, environment configuration, containers, networking, and persistent storage. Rehearse a backup restore. |
| Month 8: system design | **Estimating Capacity Before Changing Architecture**; **What Breaks When a Service Times Out?** | Basic capacity estimates, latency budgets, retries, backpressure, load testing, and failure recovery. Use measured constraints before splitting services. |
| Month 9: a second backend language | **Rebuilding One Endpoint in a Second Language**; **What Changed When I Kept the API Contract?** | Choose one language/framework based on a real project or job goal; implement the same endpoint and compare validation, errors, testing, and deployment. |
| Month 10: real-time and external integrations | **Keeping Two Screens in Sync**; **Handling the Same Webhook Twice** | WebSocket/SSE tradeoffs, reconnect behavior, webhook verification, and idempotency in a sandbox integration. |
| Month 11: a deliberate specialization | **A Small AI Feature With Measurable Quality**, if relevant; **Evaluating Its Cost, Latency, and Failure Modes** | Choose AI integration, deeper performance, or another area you want to specialize in. For AI, learn evaluation and data boundaries alongside the feature. |
| Month 12: collaboration and capstone | **A Contribution I Made to an Existing Project**; **A Full-Stack Case Study With Real Constraints** | Reading unfamiliar code, review, collaboration, architecture decisions, and an end-to-end product that uses the skills you have practiced. |

Keep a later backlog for drafts/preview publishing, an actual newsletter workflow, advanced SQL/query planning, deeper distributed systems, cloud infrastructure, and any language or framework that becomes relevant. A backlog preserves curiosity without making every interesting topic this week's obligation.

## Study references

Consulted October 8, 2026. Pick the guide for the current experiment rather than reading all of these in parallel.

| Topic | Primary reference |
| --- | --- |
| Web foundations and Git | [MDN core curriculum](https://developer.mozilla.org/en-US/curriculum/core/) |
| Accessibility | [W3C accessibility tutorials](https://www.w3.org/WAI/tutorials/) |
| React components and state | [React Learn](https://react.dev/learn) |
| TypeScript | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) |
| Next.js application concepts | [Next.js Learn](https://nextjs.org/learn) |
| Node.js runtime | [Node.js Learn](https://nodejs.org/learn/getting-started/introduction-to-nodejs) |
| MongoDB indexing | [MongoDB index documentation](https://www.mongodb.com/docs/manual/indexes/) |
| SQL and relational modeling | [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) |
| Application security | [OWASP Top 10](https://top10.owasp.org/2025/) |
| Browser testing | [Playwright documentation](https://playwright.dev/docs/intro) |
| CI | [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions) |
| Performance | [web.dev Learn Performance](https://web.dev/learn/performance) |
| Search discoverability | [Google Search Central SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |

### Version-specific notes for this repository

The repository's `AGENTS.md` requires reading the relevant guide in `node_modules/next/dist/docs/` before writing application code. The plan does not change application code.

The installed Server/Client Components guide was reviewed for this plan. The installed `unstable_cache` reference also says that API has been replaced by `use cache` in Next.js 16 and recommends Cache Components. The existing cache implementation is useful material to study, but an article should distinguish existing code from current guidance and assess migration prerequisites. Recheck the local guides before any later implementation.

Local evidence and starting points: `package.json`, `database/post.model.ts`, `lib/validations.ts`, `HOMEPAGE-AUDIT.md`, `CONTENT-PERFORMANCE-AUDIT.md`, and `TESTING.md`. No live content was read or published while preparing this plan.
