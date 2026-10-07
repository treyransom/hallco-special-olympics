# Special Olympics Hall County — website redesign

Next.js 16 (App Router) + Tailwind v4 + Framer Motion, static export. Replaces the Squarespace site at specialolympicshallcounty.org.

```bash
npm run dev     # local dev
npm run build   # static export to ./out
```

## Content lives in one file
`src/lib/data.ts` holds every sport, event, news post, team member, stat, sponsor, and contact detail. Edit it and rebuild.

## Placeholders to replace before launch
Search `data.ts` for `PLACEHOLDER`. Specifically:
- Phone number and mailing address
- Facebook / Instagram URLs
- `donateUrl` (PayPal, Givebutter, etc.)
- Practice months for each sport, plus practice locations (currently "TBA" on /sports)
- Events list (all current entries are examples)
- The two example news posts (the healthcare-heroes post is real)
- Athlete / volunteer / sponsor counts in `stats`
- Sponsor names
- Sponsorship tier amounts and perks on /donate
- Giving-level descriptions on /donate
- Registration and volunteer form links on /get-involved (currently point to specialolympicsga.org)

Also see `CURRENT_SITE_AUDIT.md` for what the old site had.
