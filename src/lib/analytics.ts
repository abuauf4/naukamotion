export const GA_MEASUREMENT_ID = "G-XZFPGESVCC";
const GA_DISABLED_KEY = `ga-disable-${GA_MEASUREMENT_ID}`;
const PUBLIC_HOST = "motion.nauka.id";

export function isPublicAnalyticsPath(pathname: string) {
  return !/^\/(admin|api)(\/|$)/.test(pathname);
}

export function isAnalyticsEnabled(hostname: string, pathname: string) {
  return hostname === PUBLIC_HOST && isPublicAnalyticsPath(pathname);
}

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  naukaAnalyticsInitialized?: boolean;
  [GA_DISABLED_KEY]?: boolean;
};

// Google's standard arguments queue also works while the async tag is loading.
export function initializeAnalytics() {
  if (typeof window === "undefined") return;
  const browser = window as AnalyticsWindow;
  const enabled = isAnalyticsEnabled(
    browser.location.hostname,
    browser.location.pathname,
  );
  browser[GA_DISABLED_KEY] = !enabled;
  if (!enabled || browser.naukaAnalyticsInitialized) return;
  browser.dataLayer = browser.dataLayer || [];
  browser.gtag =
    browser.gtag ||
    function () {
      // eslint-disable-next-line prefer-rest-params -- gtag consumes its standard Arguments queue.
      browser.dataLayer!.push(arguments);
    };
  browser.gtag("js", new Date());
  // Enhanced Measurement owns initial/history pageviews: don't send a second
  // page_view from React's pathname effect. No advertising audiences are needed.
  browser.gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  browser.naukaAnalyticsInitialized = true;
}

function trackContactEvent(
  name: "whatsapp_click" | "generate_lead",
  params: Record<string, string>,
) {
  if (
    typeof window === "undefined" ||
    !isAnalyticsEnabled(window.location.hostname, window.location.pathname)
  )
    return;
  try {
    initializeAnalytics();
    (window as AnalyticsWindow).gtag?.("event", name, {
      send_to: GA_MEASUREMENT_ID,
      page_path: window.location.pathname,
      ...params,
    });
  } catch {
    // Analytics must never prevent opening WhatsApp or confirming a saved brief.
  }
}

export function trackWhatsappClick(
  source: "site_link" | "project_brief" | "saved_brief" = "site_link",
) {
  trackContactEvent("whatsapp_click", {
    contact_method: "whatsapp",
    contact_source: source,
  });
}

export function trackSavedBrief(service: string) {
  // Fixed service codes only. Never send user-provided text, contact data or URLs.
  const serviceType = ["website", "android", "system", "other"].includes(
    service,
  )
    ? service
    : "other";
  trackContactEvent("generate_lead", {
    contact_method: "project_form",
    service_type: serviceType,
  });
}
