import { describe, expect, test } from "bun:test";
import loader from "./image-loader";

describe("responsive image delivery", () => {
  test("uses a prebuilt local file at sufficient resolution", () => {
    expect(loader({ src: "/showcase/jaecoo-fatmawati.webp", width: 390 })).toBe(
      "/optimized/showcase-jaecoo-fatmawati-640.webp",
    );
    expect(
      loader({ src: "/showcase/jaecoo-fatmawati.webp", width: 3840 }),
    ).toBe("/optimized/showcase-jaecoo-fatmawati-1280.webp");
  });
  test("preserves Cloudinary versions and public IDs", () => {
    expect(
      loader({
        src: "https://res.cloudinary.com/nauka/image/upload/v123/projects/bakau.jpg",
        width: 640,
      }),
    ).toBe(
      "https://res.cloudinary.com/nauka/image/upload/c_limit,w_640,q_auto,f_auto/v123/projects/bakau.jpg",
    );
  });
  test("resizes after existing transforms, preserving their crop and query", () => {
    expect(
      loader({
        src: "https://res.cloudinary.com/nauka/image/upload/c_crop,w_1200/v123/projects/bakau.jpg?foo=bar",
        width: 640,
      }),
    ).toBe(
      "https://res.cloudinary.com/nauka/image/upload/c_crop,w_1200/c_limit,w_640,q_auto,f_auto/v123/projects/bakau.jpg?foo=bar",
    );
  });
  test("handles URL-encoded transform separators and versionless assets", () => {
    const result = loader({
      src: "https://res.cloudinary.com/nauka/image/upload/f_auto%2Cq_auto%2Cw_1200%2Cc_limit/images/who-client.webp",
      width: 640,
    });
    expect(result).toContain(
      "f_auto%2Cq_auto%2Cw_1200%2Cc_limit/c_limit,w_640,q_auto,f_auto/images/who-client.webp",
    );
  });
  test("keeps signed URLs, other providers, fetch URLs and unknown local files intact", () => {
    for (const src of [
      "https://res.cloudinary.com/nauka/image/upload/s--signature--/v123/bakau.jpg",
      "https://example.supabase.co/storage/v1/object/public/images/bakau.jpg",
      "https://res.cloudinary.com/nauka/image/fetch/https://example.com/bakau.jpg",
      "/unknown.png",
    ])
      expect(loader({ src, width: 640 })).toBe(src);
  });
});
