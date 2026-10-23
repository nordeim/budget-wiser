import type { NextConfig } from "next";
import path from "node:path";

// Standalone output keeps the production server self-contained (the e2e
// suite boots .next/standalone/server.js on an isolated port with its own
// SQLite file). outputFileTracingRoot is pinned so the traced
// prisma/schema.prisma copy lands at a stable location for the db-path
// resolver (src/lib/db-path.ts).

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(import.meta.dirname),
  // Session-170 (F-170a — THE ARTIFACT HYGIENE): the upload family's
  // runtime-computed fs paths (uploads.ts's validated-anchor
  // existsSync/resolve chains) make @vercel/nft fall back to tracing the
  // WHOLE repo root — every repo-root entry landed in
  // app/api/upload/route.js.nft.json (2715 skills files alone), shipping
  // .env (the real AUTH_SECRET), .git/ (171 MB), db/ (the dev SQLite
  // file with user rows), uploads/, skills/ (194 MB) and docs/ (49 MB)
  // inside every deployable artifact (~550 MB where ~151 MB suffices).
  // The excludes keep the artifact to the server's true runtime needs
  // (verified live: the photo-upload e2e pair ran GREEN against the
  // clean artifact — prisma/schema.prisma stays traced, the db-path
  // anchors still validate, db/ and uploads/ are mkdir'd on demand).
  // Next's own writeStandaloneDirectory ALSO copies .env explicitly
  // (build/index.js — immune to excludes): the build script's trailing
  // `rm -f .next/standalone/.env` removes that copy (the double-cure).
  outputFileTracingExcludes: {
    "*": [
      ".env",
      ".env.example",
      ".git/**",
      "db/**",
      "uploads/**",
      "skills/**",
      "docs/**",
      "test-results/**",
      "AGENTS.md",
      "CLAUDE.md",
      "README.md",
      "Project_Architecture_Document.md",
      "neo-crm_SKILL.md",
      "worklog.md",
      "neo-crm-homepage.png",
      "dev.log",
      "bun.lock",
      "package-lock.json",
      "components.json",
      "eslint.config.mjs",
      "playwright.config.ts",
      "postcss.config.mjs",
      "tsconfig.json",
      "tsconfig.tsbuildinfo",
      "vitest.config.ts",
      "scripts/**",
      "tests/**",
    ],
  },
  // Hide the Next.js dev-tools indicator (the floating "N" button) so dev
  // server screenshots stay clean — it never ships in production anyway.
  devIndicators: false,
  // The scaffold family keeps the explicit `bun run typecheck` step as the
  // type gate; build errors stay visible without breaking container builds.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Session-20 (S20-P1/P2/P3): the reference's edge (Cloudflare/Caddy)
  // injects a three-header security set on EVERY response — HTML routes,
  // authed routes, its hashed CSS asset, /manifest.json, and its SPA
  // fallback 200s (curl-verified on 10+ responses, 2026-10-01). The
  // self-hosted expression is this headers() block. HSTS ships as the
  // reference's exact bare value; per RFC 6797 §7.1 a UA MUST NOT process
  // it over non-secure transport, so it is inert on plain-HTTP localhost
  // and correct whenever a deployment runs behind HTTPS.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
