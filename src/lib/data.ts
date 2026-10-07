// Central content file. Anything marked PLACEHOLDER should be replaced with
// real details from the Hall County program before launch.
// Optional `es` objects hold Spanish versions of user-facing text.

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

// Shown in a bar above the navigation. Set `active: false` to hide it.
export const announcement = {
  active: true,
  text: "Winter season registration is open", // PLACEHOLDER
  textEs: "Las inscripciones para la temporada de invierno están abiertas",
  cta: { label: "Register now", labelEs: "Inscríbete", href: "/register" },
};

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

// PLACEHOLDER events — replace with the real season schedule
export const events: Event[] = [
  { slug: "fall-games-2026", title: "State Fall Games", date: "2026-10-17", endDate: "2026-10-18", time: "All day", location: "Valdosta, GA", address: "Valdosta State University, Valdosta, GA", sport: "Flag Football · Softball", type: "Competition", description: "Our flag football and softball teams travel to compete against programs from across Georgia.", es: { title: "Juegos Estatales de Otoño", description: "Nuestros equipos de fútbol bandera y sóftbol viajan para competir contra programas de todo Georgia." }, shifts: [{ role: "Chaperone (overnight)", time: "Fri 2 PM – Sun 6 PM", needed: 6, filled: 4, es: { role: "Acompañante (con pernocta)" } }, { role: "Bus loading crew", time: "Fri 1:00 – 2:30 PM", needed: 4, filled: 1, es: { role: "Equipo de carga del autobús" } }] },
  { slug: "golf-tournament-2026", title: "Annual Golf Tournament", date: "2026-10-24", time: "8:00 AM shotgun start", location: "Chattahoochee Golf Club, Gainesville", address: "301 Tommy Aaron Dr, Gainesville, GA 30506", type: "Fundraiser", description: "Our biggest fundraiser of the year. Sponsorships, foursomes, and hole sponsors available.", registerHref: "/fundraisers/golf", es: { title: "Torneo Anual de Golf", description: "Nuestra recaudación de fondos más grande del año. Patrocinios, cuartetos y patrocinadores de hoyo disponibles." }, shifts: [{ role: "Check-in table", time: "6:30 – 9:00 AM", needed: 4, filled: 2, es: { role: "Mesa de registro" } }, { role: "Hole spotter", time: "8:00 AM – 1:00 PM", needed: 18, filled: 9, es: { role: "Observador de hoyo" } }, { role: "Lunch service", time: "12:00 – 2:30 PM", needed: 6, filled: 3, es: { role: "Servicio de almuerzo" } }] },
  { slug: "basketball-tryouts", title: "Basketball Season Kickoff", date: "2026-11-07", time: "10:00 AM – 12:00 PM", location: "Hall County Gym", sport: "Basketball", type: "Practice", description: "First practice of the winter season. New athletes welcome — bring a water bottle and a smile.", es: { title: "Inicio de la temporada de baloncesto", description: "Primer entrenamiento de la temporada de invierno. Bienvenidos los nuevos atletas: traigan agua y una sonrisa." }, shifts: [{ role: "Registration help", time: "9:30 – 10:30 AM", needed: 3, filled: 0, es: { role: "Ayuda con inscripciones" } }] },
  { slug: "holiday-dance", title: "Athlete Holiday Dance", date: "2026-12-12", time: "6:00 – 9:00 PM", location: "Community Center", type: "Community", description: "Music, dancing, and dinner for athletes, families, and volunteers.", es: { title: "Baile navideño de atletas", description: "Música, baile y cena para atletas, familias y voluntarios." }, shifts: [{ role: "Setup crew", time: "4:00 – 6:00 PM", needed: 8, filled: 5, es: { role: "Equipo de montaje" } }, { role: "Dance buddies", time: "6:00 – 9:00 PM", needed: 15, filled: 6, es: { role: "Compañeros de baile" } }, { role: "Cleanup", time: "9:00 – 10:00 PM", needed: 6, filled: 2, es: { role: "Limpieza" } }] },
  { slug: "winter-games", title: "State Winter Games", date: "2027-01-23", endDate: "2027-01-24", time: "All day", location: "Marietta, GA", sport: "Basketball · Bowling", type: "Competition", description: "Statewide competition for basketball and bowling athletes.", es: { title: "Juegos Estatales de Invierno", description: "Competencia estatal para atletas de baloncesto y boliche." }, shifts: [{ role: "Chaperone (overnight)", time: "Fri 2 PM – Sun 6 PM", needed: 6, filled: 2, es: { role: "Acompañante (con pernocta)" } }] },
  { slug: "polar-plunge", title: "Polar Plunge", date: "2027-02-06", time: "9:00 AM", location: "Lake Lanier Olympic Park", address: "3105 Clarks Bridge Rd, Gainesville, GA 30506", type: "Fundraiser", description: "Freezin' for a reason. Take the plunge into Lake Lanier to support our athletes.", registerHref: "/fundraisers/plunge", es: { title: "Zambullida Polar", description: "Congelados por una causa. Lánzate al lago Lanier para apoyar a nuestros atletas." }, shifts: [{ role: "Towel & warming tent", time: "8:00 – 11:00 AM", needed: 6, filled: 1, es: { role: "Toallas y carpa de calor" } }, { role: "Safety spotter (lifeguard cert.)", time: "8:30 – 10:30 AM", needed: 4, filled: 3, es: { role: "Vigilante de seguridad (certificado)" } }] },
];

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

