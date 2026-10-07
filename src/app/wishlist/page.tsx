import type { Metadata } from "next";
import WishlistClient from "./WishlistClient";
export const metadata: Metadata = { title: "Wish List", description: "Specific equipment Special Olympics Hall County needs, with prices. Claim an item." };
export default function WishlistPage() { return <WishlistClient />; }
