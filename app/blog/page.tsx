import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";
import { getPublishedPosts } from "@/lib/db";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

const ogImageUrl = "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg";

export const metadata: Metadata = {
  title: "Trading Insights & Prop Firm Payout Journals | Forex Trader Telugu",
  description:
    "Read in-depth market analyses, verified prop firm payout breakdowns, and mechanical price action trading psychology journals by Chaitanya (Forex Trader Telugu).",
  alternates: {
    canonical: "https://forextradertelugu.com/blog",
  },
  openGraph: {
    title: "Forex Trader Telugu Blog & Market Journals",
    description:
      "Actionable market breakdowns, prop firm payouts, and simple price action trading psychology for Telugu traders.",
    type: "website",
    url: "https://forextradertelugu.com/blog",
    siteName: "Forex Trader Telugu (FTT)",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Forex Trader Telugu - Educational Trading Journals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex Trader Telugu Blog & Market Journals",
    description:
      "Actionable market breakdowns, prop firm payouts, and simple price action trading psychology for Telugu traders.",
    creator: "@forex_telugu",
    site: "@forex_telugu",
    images: [ogImageUrl],
  },
};

export default async function BlogPage() {
  const initialPosts = await getPublishedPosts();

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Forex Trader Telugu Trading Journals & Articles",
    url: "https://forextradertelugu.com/blog",
    description:
      "Educational articles and verified payout case studies by mentor Chaitanya on simple price action, support and resistance, and funded trading.",
    publisher: {
      "@type": "Organization",
      name: "Forex Trader Telugu",
      url: "https://forextradertelugu.com",
      logo: {
        "@type": "ImageObject",
        url: ogImageUrl,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://forextradertelugu.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://forextradertelugu.com/blog",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <BlogIndexClient initialPosts={initialPosts} />
    </>
  );
}