export const campaign = {
  active: true,
  name: "2026–27 Season Fund", // PLACEHOLDER
  nameEs: "Fondo de la temporada 2026–27",
  goal: 25000,
  raised: 14350,
  deadline: "2027-06-30",
  blurb: "Covers uniforms, equipment, and travel for every athlete this season.",
  blurbEs: "Cubre uniformes, equipo y viajes de cada atleta esta temporada.",
};

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

// PLACEHOLDER sponsors. Add a logo path (e.g. /images/sponsors/x.png) to show a logo instead of text.
export const sponsors: Sponsor[] = [
  { name: "Northeast Georgia Health System", tier: "Gold", url: "https://www.nghs.com/" },
  { name: "Publix", tier: "Gold" },
  { name: "Hall County Schools", tier: "Silver" },
  { name: "Chattahoochee Golf Club", tier: "Silver" },
  { name: "Lanier Technical College", tier: "Bronze" },
  { name: "Gainesville Rotary", tier: "Bronze" },
  { name: "Stars and Strikes", tier: "Partner" },
  { name: "Hall County Sheriff's Office", tier: "Partner" },
];

export const sponsorTiers: { name: SponsorTier; amount: string; perks: string[]; es: { perks: string[] } }[] = [
  { name: "Bronze", amount: "$500", perks: ["Logo on event banner", "Social media thank-you", "Listing on this website"], es: { perks: ["Logo en la pancarta del evento", "Agradecimiento en redes sociales", "Mención en este sitio web"] } },
  { name: "Silver", amount: "$1,000", perks: ["Everything in Bronze", "Logo on team shirts", "Logo on sponsor wall"], es: { perks: ["Todo lo de Bronce", "Logo en las camisetas del equipo", "Logo en el muro de patrocinadores"] } },
  { name: "Gold", amount: "$2,500", perks: ["Everything in Silver", "Golf tournament foursome", "Named sponsor of a season", "Logo on the homepage"], es: { perks: ["Todo lo de Plata", "Cuarteto en el torneo de golf", "Patrocinador oficial de una temporada", "Logo en la página principal"] } },
];

/* ------------------------------------------------------------------ */
/* Stories, news, athlete of the month, results                        */
/* ------------------------------------------------------------------ */

export type Story = { name: string; role: string; sport: string; quote: string; image: string; video?: string; es?: { role: string; quote: string } };

