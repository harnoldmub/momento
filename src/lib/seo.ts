import { getSiteUrl } from "@/lib/env";

export const SITE_NAME = "Momento";

export const SEO_KEYWORDS = [
  "Momento",
  "Momento wedding",
  "Momento mariage",
  "Momento France",
  "Momento RDC",
  "photographe mariage",
  "vidéaste mariage",
  "photographe mariage Paris",
  "vidéaste mariage Paris",
  "photographe mariage France",
  "photographe mariage Belgique",
  "photographe mariage Bruxelles",
  "vidéaste mariage Belgique",
  "photographe mariage Kinshasa",
  "photographe mariage africain",
  "mariage congolais Paris",
  "film de mariage",
  "film de mariage cinématographique",
  "destination wedding",
  "wedding photographer Paris",
  "wedding photographer France",
  "wedding photographer Belgium",
  "save the date",
  "mariage France",
  "mariage Paris",
  "mariage Belgique",
];

export const AREAS_SERVED = [
  "Paris",
  "Île-de-France",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Lille",
  "France",
  "Bruxelles",
  "Belgique",
  "Kinshasa",
  "République démocratique du Congo",
  "Dubaï",
  "Europe",
];

/** schema.org structured data describing the business (rendered once in the site layout). */
export function businessJsonLd(opts: {
  phoneCongo: string;
  phoneFrance: string;
  instagram: string;
}) {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${url}/#business`,
        name: SITE_NAME,
        alternateName: ["Momento Wedding", "Momento RDC", "Momento France", "Momento Mariage"],
        description:
          "Photographe et vidéaste de mariage haut de gamme basé à Paris et Kinshasa. Reportages photo, films de mariage cinématographiques et destination weddings en France, en Belgique, en RDC et dans le monde entier.",
        url,
        logo: `${url}/logo/logo-noir.png`,
        image: `${url}/hero/hero.jpg`,
        telephone: opts.phoneFrance,
        priceRange: "€€€",
        address: [
          { "@type": "PostalAddress", addressLocality: "Paris", addressRegion: "Île-de-France", addressCountry: "FR" },
          { "@type": "PostalAddress", addressLocality: "Kinshasa", addressCountry: "CD" },
        ],
        areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name })),
        contactPoint: [
          { "@type": "ContactPoint", telephone: opts.phoneFrance, contactType: "customer service", areaServed: ["FR", "BE"], availableLanguage: ["French", "English"] },
          { "@type": "ContactPoint", telephone: opts.phoneCongo, contactType: "customer service", areaServed: "CD", availableLanguage: ["French", "English", "Lingala"] },
        ],
        sameAs: opts.instagram ? [`https://www.instagram.com/${opts.instagram}`] : [],
        knowsAbout: [
          "Photographie de mariage",
          "Vidéo de mariage",
          "Film de mariage",
          "Destination wedding",
          "Séance save the date",
          "Mariage africain",
        ],
        makesOffer: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Photographie de mariage" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Film de mariage cinématographique" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Séance save the date / fiançailles" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Destination wedding" } },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE_NAME,
        alternateName: "Momento Wedding",
        inLanguage: "fr-FR",
        publisher: { "@id": `${url}/#business` },
      },
    ],
  };
}

/** Safe JSON for a <script type="application/ld+json"> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
