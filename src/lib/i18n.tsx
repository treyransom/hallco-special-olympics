"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Lang } from "./data";

/* ------------------------------------------------------------------ */
/* Dictionaries. Keys are dot paths. Keep en and es in sync.           */
/* ------------------------------------------------------------------ */

const en = {
  nav: {
    about: "About", ourStory: "Our story", ourStoryD: "Mission, values, and the athlete oath", leadership: "Leadership", leadershipD: "The volunteers who run the program", teams: "Teams & coaches", teamsD: "Rosters, coaches, and practice times", aom: "Athlete of the Month", aomD: "Who we're celebrating", results: "Results", resultsD: "Medal counts from State Games", news: "News", newsD: "Recaps and announcements", gallery: "Photo gallery", galleryD: "Our athletes in action", faq: "FAQ", faqD: "Eligibility, cost, and how to join",
    sports: "Sports",
    events: "Events", calendar: "Event calendar", calendarD: "Competitions, practices, and fundraisers", guide: "Competition guide", guideD: "What to pack and what to expect", volunteerShifts: "Volunteer shifts", volunteerShiftsD: "Open roles at upcoming events", fundraiserEvents: "Fundraiser events", fundraiserEventsD: "Golf, Polar Plunge, and more",
    getInvolved: "Get Involved", register: "Register an athlete", registerD: "Free for anyone 8+ with an intellectual disability", volunteer: "Volunteer or coach", volunteerD: "Day-of help or a full season", unified: "Unified partners", unifiedD: "Play on the same team", families: "Families", familiesD: "What to expect as a parent or caregiver", resources: "Forms & resources", resourcesD: "Registration, medical, and training links",
    support: "Support", donate: "Donate", donateD: "Every dollar stays in Hall County", sponsor: "Sponsor", sponsorD: "Packages for local businesses", sponsorAthlete: "Sponsor an athlete", sponsorAthleteD: "Fund one athlete's season", fundraisers: "Fundraisers", fundraisersD: "Events you'll actually want to attend", shop: "Shop", shopD: "Team gear and merch",
    contact: "Contact", search: "Search", openMenu: "Open menu", closeMenu: "Close menu", skip: "Skip to content", lang: "Español", langLabel: "Switch to Spanish",
  },
  common: {
    learnMore: "Learn more", readMore: "Read more", viewAll: "View all", register: "Register", signUp: "Sign up", contactUs: "Contact us", backHome: "Back home", allNews: "All news", getInvolved: "Get involved", supportAthletes: "Support our athletes", donateToday: "Donate today", sponsorEvent: "Sponsor an event", seeAll: "See all", directions: "Directions", addToCalendar: "Add to calendar", printFlyer: "Print flyer", volunteer: "Volunteer", details: "Details", close: "Close", previous: "Previous", next: "Next", print: "Print", tba: "TBA", free: "Free", coach: "Coach", headCoach: "Head Coach", since: "Since", more: "more", send: "Send", back: "Back", continue: "Continue", submit: "Submit", required: "Required", optional: "Optional", yes: "Yes", no: "No", email: "Email", phone: "Phone", name: "Name",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    seasons: { Winter: "Winter", Spring: "Spring", Summer: "Summer", Fall: "Fall" },
    types: { Competition: "Competition", Practice: "Practice", Fundraiser: "Fundraiser", Community: "Community" },
    tiers: { Gold: "Gold", Silver: "Silver", Bronze: "Bronze", Partner: "Partner" },
    places: ["", "Gold", "Silver", "Bronze", "4th"],
  },
  hero: {
    badge: "Hall County, Georgia", l1: "Let me win.", l2: "But if I cannot win,", l3: "let me be brave", l4: "in the attempt.",
    sub: "Year-round sports training and competition for children and adults with intellectual disabilities. Seven sports, one family, zero cost to our athletes.",
    cta1: "Get Involved", cta2: "Support an Athlete", scroll: "Scroll down",
  },
  mission: {
    eyebrow: "What we're about", title: "Dedicated to changing perceptions.",
    text: "We strive to empower everyone we work with, but it is more than that. We want to change perceptions by showing that everyone can excel at something when we work together towards the same goals.",
    story: "Our Story", explore: "Explore Sports", zero: "$0", zeroLabel: "cost to athletes, ever", medalsAlt: "Athlete celebrating with two gold medals", liftAlt: "Athlete celebrating a lift",
  },
  thisWeek: { eyebrow: "This week", title: "On the schedule.", none: "No practices or events this week. Enjoy the break.", practice: "Practice", fullSchedule: "Full schedule", today: "Today", tomorrow: "Tomorrow" },
  countdown: { eyebrow: "Next competition", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds", guide: "Competition guide", live: "It's game day!", soon: "Coming up" },
  sports: {
    eyebrow: "Seven sports, all year", title: "Find your sport.", text: "Every season brings a new way to train, compete, and belong. All programs are free for athletes.", schedule: "Season schedule", newAthletes: "New athletes", ready: "Ready to play? Join the team.", regInfo: "Registration info",
    pageEyebrow: "Our sports", pageTitle: "Seven sports. Four seasons. One team.", pageText: "Practices are run by trained volunteer coaches and lead up to area and state competitions with Special Olympics Georgia.",
    season: "season", window: "Practice window", location: "Practice location", join: "Join this sport", coachIt: "Coach this sport", meetTeam: "Meet the team", practices: "Weekly practices", noPractices: "Practice schedule coming soon.",
    missingEyebrow: "Don't see your sport?", missingTitle: "Tell us what you'd like to play.", missingText: "We add sports when there are enough interested athletes and a coach willing to lead. Let us know.",
  },
  involved: {
    eyebrow: "Get involved", title: "There's a place for you here.", text: "Athletes, families, coaches, partners, and fans. It takes all of us.",
    a1: "Become an athlete", a1t: "Anyone age 8 and up with an intellectual disability can compete. No experience needed, no cost ever.",
    a2: "Volunteer or coach", a2t: "Keep score, run a water station, or lead a team for a season. We'll train you and you'll leave with a bigger family.",
    a3: "Be a unified partner", a3t: "Play on the same team as our athletes in flag football, bowling, and more. Inclusion happens on the field.",
    pageEyebrow: "Get involved", pageTitle: "There's a spot for you on this team.", pageText: "Whether you want to compete, coach, cheer, or give, here's how to start.",
    athletesE: "Athletes", athletesT: "Join as an athlete", athletesX: "Anyone age 8 or older with an intellectual disability is eligible. There is no cost, no experience required, and no tryouts to make the team.",
    athletesS1: "Register online right here. It takes about five minutes.", athletesS2: "Have a physician sign the medical form. We can help you find a free screening.", athletesS3: "We'll email you practice details and match you to a sport.", athletesCta: "Register online",
    volE: "Volunteers & coaches", volT: "Volunteer or coach", volX: "Day-of-event volunteers help with scoring, awards, water, and cheering. Coaches commit to one season and get free Special Olympics certification.",
    volS1: "Fill out the Class A volunteer form and complete a quick background check (required for coaches).", volS2: "Finish the free online Protective Behaviors and Concussion courses.", volS3: "Pick a shift or a sport and show up. We'll take it from there.", volCta: "See open shifts",
    uniE: "Unified partners", uniT: "Become a unified partner", uniX: "Unified Sports puts athletes with and without intellectual disabilities on the same team. Partners of similar age and ability train and compete together.",
    uniS1: "Register as a volunteer (same form as above).", uniS2: "Join a unified team in flag football, bowling, bocce, or softball.", uniS3: "Compete at area and state games alongside your teammates.", uniCta: "Ask about unified teams",
    famE: "Families", famT: "Parents and caregivers, we've got you.", famX: "You know your athlete best. We'll keep you in the loop on practices, travel, and what to pack, and we'll never ask you to pay a dime.",
    fam1: "Practice and competition schedules sent by email and Facebook", fam2: "Chaperoned travel and lodging for State Games", fam3: "Family representative on the leadership team", fam4: "Social events like the holiday dance and end-of-season banquet", famCta: "Read the competition guide",
  },
  events: {
    eyebrow: "Mark your calendar", title: "Upcoming events.", full: "Full calendar",
    pageEyebrow: "Event calendar", pageTitle: "What's coming up.", pageText: "Competitions, practices, fundraisers, and the moments in between. Families and fans are always welcome.",
    all: "All", none: "No events in this category yet. Check back soon.", never: "Never miss a game", neverText: "Follow us on Facebook for practice reminders, weather updates, and photos from every event.", follow: "Follow on Facebook", ask: "Ask a question",
    subscribe: "Subscribe to our calendar", subscribeText: "Every practice, competition, and fundraiser in your phone's calendar. Updates automatically.", subscribeApple: "Apple / Outlook", subscribeGoogle: "Google Calendar", subscribeHow: "In Google Calendar, choose “Other calendars → From URL” and paste:", copied: "Copied!", copy: "Copy link",
    volunteersNeeded: "volunteers needed", shiftsOpen: "open shifts", registerNow: "Register now",
  },
  stories: { eyebrow: "More than a game", title: "Stories that move.", tag: "#HallCountyStrong", watch: "Watch the story", prev: "Previous story", next: "Next story" },
  map: { eyebrow: "Where we practice", title: "Around Hall County.", text: "Practices happen at gyms, pools, fields, and lanes across Gainesville and Hall County. Pick a venue to see it on the map.", mapOf: "Map of" },
  support: {
    eyebrow: "Signature fundraisers", title: "Show up, have fun, fund a season.", text: "We receive no state or national funding. Every uniform, every bus, and every entry fee comes from events like these.", allWays: "All ways to give",
    gift: "Make a gift", giftD: "One-time or monthly", sponsor: "Sponsor the program", sponsorD: "Packages from $500", shop: "Shop team gear", shopD: "Every purchase supports an athlete", shopSoon: "Team gear coming soon", shopSoonD: "Merch store launching soon",
  },
  campaign: { raised: "raised", of: "of", goal: "goal", left: "to go", give: "Give to the season fund", ends: "Campaign ends" },
  sponsorAthlete: { eyebrow: "Sponsor an athlete", title: "Put a name on your gift.", text: "$250 covers one athlete's entire season: uniform, equipment, registration, and the trip to State Games. Pick an athlete and we'll send you their updates all season.", funded: "Funded", sponsorFor: "Sponsor for", needs: "Needs", thanks: "Thank you to this athlete's sponsor!" },
  news: { eyebrow: "News & updates", title: "From the sidelines.", pageText: "Recaps, announcements, and stories from our athletes and volunteers.", follow: "Follow along on Facebook", followText: "Day-to-day photos and practice updates live on our Facebook page.", followBtn: "Open Facebook" },
  aom: { eyebrow: "Athlete of the Month", title: "This month we're celebrating", archive: "Past honorees", pageText: "Every month our coaches pick one athlete who shows what Hall County is about: effort, heart, and showing up for teammates.", nominate: "Nominate an athlete" },
  results: { eyebrow: "Results", title: "Medal board.", pageText: "How Hall County did at every State Games competition.", latest: "Latest results", gold: "Gold", silver: "Silver", bronze: "Bronze", ribbons: "Ribbons", highlights: "Highlights", allTime: "All-time totals", readRecap: "Read the recap", athlete: "Athlete / team", event: "Event", place: "Place" },
  sponsorsWall: { eyebrow: "Thank you", title: "Our sponsors.", text: "These local businesses and organizations fund every season.", want: "Want your business here?", become: "Become a sponsor", onePager: "Download sponsorship one-pager" },
  newsletter: { eyebrow: "Stay in the loop", title: "Season updates, straight to your inbox.", text: "Registration windows, practice changes, competition results, and volunteer needs. One or two emails a month, never more.", placeholder: "you@example.com", subscribe: "Subscribe", thanks: "Thanks! Your email app should be open.", footer: "Newsletter", footerText: "Season updates, once or twice a month." },
  cta: { eyebrow: "Every dollar stays local", title: "Your gift pays for uniforms, travel, and the chance to compete.", text: "Our athletes never pay to participate. That is only possible because of neighbors like you." },
  footer: { quick: "Quick Links", sports: "Our Sports", contact: "Contact", accredited: "An accredited local program of", rights: "All rights reserved.", kennedy: "Created by the Joseph P. Kennedy Jr. Foundation for the benefit of persons with intellectual disabilities.", about: "About Us", calendar: "Event Calendar", register: "Register an Athlete", volunteer: "Volunteer", resources: "Forms & Resources", faq: "FAQ", gallery: "Photo Gallery", news: "News & Updates", results: "Results", donate: "Donate" },
  about: {
    eyebrow: "About us", title: "Changing perceptions, one game at a time.", text: "Special Olympics Hall County is a volunteer-led local program of Special Olympics Georgia serving athletes across Hall County.",
    missionE: "Our mission", missionT: "Year-round sports training and competition.", missionX: "We provide year-round sports training and athletic competition in a variety of Olympic-type sports for children and adults with intellectual disabilities. This gives them continuing opportunities to develop physical fitness, demonstrate courage, experience joy, and share gifts, skills, and friendship with their families, other Special Olympics athletes, and the community.", flagsAlt: "Athletes posing in front of Special Olympics flags",
    valuesE: "What we believe", valuesT: "The values behind the program.",
    v1: "Every athlete, every ability", v1t: "Divisioning means athletes compete against others of similar ability. Everyone gets a real shot at the podium.", v2: "Free. Always.", v2t: "Athletes never pay for training, uniforms, registration, or travel. Our community covers it.", v3: "More than sports", v3t: "Confidence, friendships, health, and joy. The medal is just the start.", v4: "Unified", v4t: "Athletes with and without intellectual disabilities train and compete on the same teams.",
    oath: "The athlete oath", oathText: "“Let me win. But if I cannot win, ", oathHl: "let me be brave", oathEnd: " in the attempt.”",
    teamE: "Leadership", teamT: "The volunteers who run it.", teamX: "Every person on this list is an unpaid volunteer. Reach out to any of us with questions.",
    biggerT: "Part of something bigger", biggerX: "We are an accredited local program of Special Olympics Georgia, which serves more than 26,000 athletes across the state.", biggerCta: "Visit Special Olympics Georgia",
  },
  donate: {
    eyebrow: "Donate", title: "Fuel an athlete's season.", text: "Every donation we receive goes directly to helping our athletes with transportation, uniforms, housing, equipment, and registration fees for all our events.",
    pickE: "Give once or monthly", pickT: "Pick an amount.", pickX: "Athletes never pay to participate. Your gift is what makes that possible.", any: "Donate any amount", secure: "Secure online giving. Tax-deductible to the extent allowed by law.",
    where: "Where your money goes", u1: "Transportation & lodging", u2: "Uniforms", u3: "Equipment", u4: "Registration fees", local: "100% of your gift stays in Hall County. Our leadership team is entirely volunteer.", busAlt: "Athletes on the bus to State Games",
    fundE: "Signature events", fundT: "Fundraisers you'll actually want to attend.", fundX: "We receive no state or national funding. These events, plus your gifts, cover every uniform, bus, and entry fee.",
    sponsorE: "Businesses", sponsorT: "Sponsor a season.", sponsorX: "Put your name in front of hundreds of Hall County families while funding something that matters. Custom packages available.", become: "Become a", sponsorWord: "sponsor",
    honorT: "Give in honor or memory", honorX: "Giving in someone’s honor? Add their name on the second line of your billing address at checkout, or email us the details and we’ll send an acknowledgment.",
    checkT: "Mail a check", checkX: "Make checks payable to", checkTo: "and mail to:",
  },
  contact: { eyebrow: "Contact", title: "Say hello.", text: "Questions about registration, volunteering, sponsorship, or anything else. We'd love to hear from you.", reach: "Reach us", who: "Who to ask", onFb: "Special Olympics Hall County on Facebook", formT: "Send a message", formX: "This opens your email app with everything filled in. We usually reply within a couple of days.", name: "Name", namePh: "Your name", email: "Email", topic: "I’m asking about", message: "Message", messagePh: "How can we help?", send: "Send message", sent: "Your email app should be open. Thanks for reaching out!", topics: ["Athlete registration", "Volunteering / coaching", "Sponsorship", "Donations", "Something else"] },
  faq: { eyebrow: "FAQ", title: "Good questions.", text: "Everything families, volunteers, and donors ask us most. Don't see yours? Just reach out.", stillT: "Still wondering?", stillX: "Our coordinators answer every email personally. Ask us anything." },
  resources: { eyebrow: "Forms & resources", title: "Everything you need to get started.", text: "Registration forms, training links, and checklists in one place. Completed forms go to our Local Coordinator.", where: "Where to send forms", emailTo: "Email completed forms to", coordinator: "Local Coordinator", groups: { Athletes: "Athletes", "Volunteers & Coaches": "Volunteers & Coaches", Families: "Families", Policies: "Policies" } },
  gallery: { eyebrow: "Gallery", title: "Our athletes in action.", text: "Game days, State Games trips, fundraisers, and the moments in between.", filter: "Filter photos" },
  register: {
    eyebrow: "Athlete registration", title: "Join the team.", text: "About five minutes. There is no cost. We'll follow up by email within a few days with practice details and the medical form.",
    step: "Step", of: "of", s1: "Athlete", s2: "Sports", s3: "Details", s4: "Review",
    athleteFirst: "Athlete first name", athleteLast: "Athlete last name", dob: "Date of birth", gender: "Gender", genderOpts: ["Female", "Male", "Prefer not to say"], guardian: "Parent / guardian name", guardianHint: "Leave blank if the athlete is their own guardian.", email: "Email", phone: "Phone", language: "Preferred language", languages: ["English", "Spanish"],
    pickSports: "Which sports is the athlete interested in?", pickHint: "Pick as many as you like. Seasons are staggered so they rarely overlap.", experience: "Has the athlete competed in Special Olympics before?", expOpts: ["No, brand new", "Yes, in another county or state", "Yes, with Hall County"],
    medical: "Medical form", medicalOpts: ["I already have a signed medical form", "I need the medical form", "I need help finding a free physical"], shirt: "T-shirt size", shirtOpts: ["Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL", "Adult 2XL", "Adult 3XL"], emergency: "Emergency contact name", emergencyPhone: "Emergency contact phone", notes: "Anything we should know?", notesHint: "Allergies, mobility needs, communication preferences, or anything that helps our coaches.",
    reviewT: "Review and send", reviewX: "This opens your email app with the registration filled in. Just hit send. We never see your information until you do.", sendBtn: "Send registration", sentT: "Your email app should be open.", sentX: "If it didn't open, email us directly and we'll take it from there. Next: our Local Coordinator will reply with practice details and the medical form.",
    draft: "We saved your progress on this device.", clear: "Start over", fixErrors: "Please fill in the highlighted fields.",
  },
  teams: { eyebrow: "Teams", title: "Meet the team.", pageText: "Coaches, rosters, and practice times for every sport.", roster: "Roster", rosterHidden: "Roster is shared with families by email.", coaches: "Coaches", noCoach: "Coach needed", noCoachText: "We're looking for a volunteer to lead this sport. Training and certification are free.", also: "Also plays", athletes: "athletes", viewTeam: "View team", allTeams: "All teams", coachCta: "Coach this team" },
  guide: { eyebrow: "Competition guide", title: "Your first State Games.", text: "Everything a family needs to know before the bus leaves. Pack the list, read what to expect, and ask us anything.", packing: "Packing list", expect: "What to expect", print: "Print this list", checked: "packed", nextT: "Next competition", questions: "Questions? Ask our Family Representative." },
  fundraiser: { eyebrow: "Fundraiser", register: "Register or sponsor", pick: "Pick your options", total: "Total", checkout: "Continue to payment", emailInstead: "Or send us your registration by email", perks: "What's included", soldOut: "Sold out", qty: "Qty", summary: "Your registration", yourName: "Your name", company: "Company (for sponsors)", playerNames: "Player names (if a foursome)", note: "Anything else?", left: "left", remaining: "remaining", eventDetails: "Event details", tableNote: "Reserve by email and we'll hold your table." },
  volunteerPage: { eyebrow: "Volunteer shifts", title: "Pick a shift. Show up. Change a day.", text: "Every event runs on volunteers. Grab an open shift below and our Volunteer Coordinator will confirm by email.", open: "open", filled: "Filled", signup: "Sign up for this shift", form: "Volunteer signup", shift: "Shift", eventLabel: "Event", send: "Send signup", noShifts: "No open shifts right now. Check back soon or email us.", sent: "Your email app should be open with the signup filled in." },
  search: { placeholder: "Search sports, events, FAQ, news…", hint: "Type to search. Press Esc to close.", none: "No results for", results: "results", kbd: "to search", categories: { page: "Page", sport: "Sport", event: "Event", faq: "FAQ", post: "News", resource: "Resource", team: "Team", fundraiser: "Fundraiser" } },
  flyer: { scan: "Scan for details", print: "Print flyer", back: "Back to event", free: "Free to attend", hosted: "Hosted by" },
  a11y: { label: "Accessibility options", title: "Accessibility", text: "Text size", contrast: "High contrast", motion: "Reduce motion", on: "On", off: "Off", reset: "Reset to defaults", close: "Close", top: "Back to top" },
  announcement: { dismiss: "Dismiss announcement" },
  notFound: { title: "Out of bounds.", text: "That page doesn't exist. Let's get you back in the game." },
};

type Dict = typeof en;

const es: Dict = {
  nav: {
    about: "Nosotros", ourStory: "Nuestra historia", ourStoryD: "Misión, valores y el juramento del atleta", leadership: "Liderazgo", leadershipD: "Los voluntarios que dirigen el programa", teams: "Equipos y entrenadores", teamsD: "Plantillas, entrenadores y horarios", aom: "Atleta del mes", aomD: "A quién celebramos", results: "Resultados", resultsD: "Medallero de los Juegos Estatales", news: "Noticias", newsD: "Resúmenes y anuncios", gallery: "Galería de fotos", galleryD: "Nuestros atletas en acción", faq: "Preguntas frecuentes", faqD: "Elegibilidad, costo y cómo unirse",
    sports: "Deportes",
    events: "Eventos", calendar: "Calendario de eventos", calendarD: "Competencias, entrenamientos y recaudaciones", guide: "Guía de competencia", guideD: "Qué empacar y qué esperar", volunteerShifts: "Turnos de voluntarios", volunteerShiftsD: "Roles abiertos en próximos eventos", fundraiserEvents: "Eventos de recaudación", fundraiserEventsD: "Golf, Zambullida Polar y más",
    getInvolved: "Participa", register: "Inscribir a un atleta", registerD: "Gratis para mayores de 8 años con discapacidad intelectual", volunteer: "Voluntario o entrenador", volunteerD: "Ayuda por un día o toda una temporada", unified: "Compañeros unificados", unifiedD: "Juega en el mismo equipo", families: "Familias", familiesD: "Qué esperar como padre o cuidador", resources: "Formularios y recursos", resourcesD: "Inscripción, médico y capacitación",
    support: "Apoya", donate: "Donar", donateD: "Cada dólar se queda en Hall County", sponsor: "Patrocinar", sponsorD: "Paquetes para negocios locales", sponsorAthlete: "Patrocina a un atleta", sponsorAthleteD: "Financia la temporada de un atleta", fundraisers: "Recaudaciones", fundraisersD: "Eventos a los que querrás ir", shop: "Tienda", shopD: "Ropa y artículos del equipo",
    contact: "Contacto", search: "Buscar", openMenu: "Abrir menú", closeMenu: "Cerrar menú", skip: "Ir al contenido", lang: "English", langLabel: "Cambiar a inglés",
  },
  common: {
    learnMore: "Más información", readMore: "Leer más", viewAll: "Ver todo", register: "Inscribirse", signUp: "Anotarse", contactUs: "Contáctanos", backHome: "Volver al inicio", allNews: "Todas las noticias", getInvolved: "Participa", supportAthletes: "Apoya a nuestros atletas", donateToday: "Dona hoy", sponsorEvent: "Patrocina un evento", seeAll: "Ver todos", directions: "Cómo llegar", addToCalendar: "Agregar al calendario", printFlyer: "Imprimir volante", volunteer: "Voluntario", details: "Detalles", close: "Cerrar", previous: "Anterior", next: "Siguiente", print: "Imprimir", tba: "Por confirmar", free: "Gratis", coach: "Entrenador", headCoach: "Entrenador principal", since: "Desde", more: "más", send: "Enviar", back: "Atrás", continue: "Continuar", submit: "Enviar", required: "Obligatorio", optional: "Opcional", yes: "Sí", no: "No", email: "Correo", phone: "Teléfono", name: "Nombre",
    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    seasons: { Winter: "Invierno", Spring: "Primavera", Summer: "Verano", Fall: "Otoño" },
    types: { Competition: "Competencia", Practice: "Entrenamiento", Fundraiser: "Recaudación", Community: "Comunidad" },
    tiers: { Gold: "Oro", Silver: "Plata", Bronze: "Bronce", Partner: "Aliado" },
    places: ["", "Oro", "Plata", "Bronce", "4º"],
  },
  hero: {
    badge: "Hall County, Georgia", l1: "Déjame ganar.", l2: "Pero si no puedo ganar,", l3: "déjame ser valiente", l4: "en el intento.",
    sub: "Entrenamiento deportivo y competencias durante todo el año para niños y adultos con discapacidad intelectual. Siete deportes, una familia, cero costo para nuestros atletas.",
    cta1: "Participa", cta2: "Apoya a un atleta", scroll: "Bajar",
  },
  mission: {
    eyebrow: "Quiénes somos", title: "Dedicados a cambiar percepciones.",
    text: "Nos esforzamos por empoderar a cada persona con la que trabajamos, pero es más que eso. Queremos cambiar percepciones demostrando que todos pueden sobresalir en algo cuando trabajamos juntos hacia las mismas metas.",
    story: "Nuestra historia", explore: "Ver deportes", zero: "$0", zeroLabel: "costo para los atletas, siempre", medalsAlt: "Atleta celebrando con dos medallas de oro", liftAlt: "Atleta celebrando un levantamiento",
  },
  thisWeek: { eyebrow: "Esta semana", title: "En la agenda.", none: "No hay entrenamientos ni eventos esta semana. Disfruta el descanso.", practice: "Entrenamiento", fullSchedule: "Horario completo", today: "Hoy", tomorrow: "Mañana" },
  countdown: { eyebrow: "Próxima competencia", days: "Días", hours: "Horas", minutes: "Minutos", seconds: "Segundos", guide: "Guía de competencia", live: "¡Hoy es día de juego!", soon: "Próximamente" },
  sports: {
    eyebrow: "Siete deportes, todo el año", title: "Encuentra tu deporte.", text: "Cada temporada trae una nueva forma de entrenar, competir y pertenecer. Todos los programas son gratuitos para los atletas.", schedule: "Calendario de temporadas", newAthletes: "Nuevos atletas", ready: "¿Listo para jugar? Únete al equipo.", regInfo: "Información de inscripción",
    pageEyebrow: "Nuestros deportes", pageTitle: "Siete deportes. Cuatro temporadas. Un equipo.", pageText: "Los entrenamientos los dirigen entrenadores voluntarios capacitados y conducen a competencias regionales y estatales con Special Olympics Georgia.",
    season: "temporada", window: "Periodo de entrenamiento", location: "Lugar de entrenamiento", join: "Unirse a este deporte", coachIt: "Entrenar este deporte", meetTeam: "Conoce al equipo", practices: "Entrenamientos semanales", noPractices: "Horario de entrenamientos próximamente.",
    missingEyebrow: "¿No ves tu deporte?", missingTitle: "Dinos qué te gustaría practicar.", missingText: "Agregamos deportes cuando hay suficientes atletas interesados y un entrenador dispuesto a dirigir. Cuéntanos.",
  },
  involved: {
    eyebrow: "Participa", title: "Aquí hay un lugar para ti.", text: "Atletas, familias, entrenadores, compañeros y aficionados. Nos necesitamos todos.",
    a1: "Sé atleta", a1t: "Cualquier persona de 8 años o más con discapacidad intelectual puede competir. Sin experiencia y sin costo, nunca.",
    a2: "Voluntario o entrenador", a2t: "Lleva el marcador, atiende la estación de agua o dirige un equipo por una temporada. Te capacitamos y te irás con una familia más grande.",
    a3: "Sé compañero unificado", a3t: "Juega en el mismo equipo que nuestros atletas en fútbol bandera, boliche y más. La inclusión ocurre en la cancha.",
    pageEyebrow: "Participa", pageTitle: "Hay un lugar para ti en este equipo.", pageText: "Ya sea que quieras competir, entrenar, animar o donar, así puedes empezar.",
    athletesE: "Atletas", athletesT: "Únete como atleta", athletesX: "Cualquier persona de 8 años o más con discapacidad intelectual es elegible. No hay costo, no se requiere experiencia y no hay pruebas para entrar al equipo.",
    athletesS1: "Inscríbete en línea aquí mismo. Toma unos cinco minutos.", athletesS2: "Pide a un médico que firme el formulario médico. Podemos ayudarte a encontrar un examen gratuito.", athletesS3: "Te enviaremos por correo los detalles de los entrenamientos y te asignaremos un deporte.", athletesCta: "Inscribirse en línea",
    volE: "Voluntarios y entrenadores", volT: "Voluntario o entrenador", volX: "Los voluntarios de evento ayudan con marcadores, premios, agua y porras. Los entrenadores se comprometen por una temporada y reciben certificación gratuita de Special Olympics.",
    volS1: "Llena el formulario de voluntario Clase A y completa una verificación de antecedentes rápida (requerida para entrenadores).", volS2: "Termina los cursos gratuitos en línea de Conductas Protectoras y Conmociones.", volS3: "Elige un turno o un deporte y preséntate. Nosotros nos encargamos del resto.", volCta: "Ver turnos abiertos",
    uniE: "Compañeros unificados", uniT: "Sé compañero unificado", uniX: "Los Deportes Unificados reúnen en el mismo equipo a atletas con y sin discapacidad intelectual. Los compañeros de edad y habilidad similar entrenan y compiten juntos.",
    uniS1: "Regístrate como voluntario (el mismo formulario de arriba).", uniS2: "Únete a un equipo unificado de fútbol bandera, boliche, bochas o sóftbol.", uniS3: "Compite en juegos regionales y estatales junto a tus compañeros.", uniCta: "Pregunta por los equipos unificados",
    famE: "Familias", famT: "Padres y cuidadores, contamos con ustedes.", famX: "Tú conoces mejor a tu atleta. Te mantendremos al tanto de entrenamientos, viajes y qué empacar, y nunca te pediremos un centavo.",
    fam1: "Horarios de entrenamientos y competencias por correo y Facebook", fam2: "Viajes con acompañantes y hospedaje para los Juegos Estatales", fam3: "Representante de familias en el equipo de liderazgo", fam4: "Eventos sociales como el baile navideño y el banquete de fin de temporada", famCta: "Lee la guía de competencia",
  },
  events: {
    eyebrow: "Marca tu calendario", title: "Próximos eventos.", full: "Calendario completo",
    pageEyebrow: "Calendario de eventos", pageTitle: "Lo que viene.", pageText: "Competencias, entrenamientos, recaudaciones y los momentos intermedios. Familias y aficionados siempre son bienvenidos.",
    all: "Todos", none: "Aún no hay eventos en esta categoría. Vuelve pronto.", never: "No te pierdas ningún juego", neverText: "Síguenos en Facebook para recordatorios de entrenamientos, avisos de clima y fotos de cada evento.", follow: "Seguir en Facebook", ask: "Hacer una pregunta",
    subscribe: "Suscríbete a nuestro calendario", subscribeText: "Cada entrenamiento, competencia y recaudación en el calendario de tu teléfono. Se actualiza automáticamente.", subscribeApple: "Apple / Outlook", subscribeGoogle: "Google Calendar", subscribeHow: "En Google Calendar, elige “Otros calendarios → Desde URL” y pega:", copied: "¡Copiado!", copy: "Copiar enlace",
    volunteersNeeded: "voluntarios necesarios", shiftsOpen: "turnos abiertos", registerNow: "Inscríbete",
  },
  stories: { eyebrow: "Más que un juego", title: "Historias que conmueven.", tag: "#HallCountyStrong", watch: "Ver la historia", prev: "Historia anterior", next: "Siguiente historia" },
  map: { eyebrow: "Dónde entrenamos", title: "Por todo Hall County.", text: "Los entrenamientos se realizan en gimnasios, piscinas, campos y boliches en Gainesville y Hall County. Elige un lugar para verlo en el mapa.", mapOf: "Mapa de" },
  support: {
    eyebrow: "Recaudaciones principales", title: "Ven, diviértete, financia una temporada.", text: "No recibimos fondos estatales ni nacionales. Cada uniforme, cada autobús y cada cuota de inscripción sale de eventos como estos.", allWays: "Todas las formas de dar",
    gift: "Haz un donativo", giftD: "Una vez o mensual", sponsor: "Patrocina el programa", sponsorD: "Paquetes desde $500", shop: "Compra ropa del equipo", shopD: "Cada compra apoya a un atleta", shopSoon: "Ropa del equipo próximamente", shopSoonD: "Tienda en línea próximamente",
  },
  campaign: { raised: "recaudado", of: "de", goal: "meta", left: "faltan", give: "Dona al fondo de temporada", ends: "La campaña termina" },
  sponsorAthlete: { eyebrow: "Patrocina a un atleta", title: "Ponle nombre a tu donativo.", text: "$250 cubren la temporada completa de un atleta: uniforme, equipo, inscripción y el viaje a los Juegos Estatales. Elige un atleta y te enviaremos sus novedades toda la temporada.", funded: "Financiado", sponsorFor: "Patrocinar por", needs: "Necesita", thanks: "¡Gracias al patrocinador de este atleta!" },
  news: { eyebrow: "Noticias", title: "Desde la banca.", pageText: "Resúmenes, anuncios e historias de nuestros atletas y voluntarios.", follow: "Síguenos en Facebook", followText: "Las fotos del día a día y las novedades de entrenamientos están en nuestra página de Facebook.", followBtn: "Abrir Facebook" },
  aom: { eyebrow: "Atleta del mes", title: "Este mes celebramos a", archive: "Homenajeados anteriores", pageText: "Cada mes nuestros entrenadores eligen a un atleta que muestra lo que es Hall County: esfuerzo, corazón y estar presente para los compañeros.", nominate: "Nomina a un atleta" },
  results: { eyebrow: "Resultados", title: "Medallero.", pageText: "Cómo le fue a Hall County en cada competencia de los Juegos Estatales.", latest: "Últimos resultados", gold: "Oro", silver: "Plata", bronze: "Bronce", ribbons: "Listones", highlights: "Destacados", allTime: "Totales históricos", readRecap: "Leer el resumen", athlete: "Atleta / equipo", event: "Prueba", place: "Lugar" },
  sponsorsWall: { eyebrow: "Gracias", title: "Nuestros patrocinadores.", text: "Estos negocios y organizaciones locales financian cada temporada.", want: "¿Quieres ver tu negocio aquí?", become: "Conviértete en patrocinador", onePager: "Descargar hoja de patrocinio" },
  newsletter: { eyebrow: "Mantente al día", title: "Novedades de la temporada, directo a tu correo.", text: "Periodos de inscripción, cambios de entrenamiento, resultados y necesidades de voluntarios. Uno o dos correos al mes, nunca más.", placeholder: "tu@correo.com", subscribe: "Suscribirse", thanks: "¡Gracias! Tu aplicación de correo debería abrirse.", footer: "Boletín", footerText: "Novedades de la temporada, una o dos veces al mes." },
  cta: { eyebrow: "Cada dólar se queda aquí", title: "Tu donativo paga uniformes, viajes y la oportunidad de competir.", text: "Nuestros atletas nunca pagan por participar. Eso solo es posible gracias a vecinos como tú." },
  footer: { quick: "Enlaces rápidos", sports: "Nuestros deportes", contact: "Contacto", accredited: "Programa local acreditado de", rights: "Todos los derechos reservados.", kennedy: "Creado por la Fundación Joseph P. Kennedy Jr. en beneficio de las personas con discapacidad intelectual.", about: "Nosotros", calendar: "Calendario de eventos", register: "Inscribir a un atleta", volunteer: "Voluntariado", resources: "Formularios y recursos", faq: "Preguntas frecuentes", gallery: "Galería de fotos", news: "Noticias", results: "Resultados", donate: "Donar" },
  about: {
    eyebrow: "Nosotros", title: "Cambiando percepciones, un juego a la vez.", text: "Special Olympics Hall County es un programa local dirigido por voluntarios de Special Olympics Georgia que atiende a atletas de todo Hall County.",
    missionE: "Nuestra misión", missionT: "Entrenamiento deportivo y competencia todo el año.", missionX: "Ofrecemos entrenamiento deportivo y competencias atléticas durante todo el año en diversos deportes de tipo olímpico para niños y adultos con discapacidad intelectual. Esto les da oportunidades continuas de desarrollar su condición física, demostrar valentía, experimentar alegría y compartir dones, habilidades y amistad con sus familias, otros atletas de Special Olympics y la comunidad.", flagsAlt: "Atletas posando frente a banderas de Special Olympics",
    valuesE: "En qué creemos", valuesT: "Los valores detrás del programa.",
    v1: "Cada atleta, cada habilidad", v1t: "Las divisiones hacen que los atletas compitan contra otros de habilidad similar. Todos tienen una oportunidad real de subir al podio.", v2: "Gratis. Siempre.", v2t: "Los atletas nunca pagan por entrenamiento, uniformes, inscripción ni viajes. Nuestra comunidad lo cubre.", v3: "Más que deporte", v3t: "Confianza, amistades, salud y alegría. La medalla es solo el comienzo.", v4: "Unificado", v4t: "Atletas con y sin discapacidad intelectual entrenan y compiten en los mismos equipos.",
    oath: "El juramento del atleta", oathText: "“Déjame ganar. Pero si no puedo ganar, ", oathHl: "déjame ser valiente", oathEnd: " en el intento.”",
    teamE: "Liderazgo", teamT: "Los voluntarios que lo dirigen.", teamX: "Cada persona en esta lista es voluntaria sin paga. Escríbenos con cualquier pregunta.",
    biggerT: "Parte de algo más grande", biggerX: "Somos un programa local acreditado de Special Olympics Georgia, que atiende a más de 26,000 atletas en todo el estado.", biggerCta: "Visita Special Olympics Georgia",
  },
  donate: {
    eyebrow: "Donar", title: "Impulsa la temporada de un atleta.", text: "Cada donativo que recibimos va directamente a ayudar a nuestros atletas con transporte, uniformes, hospedaje, equipo y cuotas de inscripción para todos nuestros eventos.",
    pickE: "Una vez o mensual", pickT: "Elige un monto.", pickX: "Los atletas nunca pagan por participar. Tu donativo lo hace posible.", any: "Donar cualquier monto", secure: "Donación segura en línea. Deducible de impuestos según lo permita la ley.",
    where: "A dónde va tu dinero", u1: "Transporte y hospedaje", u2: "Uniformes", u3: "Equipo", u4: "Cuotas de inscripción", local: "El 100% de tu donativo se queda en Hall County. Nuestro equipo de liderazgo es totalmente voluntario.", busAlt: "Atletas en el autobús a los Juegos Estatales",
    fundE: "Eventos principales", fundT: "Recaudaciones a las que querrás ir.", fundX: "No recibimos fondos estatales ni nacionales. Estos eventos, más tus donativos, cubren cada uniforme, autobús y cuota de inscripción.",
    sponsorE: "Negocios", sponsorT: "Patrocina una temporada.", sponsorX: "Pon tu nombre frente a cientos de familias de Hall County mientras financias algo que importa. Paquetes personalizados disponibles.", become: "Sé patrocinador", sponsorWord: "",
    honorT: "Dona en honor o en memoria", honorX: "¿Donas en honor de alguien? Agrega su nombre en la segunda línea de tu dirección de facturación al pagar, o envíanos los detalles por correo y enviaremos un reconocimiento.",
    checkT: "Envía un cheque", checkX: "Haz el cheque a nombre de", checkTo: "y envíalo a:",
  },
  contact: { eyebrow: "Contacto", title: "Saluda.", text: "Preguntas sobre inscripción, voluntariado, patrocinio o cualquier otra cosa. Nos encantaría saber de ti.", reach: "Contáctanos", who: "A quién preguntar", onFb: "Special Olympics Hall County en Facebook", formT: "Envía un mensaje", formX: "Esto abre tu aplicación de correo con todo listo. Normalmente respondemos en un par de días.", name: "Nombre", namePh: "Tu nombre", email: "Correo", topic: "Mi pregunta es sobre", message: "Mensaje", messagePh: "¿Cómo podemos ayudar?", send: "Enviar mensaje", sent: "Tu aplicación de correo debería abrirse. ¡Gracias por escribir!", topics: ["Inscripción de atletas", "Voluntariado / entrenar", "Patrocinio", "Donativos", "Otro tema"] },
  faq: { eyebrow: "Preguntas frecuentes", title: "Buenas preguntas.", text: "Todo lo que familias, voluntarios y donantes nos preguntan más. ¿No ves la tuya? Escríbenos.", stillT: "¿Todavía tienes dudas?", stillX: "Nuestros coordinadores responden cada correo personalmente. Pregúntanos lo que sea." },
  resources: { eyebrow: "Formularios y recursos", title: "Todo lo que necesitas para empezar.", text: "Formularios de inscripción, enlaces de capacitación y listas en un solo lugar. Los formularios completos van a nuestra coordinadora local.", where: "A dónde enviar formularios", emailTo: "Envía los formularios completos a", coordinator: "Coordinadora local", groups: { Athletes: "Atletas", "Volunteers & Coaches": "Voluntarios y entrenadores", Families: "Familias", Policies: "Políticas" } },
  gallery: { eyebrow: "Galería", title: "Nuestros atletas en acción.", text: "Días de juego, viajes a los Juegos Estatales, recaudaciones y los momentos intermedios.", filter: "Filtrar fotos" },
  register: {
    eyebrow: "Inscripción de atletas", title: "Únete al equipo.", text: "Unos cinco minutos. No tiene costo. Te responderemos por correo en unos días con los detalles de los entrenamientos y el formulario médico.",
    step: "Paso", of: "de", s1: "Atleta", s2: "Deportes", s3: "Detalles", s4: "Revisar",
    athleteFirst: "Nombre del atleta", athleteLast: "Apellido del atleta", dob: "Fecha de nacimiento", gender: "Género", genderOpts: ["Femenino", "Masculino", "Prefiero no decir"], guardian: "Nombre del padre / tutor", guardianHint: "Déjalo en blanco si el atleta es su propio tutor.", email: "Correo", phone: "Teléfono", language: "Idioma preferido", languages: ["Inglés", "Español"],
    pickSports: "¿Qué deportes le interesan al atleta?", pickHint: "Elige todos los que quieras. Las temporadas están escalonadas y rara vez coinciden.", experience: "¿El atleta ha competido antes en Special Olympics?", expOpts: ["No, es nuevo", "Sí, en otro condado o estado", "Sí, con Hall County"],
    medical: "Formulario médico", medicalOpts: ["Ya tengo un formulario médico firmado", "Necesito el formulario médico", "Necesito ayuda para conseguir un examen físico gratuito"], shirt: "Talla de camiseta", shirtOpts: ["Juvenil M", "Juvenil L", "Adulto S", "Adulto M", "Adulto L", "Adulto XL", "Adulto 2XL", "Adulto 3XL"], emergency: "Contacto de emergencia", emergencyPhone: "Teléfono de emergencia", notes: "¿Algo que debamos saber?", notesHint: "Alergias, necesidades de movilidad, preferencias de comunicación o cualquier cosa que ayude a los entrenadores.",
    reviewT: "Revisar y enviar", reviewX: "Esto abre tu aplicación de correo con la inscripción lista. Solo presiona enviar. No vemos tu información hasta que lo hagas.", sendBtn: "Enviar inscripción", sentT: "Tu aplicación de correo debería abrirse.", sentX: "Si no se abrió, escríbenos directamente y nos encargamos. Siguiente paso: nuestra coordinadora local responderá con los detalles de los entrenamientos y el formulario médico.",
    draft: "Guardamos tu progreso en este dispositivo.", clear: "Empezar de nuevo", fixErrors: "Por favor completa los campos marcados.",
  },
  teams: { eyebrow: "Equipos", title: "Conoce al equipo.", pageText: "Entrenadores, plantillas y horarios de entrenamiento de cada deporte.", roster: "Plantilla", rosterHidden: "La plantilla se comparte con las familias por correo.", coaches: "Entrenadores", noCoach: "Se necesita entrenador", noCoachText: "Buscamos un voluntario para dirigir este deporte. La capacitación y la certificación son gratuitas.", also: "También practica", athletes: "atletas", viewTeam: "Ver equipo", allTeams: "Todos los equipos", coachCta: "Entrenar este equipo" },
  guide: { eyebrow: "Guía de competencia", title: "Tus primeros Juegos Estatales.", text: "Todo lo que una familia necesita saber antes de que salga el autobús. Empaca la lista, lee qué esperar y pregúntanos lo que sea.", packing: "Lista para empacar", expect: "Qué esperar", print: "Imprimir esta lista", checked: "empacados", nextT: "Próxima competencia", questions: "¿Preguntas? Escribe a nuestro representante de familias." },
  fundraiser: { eyebrow: "Recaudación", register: "Inscribirse o patrocinar", pick: "Elige tus opciones", total: "Total", checkout: "Continuar al pago", emailInstead: "O envíanos tu inscripción por correo", perks: "Qué incluye", soldOut: "Agotado", qty: "Cant.", summary: "Tu inscripción", yourName: "Tu nombre", company: "Empresa (para patrocinadores)", playerNames: "Nombres de jugadores (si es cuarteto)", note: "¿Algo más?", left: "disponibles", remaining: "restantes", eventDetails: "Detalles del evento", tableNote: "Reserva por correo y guardamos tu mesa." },
  volunteerPage: { eyebrow: "Turnos de voluntarios", title: "Elige un turno. Preséntate. Cambia un día.", text: "Cada evento funciona gracias a voluntarios. Toma un turno abierto y nuestra coordinadora de voluntarios confirmará por correo.", open: "abiertos", filled: "Completo", signup: "Anotarme en este turno", form: "Registro de voluntario", shift: "Turno", eventLabel: "Evento", send: "Enviar registro", noShifts: "No hay turnos abiertos por ahora. Vuelve pronto o escríbenos.", sent: "Tu aplicación de correo debería abrirse con el registro listo." },
  search: { placeholder: "Busca deportes, eventos, preguntas, noticias…", hint: "Escribe para buscar. Presiona Esc para cerrar.", none: "Sin resultados para", results: "resultados", kbd: "para buscar", categories: { page: "Página", sport: "Deporte", event: "Evento", faq: "Pregunta", post: "Noticia", resource: "Recurso", team: "Equipo", fundraiser: "Recaudación" } },
  flyer: { scan: "Escanea para más detalles", print: "Imprimir volante", back: "Volver al evento", free: "Entrada gratuita", hosted: "Organizado por" },
  a11y: { label: "Opciones de accesibilidad", title: "Accesibilidad", text: "Tamaño de texto", contrast: "Alto contraste", motion: "Reducir movimiento", on: "Sí", off: "No", reset: "Restablecer", close: "Cerrar", top: "Volver arriba" },
  announcement: { dismiss: "Cerrar aviso" },
  notFound: { title: "Fuera de límites.", text: "Esa página no existe. Volvamos al juego." },
};

const dicts: Record<Lang, Dict> = { en, es };

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

const KEY = "sohc-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; dict: Dict };
const I18nContext = createContext<Ctx>({ lang: "en", setLang: () => {}, dict: en });

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const readStored = (): Lang => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "es" ? "es" : "en";
  } catch {
    return "en";
  }
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribe, readStored, () => "en" as Lang);
  const [override, setOverride] = useState<Lang | null>(null);
  const lang = override ?? stored;

  const setLang = useCallback((l: Lang) => {
    setOverride(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, dict: dicts[lang] }), [lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLang() {
  return useContext(I18nContext);
}

/** Returns the dictionary for the current language. Usage: const d = useDict(); d.nav.about */
export function useDict() {
  return useContext(I18nContext).dict;
}

export type { Dict };
