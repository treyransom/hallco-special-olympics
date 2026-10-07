import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = { title: "Register an Athlete", description: "Free online registration for new Special Olympics Hall County athletes. Takes about five minutes." };

export default function RegisterPage() {
  return <RegisterClient />;
}