// PLACEHOLDER athlete and volunteer stories. `video` is a YouTube video ID.
export const stories: Story[] = [
  { name: "Willie", role: "Athlete", sport: "Powerlifting · Athletics", quote: "When I lift, everybody in the gym is cheering for me. I used to be shy. Now I'm the one cheering for everyone else.", image: "/images/powerlifting.jpg", video: "dQw4w9WgXcQ", es: { role: "Atleta", quote: "Cuando levanto, todo el gimnasio me anima. Antes era tímido. Ahora soy yo el que anima a los demás." } },
  { name: "Rachael", role: "Unified Partner", sport: "Flag Football · Bowling", quote: "I came to volunteer one Saturday and never left. These athletes are my teammates, and honestly, my best friends.", image: "/images/unified-partner-award.jpg", es: { role: "Compañera unificada", quote: "Vine a ser voluntaria un sábado y nunca me fui. Estos atletas son mis compañeros de equipo y, sinceramente, mis mejores amigos." } },
  { name: "The King Family", role: "Athlete Family", sport: "Basketball", quote: "Janessa found her people here. Game days are the highlight of our week, and she's never missed a practice.", image: "/images/basketball-team.jpg", es: { role: "Familia de atleta", quote: "Janessa encontró a su gente aquí. Los días de partido son lo mejor de nuestra semana y nunca ha faltado a un entrenamiento." } },
];

export type Post = { slug: string; title: string; date: string; excerpt: string; image: string; body: string[]; video?: string; es?: { title: string; excerpt: string; body: string[] } };

export const posts: Post[] = [
  {
    slug: "thank-you-healthcare-heroes",
    title: "100 Lunches for Our Healthcare Heroes",
    date: "2020-05-01",
    excerpt: "Our athletes delivered about 100 lunches to the staff at Northeast Georgia Medical Center as a token of our love for them.",
    image: "/images/lunch-delivery.jpg",
    body: [
      "Our athletes and families wanted to say thank you to the people who have been taking care of our community. So we packed up roughly 100 lunches and delivered them to the staff at Northeast Georgia Medical Center.",
      "Every bag carried a hand-made card from one of our athletes. It was a small token of our love for the healthcare workers who show up every single day.",
    ],
    es: { title: "100 almuerzos para nuestros héroes de la salud", excerpt: "Nuestros atletas entregaron unos 100 almuerzos al personal del Northeast Georgia Medical Center como muestra de cariño.", body: ["Nuestros atletas y familias querían agradecer a quienes cuidan de nuestra comunidad. Así que preparamos unos 100 almuerzos y los entregamos al personal del Northeast Georgia Medical Center.", "Cada bolsa llevaba una tarjeta hecha a mano por uno de nuestros atletas. Fue una pequeña muestra de cariño para el personal de salud que se presenta cada día."] },
  },
  // PLACEHOLDER posts below
  {
    slug: "flag-football-season-recap",
    title: "Flag Football Team Brings Home Gold",
    date: "2025-10-20",
    excerpt: "Our unified flag football team finished the State Fall Games undefeated. Here's how the weekend went.",
    image: "/images/flag-football.jpg",
    video: "dQw4w9WgXcQ",
    body: [
      "What a weekend. Our unified flag football team went undefeated at the State Fall Games and came home with gold medals around their necks.",
      "Thank you to every coach, partner, parent, and volunteer who made the trip. This is what Hall County looks like when we work together toward the same goal.",
    ],
    es: { title: "El equipo de fútbol bandera trae el oro a casa", excerpt: "Nuestro equipo unificado terminó invicto los Juegos Estatales de Otoño. Así fue el fin de semana.", body: ["Qué fin de semana. Nuestro equipo unificado de fútbol bandera terminó invicto en los Juegos Estatales de Otoño y volvió a casa con medallas de oro.", "Gracias a cada entrenador, compañero, padre y voluntario que hizo el viaje. Así se ve Hall County cuando trabajamos juntos hacia la misma meta."] },
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
    es: { title: "Rachael nombrada Compañera Unificada Destacada", excerpt: "Special Olympics Georgia reconoció a una de las nuestras con el premio a la Compañera Unificada Destacada.", body: ["No podríamos estar más orgullosos. Rachael ha pasado años en la cancha, el campo y las pistas junto a nuestros atletas, y Special Olympics Georgia lo notó.", "Los compañeros unificados compiten codo a codo con nuestros atletas. Son el corazón de lo que hace que nuestro programa se sienta como una familia."] },
  },
];

