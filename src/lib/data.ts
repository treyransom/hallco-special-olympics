// Central content file. Anything marked PLACEHOLDER should be replaced with
// real details from the Hall County program before launch.

export const site = {
  name: "Special Olympics Hall County",
  shortName: "SO Hall County",
  tagline: "Empowering individuals with intellectual disabilities through year-round sports training and athletic competition.",
  email: "hsgamb2386@gmail.com",
  phone: "(770) 555-0123", // PLACEHOLDER
  address: {
    line1: "123 Athlete Way", // PLACEHOLDER
    city: "Gainesville",
    state: "GA",
    zip: "30501",
  },
  social: {
    facebook: "https://www.facebook.com/", // PLACEHOLDER
    instagram: "https://www.instagram.com/", // PLACEHOLDER
  },
  donateUrl: "#", // PLACEHOLDER — link to payment processor
  newsletterUrl: "", // PLACEHOLDER — Mailchimp/Constant Contact form action URL
  shopUrl: "", // PLACEHOLDER — merch store URL (leave empty to hide)
  heroVideo: "", // PLACEHOLDER — optional MP4 URL for the homepage hero background
  ein: "", // PLACEHOLDER — tax ID shown on the donate page
  parentOrg: { name: "Special Olympics Georgia", url: "https://www.specialolympicsga.org/" },
};

// Shown in a bar above the navigation. Set `active: false` to hide it.
export const announcement = {
  active: true,
  text: "Winter season registration opens October 1", // PLACEHOLDER
  cta: { label: "Register now", href: "/get-involved#athletes" },
};

export type Sport = {
  slug: string;
  name: string;
  season: "Winter" | "Spring" | "Summer" | "Fall";
  months: string;
  blurb: string;
  image: string;
  icon: "Waves" | "Flag" | "CircleDot" | "Dribbble" | "Pins" | "Timer" | "Target";
};

export const sports: Sport[] = [
  {
    slug: "basketball",
    name: "Basketball",
    season: "Winter",
    months: "Nov – Feb", // PLACEHOLDER
    blurb: "Team and individual skills competition. Our teams practice weekly and compete at the Winter Games.",
    image: "/images/basketball-action.jpg",
    icon: "Dribbble",
  },
  {
    slug: "bowling",
    name: "Bowling",
    season: "Winter",
    months: "Jan – Mar", // PLACEHOLDER
    blurb: "Singles, doubles, and unified bowling for athletes of every ability level.",
    image: "/images/team-bleachers.jpg",
    icon: "Pins",
  },
  {
    slug: "athletics",
    name: "Athletics",
    season: "Spring",
    months: "Mar – May", // PLACEHOLDER
    blurb: "Track and field events including sprints, distance, relays, shot put, and long jump.",
    image: "/images/medals.jpg",
    icon: "Timer",
  },
  {
    slug: "swimming",
    name: "Swimming",
    season: "Summer",
    months: "May – Jul", // PLACEHOLDER
    blurb: "Freestyle, backstroke, breaststroke, and relays in a supportive pool environment.",
    image: "/images/athletes-flags.jpg",
    icon: "Waves",
  },
  {
    slug: "bocce",
    name: "Bocce Ball",
    season: "Summer",
    months: "Jun – Aug", // PLACEHOLDER
    blurb: "A precision sport that welcomes athletes of all ages and mobility levels.",
    image: "/images/team-outside.jpg",
    icon: "Target",
  },
  {
    slug: "flag-football",
    name: "Flag Football",
    season: "Fall",
    months: "Aug – Oct", // PLACEHOLDER
    blurb: "Fast-paced 5-on-5 unified flag football with athletes and partners on the same team.",
    image: "/images/flag-football.jpg",
    icon: "Flag",
  },
  {
    slug: "softball",
    name: "Softball",
    season: "Fall",
    months: "Sep – Oct", // PLACEHOLDER
    blurb: "Team softball and individual skills competition leading up to the State Fall Games.",
    image: "/images/team-polos.jpg",
    icon: "CircleDot",
  },
];

export const stats = [
  { value: 150, suffix: "+", label: "Athletes" }, // PLACEHOLDER
  { value: 7, suffix: "", label: "Sports" },
  { value: 80, suffix: "+", label: "Volunteers & Coaches" }, // PLACEHOLDER
  { value: 365, suffix: "", label: "Days of Programming" },
];

export type Event = {
  slug: string;
  title: string;
  date: string; // ISO
  endDate?: string;
  time: string;
  location: string;
  sport?: string;
  type: "Competition" | "Practice" | "Fundraiser" | "Community";
  description: string;
};

