Next.js upgraded from 14 to 16.4.0, with React and React DOM 19.3.0. Webpack remains enabled explicitly to preserve the existing bundler configuration. Route params and search params now use asynchronous APIs, proxy.ts replaces middleware.ts, and ESLint's flat configuration replaces next lint. Detail pages use generateMetadata instead of next/head.

Clerk was removed at the owner's request and replaced with a single admin account, server-side authorization checks, and encrypted cookie sessions. See ADMIN-AUTH.md for private account setup and deployment configuration. No admin credentials were invented or written by the agent; login is disabled until the owner runs setup. Login/session tests use fictional credentials and isolated service adapters without writing to the live database.

Validation: production build, TypeScript, 19 tests, and lint completed successfully. Lint retains existing warnings, including new React Compiler diagnostics configured as warnings because the compiler is not enabled. Browser checks verified the sign-in screen and redirects for anonymous add/edit access. Public homepage and project pages rendered successfully.

The local runtime is Node 24.21.0; the hosting engine remains Node 22.x. The Tailwind configuration now explicitly creates its CommonJS require function to work with the local runtime's TypeScript loading.

Remaining dependency audit findings: 23 advisories (8 moderate, 15 high) across other dependencies; this update is not a complete dependency security audit. The Mongoose critical advisory was resolved with a compatible update. No forced dependency downgrades or unrelated major framework changes were applied.
