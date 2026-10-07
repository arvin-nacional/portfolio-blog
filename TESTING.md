# Tests

The unit tests use Jest 30 in a Node environment. Assertions use `node:assert/strict`; Jest discovers, runs, and reports the tests. No live database writes or external service requests are made.

## Commands

```sh
npm test
npm run test:watch
npm run test:ci
```

Run a specific suite with its source-mirrored path:

```sh
npm test -- --runTestsByPath tests/lib/auth/password.test.cjs
```

The test command enables Node's VM module support so the real ESM session library can be imported for encryption/tampering tests. Node prints an experimental VM modules notice. Use the project's Node 22 runtime; the session library requires Node 22.13 or newer.

## Organization

Test paths mirror source paths, with `.test.cjs` replacing the source extension. This project has root-level `app`, `components`, `lib`, and `scripts` folders rather than a `src` folder.

| Source | Test |
| --- | --- |
| `lib/auth/password.ts` | `tests/lib/auth/password.test.cjs` |
| `lib/actions/post.action.ts` | `tests/lib/actions/post.action.test.cjs` |
| `components/forms/Subscriber.tsx` | `tests/components/forms/Subscriber.test.cjs` |
| `components/shared/ParseHTML.tsx` | `tests/components/shared/ParseHTML.test.cjs` |
| `app/media/[collection]/[id]/[version]/route.ts` | `tests/app/media/[collection]/[id]/[version]/route.test.cjs` |
| `scripts/setup-admin.cjs` | `tests/scripts/setup-admin.test.cjs` |

Shared fixture and source-loading helpers live in `tests/helpers/`. Tests use TypeScript's transpiler and isolated VM contexts to inject mocked MongoDB, Next cache/navigation APIs, and service adapters without loading real environment files. Cookie encryption and password hashing use the actual libraries.

The original 27 checks are preserved. Separating post/project actions and the Projects/Blogs components into their own mirrored suites produces 29 tests across 18 suites.

These are unit/regression checks. Component tests exercise rendering or submission logic with adapters; they are not a browser DOM or full Next.js Server Component integration test. Responsive layouts, navigation, and galleries were checked separately in the browser during the performance audit.
