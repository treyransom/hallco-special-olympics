import { site, events } from "@/lib/data";

export default function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    url: "https://www.specialolympicshallcounty.org",
    logo: "https://www.specialolympicshallcounty.org/images/logo.png",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    parentOrganization: { "@type": "NGO", name: site.parentOrg.name, url: site.parentOrg.url },
    sameAs: [site.social.facebook, site.social.instagram].filter((u) => u && !u.endsWith(".com/")),
  };
  const evs = events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    endDate: e.endDate ?? e.date,
    description: e.description,
    location: { "@type": "Place", name: e.location },
    organizer: { "@type": "NGO", name: site.name },
    eventStatus: "https://schema.org/EventScheduled",
    url: `${site.url}/events/${e.slug}`,
  }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(evs) }} />
    </>
  );
}
