import fs from "fs";
import path from "path";
import { BlogPost, SEED_POSTS, estimateReadTime, getSupabaseClient } from "./supabase";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

// -------------------------------------------------------------
// LOCAL FILE SYSTEM BACKUP (Instant Offline Sync & Durability)
// -------------------------------------------------------------
function readFromFile(): BlogPost[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.error("Error reading data/posts.json:", err);
  }

  // Seed file if missing or empty
  writeToFile(SEED_POSTS);
  return [...SEED_POSTS];
}

function writeToFile(posts: BlogPost[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to data/posts.json:", err);
  }
}

function formatPost(post: any): BlogPost {
  return {
    id: post.id || crypto.randomUUID(),
    title: post.title || "",
    slug: post.slug || "",
    excerpt: post.excerpt || "",
    content: post.content || "",
    published: Boolean(post.published),
    created_at: post.created_at || new Date().toISOString(),
    updated_at: post.updated_at || new Date().toISOString(),
    read_time: estimateReadTime(post.content || ""),
  };
}

// -------------------------------------------------------------
// SUPABASE POSTGRESQL DATABASE OPERATIONS
// -------------------------------------------------------------

/**
 * Fetch all published articles for public visitors (ordered by newest first)
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(formatPost);
      }
    } catch (err) {
      console.warn("Supabase fetch published posts failed, using local file backup:", err);
    }
  }

  // Fallback to local file store
  const posts = readFromFile();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(formatPost);
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return formatPost(data);
      }
    } catch (err) {
      console.warn(`Supabase fetch post by slug '${slug}' failed, using local file:`, err);
    }
  }

  const posts = readFromFile();
  const found = posts.find((p) => p.slug === slug);
  return found ? formatPost(found) : null;
}

/**
 * Fetch all posts (both published and drafts) for admin dashboard
 */
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        return data.map(formatPost);
      }
    } catch (err) {
      console.warn("Supabase admin fetch all posts failed, using local file backup:", err);
    }
  }

  const posts = readFromFile();
  return posts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(formatPost);
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return formatPost(data);
      }
    } catch (err) {
      console.warn(`Supabase fetch post by id '${id}' failed:`, err);
    }
  }

  const posts = readFromFile();
  const found = posts.find((p) => p.id === id);
  return found ? formatPost(found) : null;
}

/**
 * Create a new article in Supabase PostgreSQL & local backup
 */
export async function createPost(
  newPost: Omit<BlogPost, "id" | "created_at"> & {
    id?: string;
    created_at?: string;
  }
): Promise<BlogPost> {
  const id = newPost.id || crypto.randomUUID();
  const created_at = newPost.created_at || new Date().toISOString();
  const updated_at = new Date().toISOString();

  const record: BlogPost = {
    ...newPost,
    id,
    created_at,
    updated_at,
    read_time: estimateReadTime(newPost.content || ""),
  };

  // Always save to local backup
  const current = readFromFile();
  current.unshift(record);
  writeToFile(current);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("posts").insert({
        id: record.id,
        title: record.title,
        slug: record.slug,
        excerpt: record.excerpt,
        content: record.content,
        published: record.published,
        created_at: record.created_at,
        updated_at: record.updated_at,
      });
    } catch (err) {
      console.warn("Supabase insert post failed, saved to local file successfully:", err);
    }
  }

  return formatPost(record);
}

/**
 * Update an article in Supabase PostgreSQL & local backup
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<BlogPost, "id">>
): Promise<BlogPost | null> {
  const updated_at = new Date().toISOString();

  const current = readFromFile();
  const index = current.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: BlogPost = {
    ...current[index],
    ...updates,
    updated_at,
    read_time: estimateReadTime(updates.content || current[index].content || ""),
  };
  current[index] = updated;
  writeToFile(current);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from("posts")
        .update({
          ...updates,
          updated_at,
        })
        .eq("id", id);
    } catch (err) {
      console.warn(`Supabase update post '${id}' failed:`, err);
    }
  }

  return formatPost(updated);
}

/**
 * Delete an article in Supabase PostgreSQL & local backup
 */
export async function deletePost(id: string): Promise<boolean> {
  const current = readFromFile();
  const beforeLen = current.length;
  const filtered = current.filter((p) => p.id !== id);
  writeToFile(filtered);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("posts").delete().eq("id", id);
    } catch (err) {
      console.warn(`Supabase delete post '${id}' failed:`, err);
    }
  }

  return filtered.length < beforeLen;
}

/**
 * Store user lead details into Supabase PostgreSQL 'leads' table
 */
export async function saveLead(lead: {
  name: string;
  email: string;
  phone: string;
  source?: string;
}): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("leads").insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source || "FTT Blog",
      });

      if (!error) return true;
      console.warn("Supabase lead insert error:", error);
    } catch (err) {
      console.warn("Supabase lead insert exception:", err);
    }
  }
  return false;
}
