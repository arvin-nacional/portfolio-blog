The website uses one admin account and encrypted, HTTP-only session cookies through iron-session. Clerk is no longer required. Public browsing, contact, and newsletter forms stay available without signing in.

Run `node scripts/setup-admin.cjs` from an interactive terminal in this project. Enter your admin email and password; password input is hidden. The command saves only a salted scrypt hash and a random session secret to the ignored `.env.local` file. Restart the server and visit `/sign-in`.

For deployment, add `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `AUTH_SECRET` to the hosting provider's private environment settings. Copy the password hash without the escaping backslashes used in `.env.local`. Do not use a `NEXT_PUBLIC_` prefix. Production requires HTTPS for its secure cookie.

Sessions expire after eight hours. Rerunning setup replaces the account credentials and secret, invalidating existing sessions. Ten attempts per fifteen-minute window are allowed for the single account, using an atomic MongoDB counter shared across server instances. Failed database access denies sign-in.

Add/edit pages, all six publishing mutation actions, and admin controls check the session on the server. Admin login remains disabled until configuration is complete. Sign out is available in the admin toolbar.
