const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const readline = require("node:readline/promises");

function hiddenPassword(label) {
  return new Promise((resolve, reject) => {
    let value = "";
    process.stdout.write(label);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    const cleanup = () => {
      process.stdin.setRawMode(false);
      process.stdin.removeListener("data", onData);
      process.stdin.pause();
      process.stdout.write("\n");
    };
    function onData(chunk) {
      for (const char of chunk.toString()) {
        if (char === "\u0003") { cleanup(); reject(new Error("Setup cancelled")); return; }
        if (char === "\r" || char === "\n") { cleanup(); resolve(value); return; }
        if (char === "\u007f" || char === "\b") value = value.slice(0, -1);
        else if (char.charCodeAt(0) >= 32) value += char;
      }
    }
    process.stdin.on("data", onData);
  });
}

async function main() {
  if (!process.stdin.isTTY) throw new Error("Run setup in an interactive terminal.");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const email = (await rl.question("Admin email: ")).trim().toLowerCase();
  rl.close();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error("Enter a valid email.");
  const password = await hiddenPassword("Password (at least 12 characters, hidden): ");
  if (password.length < 12 || password.length > 1024) throw new Error("Use a password between 12 and 1024 characters.");
  const confirm = await hiddenPassword("Confirm password (hidden): ");
  if (password !== confirm) throw new Error("Passwords do not match.");
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = `scrypt$${salt}$${crypto.scryptSync(password, salt, 64, { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 }).toString("hex")}`;
  const secret = crypto.randomBytes(48).toString("base64url");
  const envPath = path.resolve(__dirname, "..", ".env.local");
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  content = content.replace(/^(?:ADMIN_EMAIL|ADMIN_PASSWORD_HASH|AUTH_SECRET|(?:NEXT_PUBLIC_)?CLERK_[A-Z_]+)=.*(?:\r?\n|$)/gm, "").trimEnd();
  const values = { ADMIN_EMAIL: email, ADMIN_PASSWORD_HASH: passwordHash, AUTH_SECRET: secret };
  // Next.js dotenv expands dollar signs, so escape them in the scrypt value.
  content += "\n\n# Single admin authentication\n" + Object.entries(values).map(([key, value]) => `${key}=${value.replaceAll("$", "\\$")}`).join("\n") + "\n";
  fs.writeFileSync(envPath, content, { mode: 0o600 });
  console.log("Admin account configured in .env.local. Restart the server, then open /sign-in.");
  console.log("For hosting, copy ADMIN_EMAIL, ADMIN_PASSWORD_HASH (without backslashes), and AUTH_SECRET into your private environment settings. Keep these values out of source control.");
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
