// Run separately: bun test ./scripts/verify-portfolio-cache.ts
// Real Next.js Data Cache + admin route; only persistence/auth are test doubles.
import { test, expect, mock, spyOn, afterAll } from "bun:test";
// Next 16.1 uses millisecond timestamps for local tag expiry. Advance the clock
// between simulated requests so an in-memory DB write cannot share a cache timestamp.
let requestTime = Date.now();
const dateNow = spyOn(Date, "now").mockImplementation(() => requestTime);
afterAll(() => dateNow.mockRestore());
import { AsyncLocalStorage } from "node:async_hooks";
Object.assign(globalThis, { AsyncLocalStorage });
process.env.CMS_DATA_SOURCE = "database";
const category = {
  slug: "ngo",
  index: "01",
  title: "NGO",
  description: { id: "Organisasi", en: "Organizations" },
  accent: "#fff",
  status: "active",
  sortOrder: 0,
};
let row = {
  slug: "cache-verification",
  index: "01",
  name: "Original",
  categorySlug: "ngo",
  tagline: { id: "Awal", en: "Initial" },
  summary: { id: "Ringkasan", en: "Summary" },
  year: "2026",
  client: "Example",
  industry: "NGO",
  cover: "/cover.webp",
  accent: "#fff",
  status: "published",
  type: "client",
  visibility: "public",
  sortOrder: 0,
  role: { id: "Desain", en: "Design" },
  techStack: [],
  techIntro: null,
  category,
  sections: [],
  technologies: [],
  media: [],
  nextProjectSlug: null,
  liveUrl: null,
};
let reads = 0;
mock.module("@/lib/cms/db", () => ({
  prisma: {
    category: { findMany: async () => [category] },
    project: {
      findFirst: async ({
        where,
      }: {
        where: { slug: string; visibility: string; status: { not: string } };
      }) => {
        reads++;
        expect(where.visibility).toBe("public");
        expect(where.status.not).toBe("draft");
        return row &&
          row.slug === where.slug &&
          row.visibility === where.visibility &&
          row.status !== where.status.not
          ? structuredClone(row)
          : null;
      },
      findUnique: async () => structuredClone(row),
      update: async ({ data }: { data: Partial<typeof row> }) =>
        (row = { ...row, ...data }),
    },
  },
}));
mock.module("@/lib/admin-auth", () => ({
  requireAdmin: async () => ({ id: "test-admin" }),
}));
const { IncrementalCache } =
  await import("next/dist/server/lib/incremental-cache");
const { nodeFs } = await import("next/dist/server/lib/node-fs-methods");
const { workAsyncStorage } =
  await import("next/dist/server/app-render/work-async-storage.external");
const incrementalCache = new IncrementalCache({
  fs: nodeFs,
  dev: false,
  flushToDisk: false,
  serverDistDir: "/tmp/nauka-cache-verification",
  maxMemoryCacheSize: 5_000_000,
  requestHeaders: {},
  getPrerenderManifest: () => ({
    version: 4,
    routes: {},
    dynamicRoutes: {},
    notFoundRoutes: [],
    preview: {
      previewModeId: "test",
      previewModeSigningKey: "test",
      previewModeEncryptionKey: "test",
    },
  }),
});
Object.assign(globalThis, { __incrementalCache: incrementalCache });
const { getProjectBySlug, getCategoryBySlug } = await import("../src/lib/cms");
const { PUT } = await import("../src/app/api/admin/projects/[slug]/route");
const { NextRequest } = await import("next/server");
async function save(data: Record<string, unknown>) {
  requestTime += 10;
  const store = {
    route: "/api/admin/projects/cache-verification",
    incrementalCache,
    pendingRevalidatedTags: [],
  } as unknown as Parameters<typeof workAsyncStorage.run>[0];
  const response = await workAsyncStorage.run(store, () =>
    PUT(
      new NextRequest(
        "https://motion.nauka.id/api/admin/projects/cache-verification",
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        },
      ),
      { params: Promise.resolve({ slug: "cache-verification" }) },
    ),
  );
  expect(response.status).toBe(200);
  // Next's route handler flushes these queued invalidations after the response.
  for (const { tag, profile } of store.pendingRevalidatedTags ?? []) {
    await incrementalCache.revalidateTag(
      tag,
      typeof profile === "object" ? profile : undefined,
    );
  }
}
test("warm reads reuse data; admin edits, unpublishing and republishing take effect on the next read", async () => {
  expect((await getProjectBySlug(row.slug))?.name).toBe("Original");
  expect((await getProjectBySlug(row.slug))?.name).toBe("Original");
  expect(reads).toBe(1);
  expect((await getCategoryBySlug("ngo"))?.title).toBe("NGO");
  expect(await getCategoryBySlug("not-a-category")).toBeUndefined();
  await save({ name: "Updated from admin" });
  expect((await getProjectBySlug(row.slug))?.name).toBe("Updated from admin");
  expect(reads).toBe(2);
  await save({ status: "draft" });
  expect(await getProjectBySlug(row.slug)).toBeUndefined();
  await save({ status: "published", visibility: "private" });
  expect(await getProjectBySlug(row.slug)).toBeUndefined();
  await save({ visibility: "public" });
  expect((await getProjectBySlug(row.slug))?.name).toBe("Updated from admin");
  expect(reads).toBe(5);
});
