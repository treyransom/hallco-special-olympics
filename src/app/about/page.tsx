import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = { title: "About", description: "Learn about Special Olympics Hall County, our mission, our history, and the volunteer leadership team behind the program." };

export default function AboutPage() {
  return <AboutClient />;
}
