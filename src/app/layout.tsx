import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import BackToTop from "@/components/layout/BackToTop";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import StructuredData from "@/components/layout/StructuredData";
import SkipLink from "@/components/layout/SkipLink";
import AlertBanner from "@/components/layout/AlertBanner";
import RouteProgress from "@/components/layout/RouteProgress";
import SWRegister from "@/components/layout/SWRegister";
import { site } from "@/lib/data";

const barlow = Barlow_Condensed({ variable: "--font-barlow-condensed", subsets: ["latin"], weight: ["500", "600", "700", "800"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Year-Round Sports for Athletes of Every Ability`, template: `%s | ${site.name}` },
  description: `${site.tagline} Join us in Hall County, Georgia as an athlete, volunteer, coach, or donor.`,
  keywords: ["Special Olympics", "Hall County", "Gainesville GA", "intellectual disabilities", "volunteer", "donate", "unified sports"],
  openGraph: { title: site.name, description: site.tagline, type: "website", locale: "en_US", images: [{ url: "/images/flag-football.jpg", width: 1800, height: 1350 }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable} h-full`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#00958f" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("sohc-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}` }} />
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <I18nProvider>
          <SkipLink />
          <RouteProgress />
          <AlertBanner />
          <AnnouncementBar />
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <AccessibilityWidget />
          <SWRegister />
        </I18nProvider>
      </body>
    </html>
  );
}
