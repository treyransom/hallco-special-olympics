// Central content file. Anything marked PLACEHOLDER should be replaced with
// real details from the Hall County program before launch.
// Optional `es` objects hold Spanish versions of user-facing text.

import announcementJson from "../../content/announcement.json";
import campaignJson from "../../content/campaign.json";
import eventsJson from "../../content/events.json";
import postsJson from "../../content/posts.json";
import aomJson from "../../content/athleteOfMonth.json";
import resultsJson from "../../content/results.json";
import storiesJson from "../../content/stories.json";
import sponsorsJson from "../../content/sponsors.json";

export type Lang = "en" | "es";

export const site = {
  name: "Special Olympics Hall County",
  shortName: "SO Hall County",
  tagline: "Empowering individuals with intellectual disabilities through year-round sports training and athletic competition.",
  taglineEs: "Empoderamos a personas con discapacidad intelectual a través de entrenamiento deportivo y competencias atléticas durante todo el año.",
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
    youtube: "", // PLACEHOLDER
  },
  donateUrl: "#", // PLACEHOLDER — link to payment processor
  newsletterUrl: "", // PLACEHOLDER — Mailchimp/Constant Contact form action URL
  shopUrl: "", // PLACEHOLDER — merch store URL (leave empty to hide)
  heroVideo: "", // PLACEHOLDER — optional MP4 URL for the homepage hero background
  ein: "", // PLACEHOLDER — tax ID shown on the donate page
  url: "https://www.specialolympicshallcounty.org",
  parentOrg: { name: "Special Olympics Georgia", url: "https://www.specialolympicsga.org/" },
};

export function isPlaceholderUrl(u: string) {
  return !u || u === "#" || /^https?:\/\/(www\.)?(facebook|instagram|youtube)\.com\/?$/.test(u);
}

// Shown in a bar above the navigation. Edit in content/announcement.json (or the CMS at /admin).
export const announcement = announcementJson as { active: boolean; text: string; textEs: string; cta: { label: string; labelEs: string; href: string } };

/* ------------------------------------------------------------------ */
/* Sports, practices, teams                                            */
/* ------------------------------------------------------------------ */

export type Sport = {
  slug: string;
  name: string;
  season: "Winter" | "Spring" | "Summer" | "Fall";
  months: string;
  blurb: string;
  image: string;
  icon: "Waves" | "Flag" | "CircleDot" | "Dribbble" | "Pins" | "Timer" | "Target";
  es?: { name: string; blurb: string };
};

export const sports: Sport[] = [
  { slug: "basketball", name: "Basketball", season: "Winter", months: "Nov – Feb", blurb: "Team and individual skills competition. Our teams practice weekly and compete at the Winter Games.", image: "/images/basketball-action.jpg", icon: "Dribbble", es: { name: "Baloncesto", blurb: "Competencia por equipos y de habilidades individuales. Nuestros equipos entrenan cada semana y compiten en los Juegos de Invierno." } },
  { slug: "bowling", name: "Bowling", season: "Winter", months: "Jan – Mar", blurb: "Singles, doubles, and unified bowling for athletes of every ability level.", image: "/images/team-bleachers.jpg", icon: "Pins", es: { name: "Boliche", blurb: "Individual, dobles y boliche unificado para atletas de todos los niveles." } },
  { slug: "athletics", name: "Athletics", season: "Spring", months: "Mar – May", blurb: "Track and field events including sprints, distance, relays, shot put, and long jump.", image: "/images/medals.jpg", icon: "Timer", es: { name: "Atletismo", blurb: "Pruebas de pista y campo: velocidad, fondo, relevos, lanzamiento de bala y salto de longitud." } },
  { slug: "swimming", name: "Swimming", season: "Summer", months: "May – Jul", blurb: "Freestyle, backstroke, breaststroke, and relays in a supportive pool environment.", image: "/images/athletes-flags.jpg", icon: "Waves", es: { name: "Natación", blurb: "Estilo libre, espalda, pecho y relevos en un ambiente de apoyo." } },
  { slug: "bocce", name: "Bocce Ball", season: "Summer", months: "Jun – Aug", blurb: "A precision sport that welcomes athletes of all ages and mobility levels.", image: "/images/team-outside.jpg", icon: "Target", es: { name: "Bochas", blurb: "Un deporte de precisión para atletas de todas las edades y niveles de movilidad." } },
  { slug: "flag-football", name: "Flag Football", season: "Fall", months: "Aug – Oct", blurb: "Fast-paced 5-on-5 unified flag football with athletes and partners on the same team.", image: "/images/flag-football.jpg", icon: "Flag", es: { name: "Fútbol Bandera", blurb: "Fútbol bandera unificado 5 contra 5, con atletas y compañeros en el mismo equipo." } },
  { slug: "softball", name: "Softball", season: "Fall", months: "Sep – Oct", blurb: "Team softball and individual skills competition leading up to the State Fall Games.", image: "/images/team-polos.jpg", icon: "CircleDot", es: { name: "Sóftbol", blurb: "Sóftbol por equipos y competencia de habilidades individuales rumbo a los Juegos Estatales de Otoño." } },
];

export type Practice = {
  sport: string; // sport slug
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  time: string;
  location: string; // location name
  coach?: string;
  start: string; // ISO date the weekly practice begins
  end: string; // ISO date it ends
  note?: string;
};

// PLACEHOLDER practice schedule
export const practices: Practice[] = [
  { sport: "basketball", day: 6, time: "10:00 – 11:30 AM", location: "Hall County Gym", coach: "Bobbie Young", start: "2026-11-07", end: "2027-02-20" },
  { sport: "basketball", day: 2, time: "6:00 – 7:30 PM", location: "Hall County Gym", coach: "Bobbie Young", start: "2026-11-10", end: "2027-02-16", note: "Skills group" },
  { sport: "bowling", day: 4, time: "4:30 – 6:00 PM", location: "Stars and Strikes Gainesville", coach: "Lisa Shows", start: "2027-01-07", end: "2027-03-18" },
  { sport: "athletics", day: 6, time: "9:00 – 10:30 AM", location: "Lanier Point Athletic Complex", start: "2027-03-06", end: "2027-05-15" },
  { sport: "swimming", day: 3, time: "6:00 – 7:00 PM", location: "Frances Meadows Aquatic Center", start: "2027-05-05", end: "2027-07-14" },
  { sport: "bocce", day: 6, time: "9:00 – 10:00 AM", location: "Allen Creek Soccer Complex", start: "2027-06-05", end: "2027-08-14" },
  { sport: "flag-football", day: 6, time: "9:00 – 10:30 AM", location: "Allen Creek Soccer Complex", coach: "Dave King", start: "2026-08-15", end: "2026-10-10" },
  { sport: "softball", day: 0, time: "2:00 – 3:30 PM", location: "Lanier Point Athletic Complex", start: "2026-09-06", end: "2026-10-11" },
];

