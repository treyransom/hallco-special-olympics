import type { Metadata } from "next";
import ResultsClient from "./ResultsClient";

export const metadata: Metadata = { title: "Results", description: "Medal counts and highlights from every State Games for Special Olympics Hall County." };

export default function ResultsPage() {
  return <ResultsClient />;
}
