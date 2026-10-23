// The boot gate's Next hook (session-170, WP-3 — the scandihaven
// instrumentation.ts port). Next calls register() once per server
// bootstrap — dev, `next start`, and the standalone server.js — and a
// throw here refuses the boot (verified live: "Failed to prepare
// server Error: An error occurred while loading instrumentation hook").
//
// THE TWO SKIPS:
//  - the edge runtime has no Node contract (the seam reads process.env
//    through the passed record — but the hook itself never loads on edge);
//  - the phase-production-build workers: `next build` runs with
//    NODE_ENV=production but NO live traffic — a fresh clone without
//    .env must still build (the secret gate belongs to the SERVING
//    boot, not the artifact compiler; verified live this round).
//
// Dev/test boot soft by construction: bootEnvCheck only fatals when
// NODE_ENV === "production" — the DEV fallback posture documented in
// auth.ts is unchanged.

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "edge") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  const { applyBootEnvReport, bootEnvCheck } = await import("./lib/boot-env");
  applyBootEnvReport(bootEnvCheck(process.env));
}
