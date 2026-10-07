# Special Olympics Hall County — website redesign

Next.js 16 (App Router) + Tailwind v4 + Framer Motion, static export. Replaces the Squarespace site at specialolympicshallcounty.org.

```bash
npm run dev     # local dev
npm run build   # static export to ./out
```

## Content lives in one file
`src/lib/data.ts` holds every sport, event, news post, team member, stat, sponsor, and contact detail. Edit it and rebuild.

## Pages
Home, About, Sports, Events, Get Involved, News (+ post pages), Donate, Contact, FAQ, Forms & Resources, Photo Gallery. Plus `sitemap.xml`, `robots.txt`, and JSON-LD for the organization, events, and FAQ.

## Features
- Announcement bar (`announcement` in data.ts; dismiss is remembered for the session)
- Dropdown navigation on desktop, accordion menu on mobile
- Homepage hero (swap in a video by setting `site.heroVideo`)
- Animated impact stats, seven-sport grid, get-involved cards
- Upcoming events with filters and "Add to calendar" (Google Calendar links)
- Athlete stories carousel
- "Where we practice" venue picker with an embedded Google Map and directions link (no API key needed)
- Signature fundraisers + sponsor tiers + shop link (`site.shopUrl`; hidden until set)
- Newsletter signup (points at `site.newsletterUrl`; falls back to a mailto until set)
- FAQ accordion, resources/forms page, masonry photo gallery with lightbox and keyboard nav
- Accessibility widget: text size, high contrast, reduce motion (saved per visitor)
- Back-to-top button, skip link, focus rings throughout

## Placeholders to replace before launch
Search `data.ts` for `PLACEHOLDER`. Specifically:
- Phone number and mailing address
- Facebook / Instagram URLs
- `donateUrl` (PayPal, Givebutter, etc.), `newsletterUrl`, `shopUrl`, `ein`
- `announcement` text and link
- Practice months for each sport, plus practice locations (currently "TBA" on /sports)
- `locations` (practice venues for the map)
- Events list (all current entries are examples)
- The two example news posts (the healthcare-heroes post is real)
- `stories` (athlete quotes are illustrative)
- `fundraisers` names and dates
- Athlete / volunteer / sponsor counts in `stats`
- Sponsor names
- Sponsorship tier amounts and perks on /donate
- Giving-level descriptions on /donate
- `resources` links (currently point to specialolympicsga.org or "#")
- Registration and volunteer form links on /get-involved

Also see `CURRENT_SITE_AUDIT.md` for what the old site had.
