import type { ImageLoaderProps } from "next/image";
import variants from "./image-variants.json";

/** Serve prebuilt local WebP files or resize on Cloudinary's own CDN.
 * Never routes images through Vercel's billed optimization endpoint.
 */
export default function studioImageLoader({ src, width }: ImageLoaderProps) {
  const local = (variants as Record<string, { width: number; src: string }[]>)[
    src
  ];
  if (local) {
    return (
      local.find((variant) => variant.width >= width) ?? local[local.length - 1]
    ).src;
  }
  if (!src.startsWith("https://res.cloudinary.com/")) return src;

  const url = new URL(src);
  const marker = "/image/upload/";
  const split = url.pathname.indexOf(marker);
  if (split < 0) return src;
  const asset = url.pathname.slice(split + marker.length).split("/");
  // Signed URLs require a matching signature after any transformation.
  if (asset[0]?.startsWith("s--")) return src;
  let position = 0;
  while (
    position < asset.length - 1 &&
    /^[a-z]{1,3}_/.test(decodeURIComponent(asset[position]))
  )
    position++;
  asset.splice(
    position,
    0,
    `c_limit,w_${Math.max(1, Math.round(width))},q_auto,f_auto`,
  );
  url.pathname = url.pathname.slice(0, split + marker.length) + asset.join("/");
  return url.toString();
}