export type AthleteOfMonth = { month: string; name: string; sport: string; image: string; story: string; es?: { story: string } };

// PLACEHOLDER athlete of the month archive (most recent first)
export const athleteOfMonth: AthleteOfMonth[] = [
  { month: "2026-10", name: "Willie", sport: "Powerlifting · Athletics", image: "/images/powerlifting.jpg", story: "Willie set a personal record in the deadlift at regionals and then spent the rest of the day spotting for his teammates. That's who he is.", es: { story: "Willie logró un récord personal en peso muerto en el regional y pasó el resto del día ayudando a sus compañeros. Así es él." } },
  { month: "2026-09", name: "Janessa", sport: "Basketball · Bowling", image: "/images/basketball-team.jpg", story: "Our Athlete Representative hasn't missed a practice in three years and welcomed four new athletes this month.", es: { story: "Nuestra representante de atletas no ha faltado a un entrenamiento en tres años y recibió a cuatro nuevos atletas este mes." } },
  { month: "2026-08", name: "Tyler", sport: "Flag Football", image: "/images/flag-football.jpg", story: "Tyler threw three touchdowns in his first game as a starting quarterback.", es: { story: "Tyler lanzó tres touchdowns en su primer partido como mariscal titular." } },
];

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

// PLACEHOLDER results (most recent first)
export const results: Result[] = [
  { slug: "fall-games-2025", competition: "State Fall Games", date: "2025-10-19", location: "Valdosta, GA", medals: { gold: 6, silver: 3, bronze: 4, ribbons: 5 }, recap: "flag-football-season-recap", es: { competition: "Juegos Estatales de Otoño" }, highlights: [{ athlete: "Unified Flag Football", sport: "Flag Football", event: "Division 2", place: 1 }, { athlete: "Softball", sport: "Softball", event: "Division 3", place: 2 }, { athlete: "Chris B.", sport: "Softball", event: "Individual skills", place: 1 }, { athlete: "Willie M.", sport: "Flag Football", event: "MVP", place: 1 }] },
  { slug: "summer-games-2025", competition: "State Summer Games", date: "2025-05-18", location: "Emory University, Atlanta", medals: { gold: 9, silver: 7, bronze: 5, ribbons: 8 }, es: { competition: "Juegos Estatales de Verano" }, highlights: [{ athlete: "Willie M.", sport: "Athletics", event: "100m dash", place: 1 }, { athlete: "Willie M.", sport: "Athletics", event: "Shot put", place: 1 }, { athlete: "Sam P.", sport: "Bocce", event: "Singles", place: 3 }, { athlete: "Maria G.", sport: "Swimming", event: "25m freestyle", place: 2 }] },
  { slug: "winter-games-2025", competition: "State Winter Games", date: "2025-01-26", location: "Marietta, GA", medals: { gold: 4, silver: 5, bronze: 2, ribbons: 6 }, es: { competition: "Juegos Estatales de Invierno" }, highlights: [{ athlete: "Basketball", sport: "Basketball", event: "Division 4", place: 1 }, { athlete: "Janessa K.", sport: "Bowling", event: "Singles", place: 2 }, { athlete: "Alex D.", sport: "Bowling", event: "Singles", place: 3 }] },
];

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
