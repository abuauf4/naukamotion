/**
 * Server-side locale reader.
 *
 * V2 design principle: server components read locale from cookie
 * (not from a client-side React Context) so they can render the
 * correct language WITHOUT waiting for hydration.
 *
 * The LocaleProvider (client) still exists for the locale-switcher
 * affordance in the header — but the server side reads the cookie
 * directly via `next/headers` to render the correct language at
 * SSR time. This eliminates the "ID renders, then EN flips in after
 * hydration" flash that V1 had.
 */
import { cookies } from "next/headers";

export type Locale = "id" | "en";

const COOKIE_NAME = "nauka-locale";

/**
 * Read the locale from the request cookie. Falls back to "id".
 *
 * Server-only — uses `next/headers` which throws if called from a
 * client component.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value === "en" || value === "id") return value;
  return "id";
}
