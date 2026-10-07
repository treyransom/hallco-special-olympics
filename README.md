# Special Olympics Hall County — website redesign

Next.js 16 (App Router) + Tailwind v4 + Framer Motion, static export. Replaces the Squarespace site at specialolympicshallcounty.org.

```bash
npm run dev     # local dev
npm run build   # static export to ./out
```

## Content lives in one file
`src/lib/data.ts` holds every sport, event, news post, team member, stat, sponsor, and contact detail. Edit it and rebuild.

## Pages
Home, About, Athlete Stories, Sports, Teams (+ one page per sport), Events, Practice Schedule, Where We Practice, Competition Guide, Volunteer Shifts, Register, Get Involved, News (+ post pages), Results, Athlete of the Month, Donate, Season Fund, Sponsor (+ printable one-pager), Our Sponsors, Newsletter, Fundraisers (+ one page per event), Contact, FAQ, Forms & Resources, Photo Gallery, a printable flyer per event, and a `calendar.ics` feed. Plus `sitemap.xml`, `robots.txt`, and JSON-LD for the organization, events, and FAQ.

The homepage is intentionally short: hero, countdown, mission, sports, get-involved, upcoming events, and an Explore grid that links to everything else.

## Deploying
Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`. The workflow sets `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` so links, images, the manifest, and the service worker work under the repository subpath. For the real domain, point a host like Vercel, Netlify, or Cloudflare Pages at the repo (build: `npm run build`, output: `out`) and leave both variables unset.

## Editing content
Events, news, Athlete of the Month, results, stories, sponsors, the announcement bar, and the season fund live in `content/*.json`. Edit the JSON directly, or use the CMS at `/admin`:
- **Locally, no login:** run `npx decap-server` in one terminal and `npm run dev` in another, then open http://localhost:3000/admin.
- **Live site:** set `repo` in `public/admin/config.yml` to the GitHub repo, then add an OAuth proxy (Netlify Identity, or a free Cloudflare Worker like `decap-proxy`). Every save becomes a commit.

Everything else (sports, practices, coaches, rosters, FAQs, wish list, carpools, volunteer hours, certifications, checklists, registration windows, the weather alert) is still in `src/lib/data.ts`.

## Photos
Originals go in `source-photos/` (ignored by git). Run `python3 scripts/build-images.py` to generate optimized sizes in `public/images/` plus blur placeholders in `src/lib/blur.json`. Every `<Image>` on the site goes through `SmartImage`, which adds the blur-up automatically, and the custom loader in `src/lib/imageLoader.ts` serves the right size per screen. The current photos are 480 to 960 pixels wide; phone photos from a practice will look dramatically better.

## Installable app
The site ships a web manifest and a service worker (`public/sw.js`) that caches the schedule, competition guide, and recently visited pages for offline use. The service worker only registers in production builds.

## Spanish
Every page has a Spanish version. UI text lives in `src/lib/i18n.tsx` (the `en` and `es` dictionaries). Content in `data.ts` carries optional `es` fields; anything without one falls back to English. The toggle is in the header and the choice is remembered per visitor.

## Features
- Online athlete registration (4 steps, saves a draft on the device, sends by email to the Local Coordinator)
- Practice schedule per sport, with a "This week" strip on the homepage and per-team pages with coaches and rosters
- Live countdown to the next competition, plus a competition guide with a checkable packing list
- Fundraiser registration pages with option pickers (golf foursomes, hole sponsors, plunge teams) that hand off to the payment processor or email
- Sponsor wall grouped by tier, sponsor page, and a print-to-PDF sponsorship one-pager
- Season fund thermometer (`campaign` in data.ts)
- Sponsor-an-athlete cards
- Facebook feed embed on the news page (appears once the real page URL is set)
- Video stories: add a YouTube ID to a story or news post
- Results medal board with per-competition highlights
- Athlete of the Month with archive and nomination link
- Volunteer shift signup per event, with fill progress
- Site search (⌘K / Ctrl+K) across pages, sports, events, FAQ, news, resources, teams, fundraisers
- Printable event flyers with a QR code
- Calendar subscription feed (`/calendar.ics`) with events and weekly practice recurrences
- Registration deadline badges with days-left countdowns (`registrationWindows`)
- Weather / cancellation alert banner (`alert` in data.ts), also shown on affected team pages
- Birthday wall on the Athlete of the Month page (`birthdays`)
- Athlete milestone badges on rosters (seasons with the program)
- Carpool board (`/carpool`) with offer/request forms by email
- Volunteer hours log and leaderboard (`/volunteer/hours`)
- Coach resources hub and certification tracker (`/coaches`)
- Day-of-event checklists saved per device (`/volunteer/checklists`)
- Monthly giving levels and matching-gift employer lookup on /donate
- Wish list with claimable items (`/wishlist`)
- Year-end impact report, printable (`/impact`)
- Photo submission form on the gallery
- Dark mode toggle, page transitions with a top progress bar
- Confetti when you tap a name on the medal board
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
- `practices`, `coaches`, `rosters` (set `showRoster: false` to hide a roster)
- `campaign` goal and raised amount
- `athleteSponsorships`, `athleteOfMonth`, `results`
- `fundraisers` options, prices, and dates
- `stories[].video` / `posts[].video` YouTube IDs (currently a sample video)
- Event `shifts` and `address` fields

Also see `CURRENT_SITE_AUDIT.md` for what the old site had.
