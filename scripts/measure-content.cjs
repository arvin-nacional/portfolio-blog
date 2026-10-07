const fs = require("node:fs");
const { gzipSync } = require("node:zlib");
const base = process.argv[2] || "http://localhost:3002";
const output = process.argv[3] || "audit-results/content-timing.json";
const routes = ["/projects", "/blog", "/projects/699d29d161f1cd69155dc9fd", "/blog/672d938aac0cd023a8a7659b"];

(async () => {
  const measurements = [];
  for (const route of routes) {
    const samples = [];
    let html;
    for (let i = 0; i < 3; i++) {
      const start = performance.now();
      const response = await fetch(base + route);
      const headersMs = performance.now() - start;
      html = await response.text();
      samples.push({ status: response.status, headersMs: Math.round(headersMs), completeMs: Math.round(performance.now() - start) });
    }
    const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"?]+)[^"]*"/g)].map(match => match[1]).filter(src => src.startsWith("/_next/")))];
    let jsBytes = 0, jsGzipBytes = 0;
    for (const src of scripts) {
      const buffer = Buffer.from(await (await fetch(base + src)).arrayBuffer());
      jsBytes += buffer.length; jsGzipBytes += gzipSync(buffer).length;
    }
    const row = { route, samples, htmlBytes: Buffer.byteLength(html), jsFiles: scripts.length, jsBytes, jsGzipBytes };
    measurements.push(row);
    console.log(JSON.stringify(row));
  }
  fs.writeFileSync(output, JSON.stringify({ measuredAt: new Date().toISOString(), base, measurements }, null, 2) + "\n");
})().catch(error => { console.error(error.message); process.exitCode = 1; });