// PLACEHOLDER events — replace with the real season schedule
export const events: Event[] = [
  {
    slug: "fall-games-2026",
    title: "State Fall Games",
    date: "2026-10-17",
    endDate: "2026-10-18",
    time: "All day",
    location: "Valdosta, GA",
    sport: "Flag Football · Softball",
    type: "Competition",
    description: "Our flag football and softball teams travel to compete against programs from across Georgia.",
  },
  {
    slug: "golf-tournament-2026",
    title: "Annual Golf Tournament",
    date: "2026-10-24",
    time: "8:00 AM shotgun start",
    location: "Chattahoochee Golf Club, Gainesville",
    type: "Fundraiser",
    description: "Our biggest fundraiser of the year. Sponsorships, foursomes, and hole sponsors available.",
  },
  {
    slug: "basketball-tryouts",
    title: "Basketball Season Kickoff",
    date: "2026-11-07",
    time: "10:00 AM – 12:00 PM",
    location: "Hall County Gym",
    sport: "Basketball",
    type: "Practice",
    description: "First practice of the winter season. New athletes welcome — bring a water bottle and a smile.",
  },
  {
    slug: "holiday-dance",
    title: "Athlete Holiday Dance",
    date: "2026-12-12",
    time: "6:00 – 9:00 PM",
    location: "Community Center",
    type: "Community",
    description: "Music, dancing, and dinner for athletes, families, and volunteers.",
  },
  {
    slug: "polar-plunge",
    title: "Polar Plunge",
    date: "2027-02-06",
    time: "9:00 AM",
    location: "Lake Lanier Olympic Park",
    type: "Fundraiser",
    description: "Freezin' for a reason. Take the plunge into Lake Lanier to support our athletes.",
  },
  {
    slug: "winter-games",
    title: "State Winter Games",
    date: "2027-01-23",
    endDate: "2027-01-24",
    time: "All day",
    location: "Marietta, GA",
    sport: "Basketball · Bowling",
    type: "Competition",
    description: "Statewide competition for basketball and bowling athletes.",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "thank-you-healthcare-heroes",
    title: "100 Lunches for Our Healthcare Heroes",
    date: "2020-05-01",
    excerpt:
      "Our athletes delivered about 100 lunches to the staff at Northeast Georgia Medical Center as a token of our love for them.",
    image: "/images/lunch-delivery.jpg",
    body: [
      "Our athletes and families wanted to say thank you to the people who have been taking care of our community. So we packed up roughly 100 lunches and delivered them to the staff at Northeast Georgia Medical Center.",
      "Every bag carried a hand-made card from one of our athletes. It was a small token of our love for the healthcare workers who show up every single day.",
    ],
  },
  // PLACEHOLDER posts below
  {
    slug: "flag-football-season-recap",
    title: "Flag Football Team Brings Home Gold",
    date: "2025-10-20",
    excerpt: "Our unified flag football team finished the State Fall Games undefeated. Here's how the weekend went.",
    image: "/images/flag-football.jpg",
    body: [
      "What a weekend. Our unified flag football team went undefeated at the State Fall Games and came home with gold medals around their necks.",
      "Thank you to every coach, partner, parent, and volunteer who made the trip. This is what Hall County looks like when we work together toward the same goal.",
    ],
  },
  {
    slug: "unified-partner-of-the-year",
    title: "Rachael Named Outstanding Unified Partner",
    date: "2025-06-02",
    excerpt: "Special Olympics Georgia honored one of our own with the Outstanding Unified Partner award.",
    image: "/images/unified-partner-award.jpg",
    body: [
      "We could not be prouder. Rachael has spent years on the court, the field, and the lanes alongside our athletes, and Special Olympics Georgia noticed.",
      "Unified partners compete side by side with our athletes. They are the heart of what makes our program feel like a family.",
    ],
  },
];

export type TeamMember = { name: string; role: string; email?: string };

export const team: TeamMember[] = [
  { name: "Heather Gamble", role: "Local Coordinator", email: "hsgamb2386@gmail.com" },
  { name: "April Baldwin", role: "Chairperson", email: "April.brunk1@gmail.com" },
  { name: "Randi Brooks", role: "Treasurer", email: "randiroo0204@hotmail.com" },
  { name: "Bobbie Young", role: "Coach Coordinator", email: "me2lynn@bellsouth.net" },
  { name: "Lisa Shows", role: "Volunteer Coordinator", email: "Lisazshows@gmail.com" },
  { name: "Dave King", role: "Family & Community Representative", email: "Danddking@me.com" },
  { name: "Janessa King", role: "Athlete Representative" },
];

export const givingLevels = [
  { amount: 25, label: "Covers an athlete's competition registration fee" },
  { amount: 50, label: "Outfits an athlete with a team uniform" },
  { amount: 100, label: "Provides equipment for a full practice season" },
  { amount: 250, label: "Sends an athlete to State Games with lodging and transportation" },
];

