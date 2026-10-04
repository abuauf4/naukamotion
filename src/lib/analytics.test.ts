import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import {
  GA_MEASUREMENT_ID,
  initializeAnalytics,
  isAnalyticsEnabled,
  trackSavedBrief,
  trackWhatsappClick,
} from "./analytics";

const originalWindow = globalThis.window;
let browser: {
  location: { hostname: string; pathname: string; search: string };
  dataLayer: IArguments[];
  gtag?: (...args: unknown[]) => void;
  naukaAnalyticsInitialized?: boolean;
  [key: string]: unknown;
};
beforeEach(() => {
  browser = {
    location: {
      hostname: "motion.nauka.id",
      pathname: "/contact",
      search: "?email=private@example.com",
    },
    dataLayer: [],
  };
  Object.assign(globalThis, { window: browser });
});
afterEach(() => {
  if (originalWindow) Object.assign(globalThis, { window: originalWindow });
  else Reflect.deleteProperty(globalThis, "window");
});
const commands = () => browser.dataLayer.map((entry) => Array.from(entry));

describe("Nauka GA4 contact measurement", () => {
  test("configures the supplied property once, including across route changes", () => {
    initializeAnalytics();
    browser.location.pathname = "/services/website";
    initializeAnalytics();
    expect(commands()).toHaveLength(2);
    expect(commands()[1]).toEqual([
      "config",
      GA_MEASUREMENT_ID,
      { allow_google_signals: false, allow_ad_personalization_signals: false },
    ]);
    expect(commands().filter((item) => item[1] === "page_view")).toHaveLength(
      0,
    );
  });
  test("WhatsApp event contains only a fixed source and page path", () => {
    trackWhatsappClick("project_brief");
    expect(commands().at(-1)).toEqual([
      "event",
      "whatsapp_click",
      {
        send_to: GA_MEASUREMENT_ID,
        page_path: "/contact",
        contact_method: "whatsapp",
        contact_source: "project_brief",
      },
    ]);
    expect(JSON.stringify(commands())).not.toContain("private@example.com");
    expect(JSON.stringify(commands())).not.toContain("link_url");
  });
  test("saved briefs send a service code, never arbitrary submitted text", () => {
    trackSavedBrief("website");
    trackSavedBrief("Name: Example, phone: 08123456789");
    expect(commands().at(-2)?.[2]).toMatchObject({
      service_type: "website",
      contact_method: "project_form",
    });
    expect(commands().at(-1)?.[2]).toMatchObject({ service_type: "other" });
    expect(JSON.stringify(commands())).not.toContain("08123456789");
  });
  test("does not collect local, preview, other-subdomain or admin traffic", () => {
    for (const [hostname, pathname] of [
      ["localhost", "/contact"],
      ["preview.vercel.app", "/"],
      ["app.nauka.id", "/"],
      ["motion.nauka.id", "/admin"],
      ["motion.nauka.id", "/admin/leads"],
      ["motion.nauka.id", "/api/leads"],
    ]) {
      Object.assign(browser.location, { hostname, pathname });
      initializeAnalytics();
      trackWhatsappClick();
      trackSavedBrief("website");
      expect(isAnalyticsEnabled(hostname, pathname)).toBe(false);
    }
    expect(commands()).toHaveLength(0);
  });
  test("blocks events when navigating into admin after a public visit", () => {
    initializeAnalytics();
    browser.location.pathname = "/admin/leads";
    initializeAnalytics();
    trackWhatsappClick();
    expect(browser[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(true);
    expect(commands()).toHaveLength(2);
  });
  test("analytics errors cannot interrupt contact actions", () => {
    browser.naukaAnalyticsInitialized = true;
    browser.gtag = () => {
      throw new Error("Tag blocked");
    };
    expect(() => trackWhatsappClick()).not.toThrow();
    expect(() => trackSavedBrief("website")).not.toThrow();
  });
});