export type Coach = { sport: string; name: string; role: string; bio: string; email?: string; image?: string; since?: number };

// PLACEHOLDER coaches
export const coaches: Coach[] = [
  { sport: "basketball", name: "Bobbie Young", role: "Head Coach", bio: "Bobbie has coached Hall County basketball for over a decade and runs our winter skills clinic.", email: "me2lynn@bellsouth.net", since: 2013 },
  { sport: "basketball", name: "Marcus Lee", role: "Assistant Coach", bio: "Former Gainesville High player who joined as a unified partner and never left.", since: 2021 },
  { sport: "bowling", name: "Lisa Shows", role: "Head Coach", bio: "Lisa coordinates our volunteers and leads Thursday bowling at Stars and Strikes.", email: "Lisazshows@gmail.com", since: 2017 },
  { sport: "flag-football", name: "Dave King", role: "Head Coach", bio: "Dave coaches our unified flag football team and represents families on the leadership team.", email: "Danddking@me.com", since: 2015 },
  { sport: "athletics", name: "Heather Gamble", role: "Head Coach", bio: "Our Local Coordinator also leads track and field every spring.", email: "hsgamb2386@gmail.com", since: 2010 },
  { sport: "swimming", name: "Volunteer needed", role: "Head Coach", bio: "We're looking for a certified coach to lead summer swimming. Training is free.", since: undefined },
  { sport: "bocce", name: "April Baldwin", role: "Head Coach", bio: "April chairs our leadership team and runs Saturday bocce.", email: "April.brunk1@gmail.com", since: 2016 },
  { sport: "softball", name: "Randi Brooks", role: "Head Coach", bio: "Randi keeps our books and our softball team's lineup card.", email: "randiroo0204@hotmail.com", since: 2018 },
];

export type Roster = { sport: string; showRoster: boolean; athletes: { name: string; since: number; also?: string[] }[] };

// PLACEHOLDER rosters. First name + last initial only. Set showRoster false to hide.
export const rosters: Roster[] = [
  { sport: "basketball", showRoster: true, athletes: [{ name: "Janessa K.", since: 2018, also: ["Bowling"] }, { name: "Willie M.", since: 2015, also: ["Athletics"] }, { name: "Tyler R.", since: 2020 }, { name: "Sam P.", since: 2022, also: ["Bocce"] }, { name: "Alex D.", since: 2019 }, { name: "Chris B.", since: 2017, also: ["Softball"] }] },
  { sport: "flag-football", showRoster: true, athletes: [{ name: "Willie M.", since: 2015 }, { name: "Chris B.", since: 2017 }, { name: "Tyler R.", since: 2020 }, { name: "Jordan W.", since: 2023 }] },
  { sport: "bowling", showRoster: true, athletes: [{ name: "Janessa K.", since: 2018 }, { name: "Alex D.", since: 2019 }, { name: "Maria G.", since: 2021 }] },
];

export const stats = [
  { value: 150, suffix: "+", label: "Athletes", labelEs: "Atletas" }, // PLACEHOLDER
  { value: 7, suffix: "", label: "Sports", labelEs: "Deportes" },
  { value: 80, suffix: "+", label: "Volunteers & Coaches", labelEs: "Voluntarios y entrenadores" }, // PLACEHOLDER
  { value: 365, suffix: "", label: "Days of Programming", labelEs: "Días de programación" },
];

/* ------------------------------------------------------------------ */
/* Events, shifts, fundraisers                                         */
/* ------------------------------------------------------------------ */

export type Shift = { role: string; time: string; needed: number; filled: number; es?: { role: string } };

export type Event = {
  slug: string;
  title: string;
  date: string; // ISO
  endDate?: string;
  time: string;
  location: string;
  address?: string;
  sport?: string;
  type: "Competition" | "Practice" | "Fundraiser" | "Community";
  description: string;
  shifts?: Shift[];
  registerHref?: string;
  es?: { title: string; description: string };
};

// Edit in content/events.json (or the CMS at /admin)
export const events: Event[] = eventsJson.events as Event[];

export type FundraiserOption = { id: string; label: string; price: number; desc: string; max?: number; es?: { label: string; desc: string } };

export type Fundraiser = {
  slug: string;
  name: string;
  when: string;
  date: string;
  blurb: string;
  image: string;
  href: string;
  eventSlug: string;
  long: string;
  options: FundraiserOption[];
  perks: string[];
  es?: { name: string; when: string; blurb: string; long: string; perks: string[] };
};

