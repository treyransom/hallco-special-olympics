import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FAQList from "./FAQList";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about joining, volunteering, costs, and competitions with Special Olympics Hall County.",
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title="Good questions." image="/images/coaches.jpg" description="Everything families, volunteers, and donors ask us most. Don't see yours? Just reach out." />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_20rem]">
          <FAQList />
          <Reveal delay={0.1} className="h-fit rounded-3xl bg-teal-deep p-8 text-white lg:sticky lg:top-28">
            <h2 className="text-3xl font-extrabold uppercase">Still wondering?</h2>
            <p className="mt-2 text-white/80">Our coordinators answer every email personally. Ask us anything.</p>
            <Button href="/contact" variant="white" className="mt-6 w-full">Contact us</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
