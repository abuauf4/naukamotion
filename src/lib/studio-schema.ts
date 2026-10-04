import { absoluteUrl, ORGANIZATION_ID } from "./seo";
import { studioContact } from "./studio-offering";

/** One public identity for the homepage, service providers and studio profile. */
export function studioOrganization() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Nauka Motion",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-navbar-transparent.png"),
    description:
      "Jasa pembuatan website, aplikasi Android, dan sistem bisnis oleh Nauka Motion.",
    email: studioContact.email,
    telephone: `+${studioContact.phone}`,
    areaServed: { "@type": "Country", name: "Indonesia" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${studioContact.phone}`,
      email: studioContact.email,
      availableLanguage: ["Indonesian", "English"],
    },
    knowsAbout: [
      "Website development",
      "Android applications",
      "Business systems",
      "UI/UX design",
    ],
    sameAs: [studioContact.instagram],
  };
}
