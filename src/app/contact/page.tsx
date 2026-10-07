import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Special Olympics Hall County. Questions about registration, volunteering, or sponsorship are always welcome." };

export default function ContactPage() {
  return <ContactClient />;
}
