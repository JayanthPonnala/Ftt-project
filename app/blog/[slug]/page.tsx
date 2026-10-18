import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/db";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 60; // ISR cache for fast TTFB

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Forex Trader Telugu",
      robots: { index: false, follow: false },
    };
  }

  const postUrl = `https://forextradertelugu.com/blog/${post.slug}`;
  const ogImageUrl = "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg";

  return {
    title: `${post.title} | Forex Trader Telugu`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: ["Chaitanya (Forex Trader Telugu)"],
      url: postUrl,
      siteName: "Forex Trader Telugu (FTT)",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@forex_telugu",
      site: "@forex_telugu",
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || (!post.published && process.env.NODE_ENV === "production")) {
    notFound();
  }

  const postUrl = `https://forextradertelugu.com/blog/${post.slug}`;
  const ogImageUrl = "https://res.cloudinary.com/dtqtgdqzq/image/upload/v1791866901/FTT_Logo.jpg";

  // Google Rich Snippet JSON-LD Schemas (BlogPosting + BreadcrumbList)
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: [ogImageUrl],
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Person",
      name: "Chaitanya",
      url: "https://forextradertelugu.com",
      jobTitle: "Founder & Lead Trading Mentor",
    },
    publisher: {
      "@type": "Organization",
      name: "Forex Trader Telugu",
      url: "https://forextradertelugu.com",
      logo: {
        "@type": "ImageObject",
        url: ogImageUrl,
      },
    },
    inLanguage: ["te", "en"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
