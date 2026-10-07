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
  parentOrg: { name: "Special Olympics Georgia", url: "https://www.specialolympicsga.org/" },
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

export const gallery = [
  { src: "/images/flag-football.jpg", alt: "Unified flag football team on the field" },
  { src: "/images/medals.jpg", alt: "Athlete showing off two gold medals" },
  { src: "/images/basketball-action.jpg", alt: "Basketball game in progress" },
  { src: "/images/powerlifting.jpg", alt: "Athlete celebrating a lift" },
  { src: "/images/golf-group.jpg", alt: "Golfers at the annual golf tournament" },
  { src: "/images/bus-trip.jpg", alt: "Athletes on the bus to State Games" },
  { src: "/images/basketball-team.jpg", alt: "Basketball team photo" },
  { src: "/images/holiday-dance.jpg", alt: "Athletes at the holiday dance" },
];

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts);
}