// PLACEHOLDER sponsors
export const sponsors = [
  "Northeast Georgia Health System",
  "Hall County Schools",
  "Lanier Technical College",
  "Chattahoochee Golf Club",
  "Gainesville Rotary",
  "Publix",
];

export type GalleryImage = { src: string; alt: string; w: number; h: number; tag: string };

export const gallery: GalleryImage[] = [
  { src: "/images/flag-football.jpg", alt: "Unified flag football team on the field", w: 1800, h: 1350, tag: "Flag Football" },
  { src: "/images/medals.jpg", alt: "Athlete showing off two gold medals", w: 640, h: 428, tag: "Athletics" },
  { src: "/images/basketball-action.jpg", alt: "Basketball game in progress", w: 960, h: 720, tag: "Basketball" },
  { src: "/images/powerlifting.jpg", alt: "Athlete celebrating a lift", w: 1500, h: 1098, tag: "Powerlifting" },
  { src: "/images/golf-group.jpg", alt: "Golfers at the annual golf tournament", w: 957, h: 495, tag: "Fundraisers" },
  { src: "/images/bus-trip.jpg", alt: "Athletes on the bus to State Games", w: 720, h: 960, tag: "State Games" },
  { src: "/images/basketball-team.jpg", alt: "Basketball team photo", w: 640, h: 516, tag: "Basketball" },
  { src: "/images/holiday-dance.jpg", alt: "Athletes at the holiday dance", w: 480, h: 640, tag: "Community" },
  { src: "/images/team-polos.jpg", alt: "Team in blue polos at State Games", w: 1500, h: 1125, tag: "State Games" },
  { src: "/images/athletes-flags.jpg", alt: "Athletes in front of Special Olympics flags", w: 640, h: 480, tag: "Competition" },
  { src: "/images/unified-partner-award.jpg", alt: "Rachael with her Outstanding Unified Partner award", w: 720, h: 960, tag: "Awards" },
  { src: "/images/team-bleachers.jpg", alt: "Bowling team on the bleachers", w: 480, h: 640, tag: "Bowling" },
  { src: "/images/team-outside.jpg", alt: "Team photo outside the gym", w: 480, h: 640, tag: "Community" },
  { src: "/images/coaches.jpg", alt: "Coaches at a competition", w: 480, h: 640, tag: "Coaches" },
  { src: "/images/lunch-delivery.jpg", alt: "Delivering lunches to healthcare workers", w: 800, h: 600, tag: "Community" },
  { src: "/images/lunch-hospital.jpg", alt: "Lunch drop-off at Northeast Georgia Medical Center", w: 800, h: 600, tag: "Community" },
  { src: "/images/dance-partners.jpg", alt: "Dance partners at the holiday dance", w: 480, h: 640, tag: "Community" },
  { src: "/images/healthcare-collage.jpg", alt: "Athletes holding thank-you signs for healthcare workers", w: 640, h: 800, tag: "Community" },
  { src: "/images/golf-sponsors.jpg", alt: "Golf tournament sponsor banner", w: 720, h: 960, tag: "Fundraisers" },
  { src: "/images/golf-tent.jpg", alt: "Golfers at the registration tent", w: 960, h: 540, tag: "Fundraisers" },
];

export type Location = {
  name: string;
  address: string;
  sports: string[];
  mapQuery: string;
};

// PLACEHOLDER practice locations
export const locations: Location[] = [
  { name: "Hall County Gym", address: "Gainesville, GA 30501", sports: ["Basketball"], mapQuery: "Gainesville GA" },
  { name: "Frances Meadows Aquatic Center", address: "1545 Community Way NE, Gainesville, GA 30501", sports: ["Swimming"], mapQuery: "Frances Meadows Aquatic Center Gainesville GA" },
  { name: "Stars and Strikes Gainesville", address: "Gainesville, GA", sports: ["Bowling"], mapQuery: "Stars and Strikes Gainesville GA" },
  { name: "Allen Creek Soccer Complex", address: "Gainesville, GA", sports: ["Flag Football", "Bocce"], mapQuery: "Allen Creek Soccer Complex Gainesville GA" },
  { name: "Lanier Point Athletic Complex", address: "Gainesville, GA", sports: ["Softball", "Athletics"], mapQuery: "Lanier Point Athletic Complex Gainesville GA" },
];

export type Story = {
  name: string;
  role: string;
  sport: string;
  quote: string;
  image: string;
};

