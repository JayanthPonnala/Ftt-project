import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/db";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://forextradertelugu.com";

  // Core static landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic published blog posts from Supabase database
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.warn("Error generating blog sitemap entries:", err);
  }

  return [...staticRoutes, ...blogRoutes];
}