// PLACEHOLDER signature fundraisers
export const fundraisers: Fundraiser[] = [
  {
    slug: "golf",
    name: "Annual Golf Tournament",
    when: "Every October",
    date: "2026-10-24",
    blurb: "Our biggest fundraiser. Foursomes, hole sponsors, and a lunch with the athletes.",
    image: "/images/golf-group.jpg",
    href: "/fundraisers/golf",
    eventSlug: "golf-tournament-2026",
    long: "Eighteen holes at Chattahoochee Golf Club, an 8:00 AM shotgun start, and lunch served by our athletes. Every foursome funds one athlete's full season.",
    options: [
      { id: "foursome", label: "Foursome", price: 600, desc: "Four players, carts, lunch, and goodie bags", es: { label: "Cuarteto", desc: "Cuatro jugadores, carritos, almuerzo y bolsas de regalo" } },
      { id: "single", label: "Individual player", price: 150, desc: "We'll pair you with a team", es: { label: "Jugador individual", desc: "Te asignaremos a un equipo" } },
      { id: "hole", label: "Hole sponsor", price: 250, desc: "Your sign on a tee box", max: 18, es: { label: "Patrocinador de hoyo", desc: "Tu letrero en una salida" } },
      { id: "lunch", label: "Lunch sponsor", price: 1000, desc: "Logo on lunch tent and program", max: 1, es: { label: "Patrocinador del almuerzo", desc: "Logo en la carpa del almuerzo y el programa" } },
      { id: "title", label: "Title sponsor", price: 2500, desc: "Name on the tournament, a foursome, and logo everywhere", max: 1, es: { label: "Patrocinador principal", desc: "Nombre del torneo, un cuarteto y logo en todo" } },
    ],
    perks: ["Lunch served by our athletes", "Closest-to-the-pin and long-drive contests", "Raffle with local prizes", "Awards ceremony with the team"],
    es: { name: "Torneo Anual de Golf", when: "Cada octubre", blurb: "Nuestra recaudación más grande. Cuartetos, patrocinadores de hoyo y un almuerzo con los atletas.", long: "Dieciocho hoyos en Chattahoochee Golf Club, salida a las 8:00 AM y almuerzo servido por nuestros atletas. Cada cuarteto financia la temporada completa de un atleta.", perks: ["Almuerzo servido por nuestros atletas", "Concursos de precisión y distancia", "Rifa con premios locales", "Ceremonia de premiación con el equipo"] },
  },
  {
    slug: "plunge",
    name: "Polar Plunge",
    when: "Every February",
    date: "2027-02-06",
    blurb: "Freezin' for a reason. Jump into Lake Lanier and raise money for our athletes.",
    image: "/images/athletes-flags.jpg",
    href: "/fundraisers/plunge",
    eventSlug: "polar-plunge",
    long: "Gather a team, collect pledges, and jump into Lake Lanier in February. Costumes strongly encouraged. Hot cocoa guaranteed.",
    options: [
      { id: "plunger", label: "Plunger", price: 50, desc: "Registration + long-sleeve shirt", es: { label: "Participante", desc: "Inscripción + camiseta de manga larga" } },
      { id: "team", label: "Team of 5", price: 200, desc: "Five plungers, one team photo", es: { label: "Equipo de 5", desc: "Cinco participantes, una foto de equipo" } },
      { id: "chicken", label: "Too chicken to plunge", price: 35, desc: "Shirt and cocoa, no lake required", es: { label: "Sin zambullida", desc: "Camiseta y chocolate, sin lago" } },
      { id: "sponsor", label: "Warming tent sponsor", price: 500, desc: "Logo on the tent and every towel", max: 2, es: { label: "Patrocinador de la carpa", desc: "Logo en la carpa y en cada toalla" } },
    ],
    perks: ["Costume contest", "Hot cocoa and chili", "Team photo at the dock", "Law enforcement plunge-off"],
    es: { name: "Zambullida Polar", when: "Cada febrero", blurb: "Congelados por una causa. Lánzate al lago Lanier y recauda fondos para nuestros atletas.", long: "Reúne un equipo, consigue promesas de donación y lánzate al lago Lanier en febrero. Disfraces muy recomendados. Chocolate caliente garantizado.", perks: ["Concurso de disfraces", "Chocolate caliente y chili", "Foto de equipo en el muelle", "Zambullida de la policía"] },
  },
  {
    slug: "tip-a-cop",
    name: "Tip-A-Cop Night",
    when: "Spring",
    date: "2027-04-15",
    blurb: "Local law enforcement wait tables for the Torch Run. Tips go to our program.",
    image: "/images/team-polos.jpg",
    href: "/fundraisers/tip-a-cop",
    eventSlug: "",
    long: "Officers from Hall County and Gainesville trade their badges for aprons for one night. Come eat, tip big, and meet our athletes.",
    options: [{ id: "table", label: "Reserve a table", price: 0, desc: "Free. Just tip generously.", es: { label: "Reservar mesa", desc: "Gratis. Solo deja buena propina." } }],
    perks: ["Meet local officers and athletes", "Raffle", "Kids eat free"],
    es: { name: "Noche Tip-A-Cop", when: "Primavera", blurb: "La policía local sirve mesas por la Carrera de la Antorcha. Las propinas van a nuestro programa.", long: "Oficiales de Hall County y Gainesville cambian la placa por un delantal por una noche. Ven a comer, deja buena propina y conoce a nuestros atletas.", perks: ["Conoce a oficiales y atletas", "Rifa", "Los niños comen gratis"] },
  },
];

export const campaign = campaignJson as { active: boolean; name: string; nameEs: string; goal: number; raised: number; deadline: string; blurb: string; blurbEs: string };

export type AthleteSponsorship = { name: string; sport: string; image: string; need: string; amount: number; funded: boolean; es?: { need: string } };

// PLACEHOLDER athlete sponsorships (first names only, with family permission)
export const athleteSponsorships: AthleteSponsorship[] = [
  { name: "Willie", sport: "Powerlifting · Athletics", image: "/images/powerlifting.jpg", need: "State Games travel, lodging, and a new singlet.", amount: 250, funded: false, es: { need: "Viaje y hospedaje para los Juegos Estatales y un uniforme nuevo." } },
  { name: "Janessa", sport: "Basketball · Bowling", image: "/images/basketball-team.jpg", need: "Winter season registration and bowling fees.", amount: 250, funded: true, es: { need: "Inscripción de invierno y cuotas de boliche." } },
  { name: "Tyler", sport: "Flag Football", image: "/images/flag-football.jpg", need: "Cleats, a jersey, and the fall bus trip.", amount: 250, funded: false, es: { need: "Tacos, camiseta y el viaje en autobús de otoño." } },
  { name: "Maria", sport: "Bowling · Bocce", image: "/images/team-outside.jpg", need: "Bowling shoes and summer bocce season.", amount: 250, funded: false, es: { need: "Zapatos de boliche y la temporada de bochas." } },
];

/* ------------------------------------------------------------------ */
/* Sponsors                                                            */
/* ------------------------------------------------------------------ */

export type SponsorTier = "Gold" | "Silver" | "Bronze" | "Partner";
export type Sponsor = { name: string; tier: SponsorTier; logo?: string; url?: string };

// Edit in content/sponsors.json. Add a logo path (e.g. /images/sponsors/x.png) to show a logo instead of text.
export const sponsors: Sponsor[] = sponsorsJson.sponsors as Sponsor[];