// PLACEHOLDER athlete and volunteer stories
export const stories: Story[] = [
  {
    name: "Willie",
    role: "Athlete",
    sport: "Powerlifting · Athletics",
    quote: "When I lift, everybody in the gym is cheering for me. I used to be shy. Now I'm the one cheering for everyone else.",
    image: "/images/powerlifting.jpg",
  },
  {
    name: "Rachael",
    role: "Unified Partner",
    sport: "Flag Football · Bowling",
    quote: "I came to volunteer one Saturday and never left. These athletes are my teammates, and honestly, my best friends.",
    image: "/images/unified-partner-award.jpg",
  },
  {
    name: "The King Family",
    role: "Athlete Family",
    sport: "Basketball",
    quote: "Janessa found her people here. Game days are the highlight of our week, and she's never missed a practice.",
    image: "/images/basketball-team.jpg",
  },
];

export type Fundraiser = {
  slug: string;
  name: string;
  when: string;
  blurb: string;
  image: string;
  href: string;
};

// PLACEHOLDER signature fundraisers
export const fundraisers: Fundraiser[] = [
  { slug: "golf", name: "Annual Golf Tournament", when: "Every October", blurb: "Our biggest fundraiser. Foursomes, hole sponsors, and a lunch with the athletes.", image: "/images/golf-group.jpg", href: "/events#golf-tournament-2026" },
  { slug: "plunge", name: "Polar Plunge", when: "Every February", blurb: "Freezin' for a reason. Jump into Lake Lanier and raise money for our athletes.", image: "/images/athletes-flags.jpg", href: "/events#polar-plunge" },
  { slug: "tip-a-cop", name: "Tip-A-Cop Night", when: "Spring", blurb: "Local law enforcement wait tables for the Torch Run. Tips go to our program.", image: "/images/team-polos.jpg", href: "/events" },
];

export const faqs = [
  { q: "Who is eligible to be an athlete?", a: "Anyone age 8 or older with an intellectual disability, cognitive delay, or a closely related developmental disability. There is no upper age limit, and no prior sports experience is needed." },
  { q: "How much does it cost?", a: "Nothing. Training, uniforms, equipment, competition registration, travel, and lodging for State Games are all covered by our fundraising and sponsors." },
  { q: "How do I register my athlete?", a: "Complete the Special Olympics Georgia athlete registration and medical form, have a physician sign the medical section, and email it to our Local Coordinator. Forms are on our Resources page. The medical form is valid for three years." },
  { q: "Can my athlete play more than one sport?", a: "Yes. Most of our athletes play two or three sports across the year. Seasons are staggered so they rarely overlap." },
  { q: "What is a Unified Partner?", a: "A teammate without an intellectual disability who trains and competes alongside our athletes on the same team. Partners are matched by age and ability." },
  { q: "Do volunteers need a background check?", a: "Coaches and any volunteer with regular contact with athletes complete a free Class A volunteer form and background check through Special Olympics Georgia. Day-of-event volunteers do not." },
  { q: "Where do you practice?", a: "Practices happen at gyms, pools, fields, and bowling centers around Gainesville and Hall County. See the Where We Practice map on the homepage. Locations are confirmed by email before each season." },
  { q: "Is my donation tax-deductible?", a: "Yes. Special Olympics Hall County is a local program of Special Olympics Georgia, a 501(c)(3) nonprofit. We'll send a receipt for every gift." },
];

export type Resource = { title: string; description: string; href: string; group: "Athletes" | "Volunteers & Coaches" | "Families" | "Policies" };

// PLACEHOLDER links — point these at the real PDFs when available
export const resources: Resource[] = [
  { group: "Athletes", title: "Athlete Registration & Medical Form", description: "Required for every new athlete. Valid for three years once signed by a physician.", href: "https://www.specialolympicsga.org/" },
  { group: "Athletes", title: "Athlete Code of Conduct", description: "Expectations for athletes at practices, competitions, and travel.", href: "https://www.specialolympicsga.org/" },
  { group: "Volunteers & Coaches", title: "Class A Volunteer Form", description: "For coaches, chaperones, and unified partners. Includes background check consent.", href: "https://www.specialolympicsga.org/" },
  { group: "Volunteers & Coaches", title: "Protective Behaviors Training", description: "Free online course required every three years for Class A volunteers.", href: "https://www.specialolympicsga.org/" },
  { group: "Volunteers & Coaches", title: "Concussion Awareness Training", description: "Free online course required for all coaches.", href: "https://www.specialolympicsga.org/" },
  { group: "Families", title: "What to Pack for State Games", description: "A checklist for overnight competition trips.", href: "#" },
  { group: "Families", title: "Season Calendar (PDF)", description: "Practice days, competition dates, and deadlines for the current season.", href: "#" },
  { group: "Policies", title: "Special Olympics Georgia Policies", description: "Eligibility, divisioning, and participation policies from our state office.", href: "https://www.specialolympicsga.org/" },
];

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts);
}
