/// <reference types="bun-types" />
import { describe, test, expect, mock, beforeEach } from "bun:test";

const create = mock(async (_args: unknown) => ({ id: "saved-lead" }));
mock.module("@/lib/cms/db", () => ({ prisma: { lead: { create } } }));
const { POST } = await import("./route");
const brief = {
  name: "Pemilik Toko",
  contact: "owner@example.com",
  phone: "081234567890",
  projectType: "Aplikasi Android",
  budget: "Diskusikan",
  timeline: "Fleksibel",
  story: "Saya ingin aplikasi kasir dan stok untuk toko saya.",
};
function request(
  body: unknown = brief,
  extraHeaders: Record<string, string> = {},
) {
  return new Request("https://motion.nauka.id/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("Project brief persistence", () => {
  beforeEach(() => {
    create.mockClear();
    create.mockImplementation(async () => ({ id: "saved-lead" }));
  });
  test("returns success after the lead is persisted with contact and scope", async () => {
    const response = await POST(request());
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0]).toMatchObject({
      data: {
        name: brief.name,
        email: brief.contact,
        phone: brief.phone,
        service: brief.projectType,
        message: brief.story,
        notes: "Anggaran: Diskusikan\nTarget: Fleksibel",
      },
    });
  });
  test("a failed save never reports success", async () => {
    create.mockImplementation(async () => {
      throw new Error("Database unavailable");
    });
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect((await response.json()).ok).toBe(false);
  });
  test("rejects malformed and invalid briefs before touching the database", async () => {
    for (const invalid of [
      "{broken",
      { ...brief, contact: "0812345" },
      { ...brief, story: "short" },
      { ...brief, name: "" },
    ]) {
      expect((await POST(request(invalid))).status).toBe(400);
    }
    expect(create).not.toHaveBeenCalled();
  });
  test("optional fields are not required to submit an inquiry", async () => {
    const {
      phone: _phone,
      budget: _budget,
      timeline: _timeline,
      ...minimal
    } = brief;
    expect((await POST(request(minimal))).status).toBe(201);
    expect(create.mock.calls[0][0]).toMatchObject({
      data: {
        phone: null,
        notes: "Anggaran: Belum ditentukan\nTarget: Belum ditentukan",
      },
    });
  });
  test("accepts the browser origin when Next.js uses an internal request hostname", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          host: "motion.nauka.id",
          origin: "https://motion.nauka.id",
        },
        body: JSON.stringify(brief),
      }),
    );
    expect(response.status).toBe(201);
    expect(create).toHaveBeenCalledTimes(1);
  });
  test("blocks cross-site and oversized requests", async () => {
    expect(
      (await POST(request(brief, { origin: "https://unrelated.example" })))
        .status,
    ).toBe(403);
    expect(
      (await POST(request({ ...brief, story: "x".repeat(17000) }))).status,
    ).toBe(413);
    expect(create).not.toHaveBeenCalled();
  });
});
