import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";
import { getPublishedPosts } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Trading Insights & Prop Firm Payout Journals | Forex Trader Telugu",
  description:
    "Read in-depth market analyses, prop firm payout breakdowns, and trading psychology journals by Chaitanya (Forex Trader Telugu).",
  openGraph: {
    title: "Forex Trader Telugu Blog & Market Journals",
    description:
      "Actionable market breakdowns, prop firm payouts, and trading psychology for Telugu traders.",
    type: "website",
    url: "https://forextradertelugu.com/blog",
  },
};

export default async function BlogPage() {
  const initialPosts = await getPublishedPosts();

  return <BlogIndexClient initialPosts={initialPosts} />;
}
