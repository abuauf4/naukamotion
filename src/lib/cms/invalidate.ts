import { revalidateTag } from "next/cache";
import { PUBLIC_PORTFOLIO_TAG } from "./cache-policy";

// Route handlers cannot use updateTag. Immediate expiry makes the next public
// read wait for fresh data, including when a project becomes private or draft.
export function invalidatePublicPortfolio() {
  revalidateTag(PUBLIC_PORTFOLIO_TAG, { expire: 0 });
}