export const sponsorTiers: { name: SponsorTier; amount: string; perks: string[]; es: { perks: string[] } }[] = [
  { name: "Bronze", amount: "$500", perks: ["Logo on event banner", "Social media thank-you", "Listing on this website"], es: { perks: ["Logo en la pancarta del evento", "Agradecimiento en redes sociales", "Mención en este sitio web"] } },
  { name: "Silver", amount: "$1,000", perks: ["Everything in Bronze", "Logo on team shirts", "Logo on sponsor wall"], es: { perks: ["Todo lo de Bronce", "Logo en las camisetas del equipo", "Logo en el muro de patrocinadores"] } },
  { name: "Gold", amount: "$2,500", perks: ["Everything in Silver", "Golf tournament foursome", "Named sponsor of a season", "Logo on the homepage"], es: { perks: ["Todo lo de Plata", "Cuarteto en el torneo de golf", "Patrocinador oficial de una temporada", "Logo en la página principal"] } },
];

/* ------------------------------------------------------------------ */
/* Stories, news, athlete of the month, results                        */
/* ------------------------------------------------------------------ */

export type Story = { name: string; role: string; sport: string; quote: string; image: string; video?: string; es?: { role: string; quote: string } };

// Edit in content/stories.json. `video` is a YouTube video ID.
export const stories: Story[] = storiesJson.stories as Story[];

export type Post = { slug: string; title: string; date: string; excerpt: string; image: string; body: string[]; video?: string; es?: { title: string; excerpt: string; body: string[] } };

// Edit in content/posts.json
export const posts: Post[] = postsJson.posts as Post[];

export type AthleteOfMonth = { month: string; name: string; sport: string; image: string; story: string; es?: { story: string } };

// Edit in content/athleteOfMonth.json (most recent first)
export const athleteOfMonth: AthleteOfMonth[] = aomJson.athletes as AthleteOfMonth[];

export type Result = {
  slug: string;
  competition: string;
  date: string;
  location: string;
  medals: { gold: number; silver: number; bronze: number; ribbons: number };
  highlights: { athlete: string; sport: string; event: string; place: 1 | 2 | 3 | 4 }[];
  recap?: string; // post slug
  es?: { competition: string };
};

// Edit in content/results.json (most recent first)
export const results: Result[] = resultsJson.results as Result[];

/* ------------------------------------------------------------------ */
/* Team, giving, locations                                             */
/* ------------------------------------------------------------------ */

export type TeamMember = { name: string; role: string; email?: string; roleEs?: string };

export const team: TeamMember[] = [
  { name: "Heather Gamble", role: "Local Coordinator", roleEs: "Coordinadora local", email: "hsgamb2386@gmail.com" },
  { name: "April Baldwin", role: "Chairperson", roleEs: "Presidenta", email: "April.brunk1@gmail.com" },
  { name: "Randi Brooks", role: "Treasurer", roleEs: "Tesorera", email: "randiroo0204@hotmail.com" },
  { name: "Bobbie Young", role: "Coach Coordinator", roleEs: "Coordinadora de entrenadores", email: "me2lynn@bellsouth.net" },
  { name: "Lisa Shows", role: "Volunteer Coordinator", roleEs: "Coordinadora de voluntarios", email: "Lisazshows@gmail.com" },
  { name: "Dave King", role: "Family & Community Representative", roleEs: "Representante de familias y comunidad", email: "Danddking@me.com" },
  { name: "Janessa King", role: "Athlete Representative", roleEs: "Representante de atletas" },
];

export const givingLevels = [
  { amount: 25, label: "Covers an athlete's competition registration fee", labelEs: "Cubre la cuota de inscripción de un atleta" },
  { amount: 50, label: "Outfits an athlete with a team uniform", labelEs: "Viste a un atleta con el uniforme del equipo" },
  { amount: 100, label: "Provides equipment for a full practice season", labelEs: "Provee equipo para toda una temporada" },
  { amount: 250, label: "Sends an athlete to State Games with lodging and transportation", labelEs: "Envía a un atleta a los Juegos Estatales con hospedaje y transporte" },
];

export type Location = { name: string; address: string; sports: string[]; mapQuery: string };

