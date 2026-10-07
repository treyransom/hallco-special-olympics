import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/data";

const barlow = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.specialolympicshallcounty.org"),
  title: {
    default: `${site.name} | Year-Round Sports for Athletes of Every Ability`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline} Join us in Hall County, Georgia as an athlete, volunteer, coach, or donor.`,
  keywords: ["Special Olympics", "Hall County", "Gainesville GA", "intellectual disabilities", "volunteer", "donate", "unified sports"],
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/flag-football.jpg", width: 1800, height: 1350 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable} h-full`}>
      <head>
        <meta name="theme-color" content="#00958f" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