// PLACEHOLDER practice locations
export const locations: Location[] = [
  { name: "Hall County Gym", address: "Gainesville, GA 30501", sports: ["Basketball"], mapQuery: "Gainesville GA" },
  { name: "Frances Meadows Aquatic Center", address: "1545 Community Way NE, Gainesville, GA 30501", sports: ["Swimming"], mapQuery: "Frances Meadows Aquatic Center Gainesville GA" },
  { name: "Stars and Strikes Gainesville", address: "Gainesville, GA", sports: ["Bowling"], mapQuery: "Stars and Strikes Gainesville GA" },
  { name: "Allen Creek Soccer Complex", address: "Gainesville, GA", sports: ["Flag Football", "Bocce"], mapQuery: "Allen Creek Soccer Complex Gainesville GA" },
  { name: "Lanier Point Athletic Complex", address: "Gainesville, GA", sports: ["Softball", "Athletics"], mapQuery: "Lanier Point Athletic Complex Gainesville GA" },
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

/* ------------------------------------------------------------------ */
/* FAQ, resources, competition guide                                   */
/* ------------------------------------------------------------------ */

export const faqs = [
  { q: "Who is eligible to be an athlete?", a: "Anyone age 8 or older with an intellectual disability, cognitive delay, or a closely related developmental disability. There is no upper age limit, and no prior sports experience is needed.", es: { q: "¿Quién puede ser atleta?", a: "Cualquier persona de 8 años o más con discapacidad intelectual, retraso cognitivo o una discapacidad del desarrollo relacionada. No hay límite de edad ni se requiere experiencia deportiva." } },
  { q: "How much does it cost?", a: "Nothing. Training, uniforms, equipment, competition registration, travel, and lodging for State Games are all covered by our fundraising and sponsors.", es: { q: "¿Cuánto cuesta?", a: "Nada. Entrenamiento, uniformes, equipo, inscripción a competencias, viajes y hospedaje para los Juegos Estatales están cubiertos por nuestras recaudaciones y patrocinadores." } },
  { q: "How do I register my athlete?", a: "Use the online registration on this site, then complete the Special Olympics Georgia medical form and have a physician sign it. Email it to our Local Coordinator. The medical form is valid for three years.", es: { q: "¿Cómo inscribo a mi atleta?", a: "Usa la inscripción en línea de este sitio, luego completa el formulario médico de Special Olympics Georgia y pide a un médico que lo firme. Envíalo a nuestra coordinadora local. El formulario médico es válido por tres años." } },
  { q: "Can my athlete play more than one sport?", a: "Yes. Most of our athletes play two or three sports across the year. Seasons are staggered so they rarely overlap.", es: { q: "¿Puede mi atleta practicar más de un deporte?", a: "Sí. La mayoría de nuestros atletas practican dos o tres deportes al año. Las temporadas están escalonadas y rara vez coinciden." } },
  { q: "What is a Unified Partner?", a: "A teammate without an intellectual disability who trains and competes alongside our athletes on the same team. Partners are matched by age and ability.", es: { q: "¿Qué es un compañero unificado?", a: "Un compañero de equipo sin discapacidad intelectual que entrena y compite junto a nuestros atletas en el mismo equipo. Se emparejan por edad y habilidad." } },
  { q: "Do volunteers need a background check?", a: "Coaches and any volunteer with regular contact with athletes complete a free Class A volunteer form and background check through Special Olympics Georgia. Day-of-event volunteers do not.", es: { q: "¿Los voluntarios necesitan verificación de antecedentes?", a: "Los entrenadores y cualquier voluntario con contacto regular con atletas completan un formulario Clase A y una verificación de antecedentes gratuita a través de Special Olympics Georgia. Los voluntarios de un solo día no la necesitan." } },
  { q: "Where do you practice?", a: "Practices happen at gyms, pools, fields, and bowling centers around Gainesville and Hall County. See the Where We Practice page and the Practice Schedule page.", es: { q: "¿Dónde entrenan?", a: "Los entrenamientos se realizan en gimnasios, piscinas, campos y boliches en Gainesville y Hall County. Mira la página Dónde entrenamos y la página de Horario de entrenamientos." } },
  { q: "Is my donation tax-deductible?", a: "Yes. Special Olympics Hall County is a local program of Special Olympics Georgia, a 501(c)(3) nonprofit. We'll send a receipt for every gift.", es: { q: "¿Mi donación es deducible de impuestos?", a: "Sí. Special Olympics Hall County es un programa local de Special Olympics Georgia, una organización sin fines de lucro 501(c)(3). Enviamos un recibo por cada donación." } },
];

export type Resource = { title: string; description: string; href: string; group: "Athletes" | "Volunteers & Coaches" | "Families" | "Policies"; es?: { title: string; description: string } };

// PLACEHOLDER links — point these at the real PDFs when available
export const resources: Resource[] = [
  { group: "Athletes", title: "Athlete Registration & Medical Form", description: "Required for every new athlete. Valid for three years once signed by a physician.", href: "https://www.specialolympicsga.org/", es: { title: "Formulario de inscripción y médico", description: "Requerido para cada atleta nuevo. Válido por tres años una vez firmado por un médico." } },
  { group: "Athletes", title: "Athlete Code of Conduct", description: "Expectations for athletes at practices, competitions, and travel.", href: "https://www.specialolympicsga.org/", es: { title: "Código de conducta del atleta", description: "Expectativas para los atletas en entrenamientos, competencias y viajes." } },
  { group: "Volunteers & Coaches", title: "Class A Volunteer Form", description: "For coaches, chaperones, and unified partners. Includes background check consent.", href: "https://www.specialolympicsga.org/", es: { title: "Formulario de voluntario Clase A", description: "Para entrenadores, acompañantes y compañeros unificados. Incluye consentimiento de verificación de antecedentes." } },
  { group: "Volunteers & Coaches", title: "Protective Behaviors Training", description: "Free online course required every three years for Class A volunteers.", href: "https://www.specialolympicsga.org/", es: { title: "Capacitación en conductas protectoras", description: "Curso gratuito en línea requerido cada tres años para voluntarios Clase A." } },
  { group: "Volunteers & Coaches", title: "Concussion Awareness Training", description: "Free online course required for all coaches.", href: "https://www.specialolympicsga.org/", es: { title: "Capacitación sobre conmociones cerebrales", description: "Curso gratuito en línea requerido para todos los entrenadores." } },
  { group: "Families", title: "What to Pack for State Games", description: "A checklist for overnight competition trips.", href: "/competition-guide", es: { title: "Qué empacar para los Juegos Estatales", description: "Lista para viajes de competencia con pernocta." } },
  { group: "Families", title: "Season Calendar", description: "Subscribe to practices, competitions, and deadlines in your phone's calendar.", href: "/events#subscribe", es: { title: "Calendario de temporada", description: "Suscríbete a entrenamientos, competencias y fechas límite en el calendario de tu teléfono." } },
  { group: "Policies", title: "Special Olympics Georgia Policies", description: "Eligibility, divisioning, and participation policies from our state office.", href: "https://www.specialolympicsga.org/", es: { title: "Políticas de Special Olympics Georgia", description: "Políticas de elegibilidad, divisiones y participación de nuestra oficina estatal." } },
];

export const competitionGuide = {
  packing: [
    { item: "Team uniform and warm-ups (both days)", es: "Uniforme y ropa de calentamiento (ambos días)" },
    { item: "Athletic shoes and a backup pair", es: "Zapatos deportivos y un par de repuesto" },
    { item: "Medications in original bottles, with the medical form", es: "Medicamentos en sus frascos originales, con el formulario médico" },
    { item: "Refillable water bottle", es: "Botella de agua reutilizable" },
    { item: "Snacks (nothing that melts)", es: "Bocadillos (nada que se derrita)" },
    { item: "Toiletries and pajamas", es: "Artículos de aseo y pijama" },
    { item: "Phone charger", es: "Cargador de teléfono" },
    { item: "Spending money for meals on the road ($30 suggested)", es: "Dinero para comidas en el camino ($30 sugerido)" },
    { item: "Sunscreen and a hat for outdoor events", es: "Protector solar y gorra para eventos al aire libre" },
    { item: "A good attitude. Medals are nice. Being brave is better.", es: "Buena actitud. Las medallas son lindas. Ser valiente es mejor." },
  ],
  expect: [
    { title: "Friday: travel day", text: "We load the bus at 2 PM from the Hall County Gym. Chaperones ride with athletes. Families are welcome to drive separately and meet us at the hotel.", es: { title: "Viernes: día de viaje", text: "Cargamos el autobús a las 2 PM desde el gimnasio de Hall County. Los acompañantes viajan con los atletas. Las familias pueden manejar por su cuenta y vernos en el hotel." } },
    { title: "Opening ceremony", text: "Every county marches in with its banner. It's loud, it's emotional, and it's the best part of the weekend.", es: { title: "Ceremonia de apertura", text: "Cada condado desfila con su pancarta. Es ruidoso, emotivo y la mejor parte del fin de semana." } },
    { title: "Divisioning", text: "Athletes compete against others of similar ability, so everyone has a real shot at the podium.", es: { title: "Divisiones", text: "Los atletas compiten contra otros de habilidad similar, así que todos tienen una oportunidad real de subir al podio." } },
    { title: "Awards", text: "Medals for first through third, ribbons for fourth and beyond. Every athlete is announced by name.", es: { title: "Premiación", text: "Medallas del primero al tercer lugar, listones del cuarto en adelante. Cada atleta es anunciado por su nombre." } },
    { title: "Sunday: home", text: "We're usually back at the gym by 6 PM. We'll text families when we're 30 minutes out.", es: { title: "Domingo: regreso", text: "Normalmente llegamos al gimnasio a las 6 PM. Enviamos un mensaje a las familias 30 minutos antes." } },
  ],
};


/* ------------------------------------------------------------------ */
/* Registration windows, alerts, birthdays, carpools                   */
/* ------------------------------------------------------------------ */

export type RegistrationWindow = { season: Sport["season"]; opens: string; closes: string; href: string };

// PLACEHOLDER registration deadlines (ISO dates)
export const registrationWindows: RegistrationWindow[] = [
  { season: "Winter", opens: "2026-10-01", closes: "2026-10-31", href: "/register" },
  { season: "Spring", opens: "2027-01-15", closes: "2027-02-28", href: "/register" },
  { season: "Summer", opens: "2027-04-01", closes: "2027-05-15", href: "/register" },
  { season: "Fall", opens: "2027-07-01", closes: "2027-08-10", href: "/register" },
];

// Weather / cancellation alert. Flip `active` and edit the text when needed.
export const alert = {
  active: true, // PLACEHOLDER — set false when there is no alert
  level: "warning" as "info" | "warning" | "cancel",
  text: "Saturday flag football moves indoors to the Hall County Gym due to lightning risk.",
  textEs: "El fútbol bandera del sábado se traslada al gimnasio de Hall County por riesgo de tormentas.",
  sports: ["flag-football"], // sport slugs affected; empty = everyone
  updated: "2026-10-07",
};

export type Birthday = { name: string; month: number; day: number; sport: string };

// PLACEHOLDER birthdays (first names only, with family permission)
export const birthdays: Birthday[] = [
  { name: "Willie", month: 10, day: 12, sport: "Powerlifting" },
  { name: "Janessa", month: 10, day: 23, sport: "Basketball" },
  { name: "Tyler", month: 11, day: 4, sport: "Flag Football" },
  { name: "Maria", month: 10, day: 30, sport: "Bowling" },
  { name: "Sam", month: 12, day: 15, sport: "Bocce" },
  { name: "Alex", month: 11, day: 19, sport: "Bowling" },
];

export type Carpool = { type: "offer" | "request"; from: string; to: string; when: string; seats?: number; contact: string; note?: string };

// PLACEHOLDER carpool board. New entries come in by email and get added here.
export const carpools: Carpool[] = [
  { type: "offer", from: "Flowery Branch", to: "State Fall Games (Valdosta)", when: "Fri Oct 16, 1:00 PM", seats: 3, contact: "the King family", note: "Minivan, room for one wheelchair." },
  { type: "offer", from: "Oakwood", to: "Saturday basketball practice", when: "Every Saturday 9:30 AM", seats: 2, contact: "Coach Bobbie" },
  { type: "request", from: "Lula", to: "Thursday bowling", when: "Thursdays 4:00 PM", contact: "Maria's mom", note: "Happy to split gas." },
];

/* ------------------------------------------------------------------ */
/* Volunteers, coaches, checklists                                     */
/* ------------------------------------------------------------------ */

export type VolunteerHours = { name: string; hours: number; role: string };

// PLACEHOLDER volunteer hours for the current season
export const volunteerHours: VolunteerHours[] = [
  { name: "Lisa S.", hours: 142, role: "Volunteer Coordinator" },
  { name: "Bobbie Y.", hours: 128, role: "Head Coach" },
  { name: "Dave K.", hours: 96, role: "Head Coach" },
  { name: "Rachael D.", hours: 88, role: "Unified Partner" },
  { name: "Marcus L.", hours: 64, role: "Assistant Coach" },
  { name: "The Nguyen family", hours: 52, role: "Event volunteers" },
  { name: "Gainesville HS Beta Club", hours: 40, role: "Event volunteers" },
  { name: "April B.", hours: 38, role: "Chairperson" },
];

export type Certification = { coach: string; protectiveBehaviors?: string; concussion?: string; classA?: string };
export const CERT_VALID_YEARS = 3;

// PLACEHOLDER certification dates (ISO). Each is valid for CERT_VALID_YEARS.
export const certifications: Certification[] = [
  { coach: "Bobbie Young", protectiveBehaviors: "2025-08-10", concussion: "2025-08-10", classA: "2024-09-01" },
  { coach: "Marcus Lee", protectiveBehaviors: "2023-09-02", concussion: "2024-01-15", classA: "2023-09-02" },
  { coach: "Lisa Shows", protectiveBehaviors: "2026-01-20", concussion: "2026-01-20", classA: "2026-01-20" },
  { coach: "Dave King", protectiveBehaviors: "2024-07-30", concussion: "2023-06-11", classA: "2024-07-30" },
  { coach: "Heather Gamble", protectiveBehaviors: "2025-03-05", concussion: "2025-03-05", classA: "2025-03-05" },
  { coach: "April Baldwin", protectiveBehaviors: "2024-11-12", concussion: "2024-11-12", classA: "2024-11-12" },
  { coach: "Randi Brooks", protectiveBehaviors: "2023-08-01", concussion: "2023-08-01", classA: "2023-08-01" },
];

export type CoachResource = { sport: string | "all"; title: string; type: "Practice plan" | "Drills" | "Rules" | "Divisioning" | "Safety"; href: string; desc: string; es?: { title: string; desc: string } };

// PLACEHOLDER coach resources
export const coachResources: CoachResource[] = [
  { sport: "all", title: "Special Olympics Coaching Guides", type: "Rules", href: "https://resources.specialolympics.org/sports-essentials/sport-rules", desc: "Official rules and coaching guides for every sport.", es: { title: "Guías de entrenamiento de Special Olympics", desc: "Reglas oficiales y guías de entrenamiento de cada deporte." } },
  { sport: "all", title: "Divisioning 101", type: "Divisioning", href: "https://www.specialolympicsga.org/", desc: "How athletes are grouped so everyone competes against similar ability.", es: { title: "Divisiones 101", desc: "Cómo se agrupan los atletas para competir contra habilidad similar." } },
  { sport: "all", title: "Heat, hydration, and weather policy", type: "Safety", href: "https://www.specialolympicsga.org/", desc: "When to move indoors, cancel, or add water breaks.", es: { title: "Calor, hidratación y clima", desc: "Cuándo trasladarse bajo techo, cancelar o agregar pausas de agua." } },
  { sport: "basketball", title: "8-week basketball practice plan", type: "Practice plan", href: "#", desc: "Warm-up, skills stations, scrimmage, and cool-down for a 90-minute practice.", es: { title: "Plan de 8 semanas de baloncesto", desc: "Calentamiento, estaciones, partido y enfriamiento para 90 minutos." } },
  { sport: "basketball", title: "Individual skills contest drills", type: "Drills", href: "#", desc: "Target pass, 10-meter dribble, and spot shot practice.", es: { title: "Ejercicios de habilidades individuales", desc: "Pase a objetivo, dribbling de 10 metros y tiro desde puntos." } },
  { sport: "bowling", title: "Ramp and bumper guidelines", type: "Rules", href: "#", desc: "Who qualifies for ramps and how divisions handle them.", es: { title: "Guía de rampas y barandas", desc: "Quién califica para rampas y cómo las manejan las divisiones." } },
  { sport: "athletics", title: "Track meet warm-up routine", type: "Drills", href: "#", desc: "A 15-minute dynamic warm-up for sprints and relays.", es: { title: "Calentamiento para pista", desc: "Calentamiento dinámico de 15 minutos para velocidad y relevos." } },
  { sport: "swimming", title: "Pool safety checklist", type: "Safety", href: "#", desc: "Lifeguard ratios, lane etiquette, and flotation rules.", es: { title: "Lista de seguridad en piscina", desc: "Proporción de salvavidas, reglas de carril y flotación." } },
  { sport: "flag-football", title: "Unified flag football playbook", type: "Practice plan", href: "#", desc: "Ten plays that work with mixed-ability lineups.", es: { title: "Libro de jugadas de fútbol bandera", desc: "Diez jugadas que funcionan con alineaciones mixtas." } },
  { sport: "bocce", title: "Bocce scoring and court setup", type: "Rules", href: "#", desc: "Court dimensions and how to score a frame.", es: { title: "Puntuación y cancha de bochas", desc: "Dimensiones de la cancha y cómo puntuar." } },
  { sport: "softball", title: "Softball skills stations", type: "Drills", href: "#", desc: "Throwing, fielding, hitting, and base-running stations.", es: { title: "Estaciones de sóftbol", desc: "Estaciones de lanzar, fildear, batear y correr bases." } },
];

export type Checklist = { role: string; es: string; items: { text: string; es: string }[] };

// Day-of-event checklists by volunteer role
export const checklists: Checklist[] = [
  { role: "Check-in table", es: "Mesa de registro", items: [{ text: "Pick up the roster, lanyards, and pens from the coordinator", es: "Recoge la lista, gafetes y bolígrafos con la coordinadora" }, { text: "Set up two lines: athletes and volunteers", es: "Arma dos filas: atletas y voluntarios" }, { text: "Check each athlete's name against the roster and hand out a lanyard", es: "Verifica cada nombre en la lista y entrega un gafete" }, { text: "Collect any new medical forms and put them in the red folder", es: "Recibe formularios médicos nuevos y guárdalos en la carpeta roja" }, { text: "Point families to the restrooms, water, and the schedule board", es: "Indica a las familias los baños, el agua y el tablero de horarios" }, { text: "Return the roster to the coordinator when the line closes", es: "Devuelve la lista a la coordinadora al cerrar" }] },
  { role: "Chaperone", es: "Acompañante", items: [{ text: "Confirm your athlete group and their medical forms", es: "Confirma tu grupo de atletas y sus formularios médicos" }, { text: "Count heads at every transition: bus, venue, meals, hotel", es: "Cuenta a todos en cada transición: autobús, sede, comidas, hotel" }, { text: "Keep medications in the original bottles with the coordinator", es: "Mantén los medicamentos en sus frascos originales con la coordinadora" }, { text: "Never be alone with a single athlete (two-deep rule)", es: "Nunca estés a solas con un solo atleta (regla de dos adultos)" }, { text: "Text the family group at departure and arrival", es: "Avisa al grupo de familias al salir y al llegar" }, { text: "Lights out at 10 PM; hallway check at 10:30", es: "Luces apagadas a las 10 PM; revisión del pasillo a las 10:30" }] },
  { role: "Hole spotter", es: "Observador de hoyo", items: [{ text: "Arrive by 7:30 AM and find your hole on the map", es: "Llega a las 7:30 AM y ubica tu hoyo en el mapa" }, { text: "Bring sunscreen, a chair, and water", es: "Trae protector solar, silla y agua" }, { text: "Watch each drive and mark where balls land", es: "Observa cada golpe y marca dónde caen las bolas" }, { text: "Run the closest-to-the-pin or long-drive measurement if assigned", es: "Mide el tiro más cercano o el más largo si te lo asignan" }, { text: "Radio the clubhouse if a group falls more than one hole behind", es: "Avisa por radio si un grupo se retrasa más de un hoyo" }] },
  { role: "Setup / cleanup crew", es: "Equipo de montaje / limpieza", items: [{ text: "Unload tables, chairs, banners, and the sound system", es: "Descarga mesas, sillas, pancartas y el equipo de sonido" }, { text: "Hang the Hall County banner where photos will be taken", es: "Cuelga la pancarta de Hall County donde se tomarán fotos" }, { text: "Set out water and snacks in the volunteer area", es: "Coloca agua y bocadillos en el área de voluntarios" }, { text: "Bag trash and recycling separately", es: "Separa basura y reciclaje" }, { text: "Do a final sweep for lost items and medals", es: "Revisa por última vez objetos perdidos y medallas" }] },
  { role: "Dance buddy", es: "Compañero de baile", items: [{ text: "Introduce yourself to two athletes you don't know", es: "Preséntate a dos atletas que no conozcas" }, { text: "Invite anyone sitting alone onto the floor", es: "Invita a bailar a quien esté sentado solo" }, { text: "Respect a 'no thanks' the first time", es: "Respeta un 'no, gracias' a la primera" }, { text: "Help with plates and drinks at dinner", es: "Ayuda con platos y bebidas en la cena" }, { text: "Stay until the last family has left", es: "Quédate hasta que se vaya la última familia" }] },
];

/* ------------------------------------------------------------------ */
/* Giving: recurring, wish list, matching gifts                        */
/* ------------------------------------------------------------------ */

export const recurringLevels = [
  { name: "Teammate", amount: 10, perks: ["Monthly photo update", "Name on the website"], es: { perks: ["Foto mensual", "Nombre en el sitio web"] } },
  { name: "Starter", amount: 25, perks: ["Everything in Teammate", "Season results email", "Hall County T-shirt"], es: { perks: ["Todo lo de Teammate", "Correo con resultados", "Camiseta de Hall County"] } },
  { name: "Captain", amount: 50, perks: ["Everything in Starter", "Invite to the end-of-season banquet"], es: { perks: ["Todo lo de Starter", "Invitación al banquete de fin de temporada"] } },
  { name: "MVP", amount: 100, perks: ["Everything in Captain", "Sponsor one athlete's full season each year"], es: { perks: ["Todo lo de Captain", "Patrocina la temporada completa de un atleta cada año"] } },
];

export type WishItem = { item: string; es: string; qty: number; price: number; sport: string; claimed: number; url?: string };

// PLACEHOLDER wish list. `claimed` counts how many units donors have covered.
export const wishlist: WishItem[] = [
  { item: "Bowling balls (8–12 lb)", es: "Bolas de boliche (8–12 lb)", qty: 12, price: 40, sport: "Bowling", claimed: 5 },
  { item: "Reversible practice jerseys", es: "Camisetas reversibles de entrenamiento", qty: 30, price: 18, sport: "Basketball", claimed: 30 },
  { item: "Bocce ball sets", es: "Juegos de bochas", qty: 4, price: 65, sport: "Bocce", claimed: 1 },
  { item: "Flag football belts (set of 12)", es: "Cinturones de fútbol bandera (12)", qty: 3, price: 55, sport: "Flag Football", claimed: 0 },
  { item: "Pop-up canopy tent for outdoor events", es: "Carpa plegable para eventos", qty: 2, price: 180, sport: "Events", claimed: 1 },
  { item: "Kickboards and pull buoys", es: "Tablas y boyas de natación", qty: 10, price: 15, sport: "Swimming", claimed: 0 },
  { item: "Shot put (6 lb and 8 lb)", es: "Balas (6 y 8 lb)", qty: 4, price: 35, sport: "Athletics", claimed: 2 },
  { item: "First-aid kits", es: "Botiquines", qty: 5, price: 45, sport: "Events", claimed: 3 },
];

export type MatchingEmployer = { name: string; ratio: string; max?: string; url?: string };

// PLACEHOLDER matching-gift employers in and around Hall County
export const matchingEmployers: MatchingEmployer[] = [
  { name: "Northeast Georgia Health System", ratio: "1:1", max: "$2,500" },
  { name: "Publix", ratio: "1:1", max: "$5,000" },
  { name: "Kubota Manufacturing of America", ratio: "1:1", max: "$1,000" },
  { name: "Fieldale Farms", ratio: "1:1" },
  { name: "Home Depot", ratio: "1:1", max: "$5,000", url: "https://corporate.homedepot.com/" },
  { name: "Coca-Cola", ratio: "2:1", max: "$10,000" },
  { name: "Georgia Power / Southern Company", ratio: "1:1", max: "$10,000" },
  { name: "Wells Fargo", ratio: "1:1", max: "$5,000" },
  { name: "Bank of America", ratio: "1:1", max: "$5,000" },
  { name: "Microsoft", ratio: "1:1", max: "$15,000" },
  { name: "Apple", ratio: "1:1", max: "$10,000" },
  { name: "Delta Air Lines", ratio: "1:1" },
  { name: "UPS", ratio: "1:1" },
  { name: "State Farm", ratio: "1:1" },
];

export function certStatus(iso?: string, today = new Date()): "valid" | "expiring" | "expired" | "missing" {
  if (!iso) return "missing";
  const exp = new Date(iso + "T00:00:00");
  exp.setFullYear(exp.getFullYear() + CERT_VALID_YEARS);
  const days = (exp.getTime() - today.getTime()) / 86400000;
  if (days < 0) return "expired";
  if (days < 90) return "expiring";
  return "valid";
}

/** Local calendar date as YYYY-MM-DD (never shifts by timezone like toISOString does). */
export function localISO(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysUntil(iso: string, from = new Date()) {
  const t = new Date(iso + "T23:59:59").getTime() - from.getTime();
  return Math.ceil(t / 86400000);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }, lang: Lang = "en") {
  return new Date(iso + "T12:00:00").toLocaleDateString(lang === "es" ? "es-US" : "en-US", opts);
}

/** Pick the Spanish version of a field when available. */
export function loc<T extends { es?: Partial<Record<string, unknown>> }, K extends keyof T>(lang: Lang, item: T, key: K): T[K] {
  if (lang === "es" && item.es && key in item.es) return item.es[key as string] as T[K];
  return item[key];
}

export const sportName = (slug: string, lang: Lang = "en") => {
  const s = sports.find((x) => x.slug === slug);
  return s ? loc(lang, s, "name") : slug;
};

export const nextCompetition = () => [...events].filter((e) => e.type === "Competition").sort((a, b) => a.date.localeCompare(b.date))[0];
