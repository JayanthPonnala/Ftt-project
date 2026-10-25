import fs from "fs";
import path from "path";
import crypto from "crypto";
import { BlogPost, SEED_POSTS, estimateReadTime, getSupabaseClient } from "./supabase";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

/**
 * Validates any 32-character hexadecimal UUID format (PostgreSQL uuid compliant)
 */
export function isValidUUID(str: string): boolean {
  if (!str || typeof str !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

// -------------------------------------------------------------
// LOCAL FILE SYSTEM BACKUP & CACHE
// -------------------------------------------------------------
function readFromFile(): BlogPost[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (err) {
    console.error("Error reading data/posts.json:", err);
  }

  // Initial seed only if file does not exist
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
// SUPABASE POSTGRESQL PRIMARY DATABASE OPERATIONS
// -------------------------------------------------------------

/**
 * Fetch all posts (both published and drafts) for admin dashboard.
 * When Supabase is configured, it is the authoritative database.
 * The result is cached locally in data/posts.json for offline resilience.
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
        const supaPosts = data.map(formatPost);
        // Update local backup file so it reflects exact database state
        writeToFile(supaPosts);
        return supaPosts;
      } else if (error) {
        console.warn("Supabase admin fetch error, falling back to local file:", error);
      }
    } catch (err) {
      console.warn("Supabase admin fetch exception, falling back to local file:", err);
    }
  }

  // Fallback to local file store if Supabase unavailable
  const localPosts = readFromFile();
  return localPosts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(formatPost);
}

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

      if (!error && Array.isArray(data)) {
        return data.map(formatPost);
      } else if (error) {
        console.warn("Supabase published fetch error, falling back:", error);
      }
    } catch (err) {
      console.warn("Supabase published fetch exception, falling back:", err);
    }
  }

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
        .maybeSingle();

      if (!error && data) {
        return formatPost(data);
      }
    } catch (err) {
      console.warn(`Supabase fetch post by slug '${slug}' failed:`, err);
    }
  }

  const posts = readFromFile();
  const found = posts.find((p) => p.slug === slug);
  return found ? formatPost(found) : null;
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (supabase && isValidUUID(id)) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

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
 * Create a new article directly in Supabase PostgreSQL & update local cache.
 */
export async function createPost(
  newPost: Omit<BlogPost, "id" | "created_at"> & {
    id?: string;
    created_at?: string;
  }
): Promise<BlogPost> {
  const id =
    newPost.id && isValidUUID(newPost.id) ? newPost.id : crypto.randomUUID();
  const created_at = newPost.created_at || new Date().toISOString();
  const updated_at = new Date().toISOString();

  let record: BlogPost = {
    ...newPost,
    id,
    created_at,
    updated_at,
    read_time: estimateReadTime(newPost.content || ""),
  };

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        id: record.id,
        title: record.title,
        slug: record.slug,
        excerpt: record.excerpt,
        content: record.content,
        published: record.published,
        created_at: record.created_at,
        updated_at: record.updated_at,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert failed:", error);
      throw new Error(`Database insert error: ${error.message}`);
    }

    if (data) {
      record = formatPost(data);
    }
  }

  // Update local file cache
  const current = readFromFile();
  const filtered = current.filter((p) => p.id !== record.id);
  filtered.unshift(record);
  writeToFile(filtered);

  return record;
}

/**
 * Update an article directly in Supabase PostgreSQL & update local cache.
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<BlogPost, "id">>
): Promise<BlogPost | null> {
  const updated_at = new Date().toISOString();
  let updatedRecord: BlogPost | null = null;
  const supabase = getSupabaseClient();

  if (supabase && isValidUUID(id)) {
    const payload: Record<string, unknown> = {
      updated_at,
    };
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.slug !== undefined) payload.slug = updates.slug;
    if (updates.excerpt !== undefined) payload.excerpt = updates.excerpt;
    if (updates.content !== undefined) payload.content = updates.content;
    if (updates.published !== undefined) payload.published = updates.published;

    const { data, error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error(`Supabase update post '${id}' error:`, error);
      throw new Error(`Database update error: ${error.message}`);
    }

    if (data) {
      updatedRecord = formatPost(data);
    }
  }

  // Update in local file backup
  const current = readFromFile();
  const index = current.findIndex((p) => p.id === id);

  if (index !== -1) {
    const localUpdated: BlogPost = {
      ...current[index],
      ...updates,
      updated_at,
      read_time: estimateReadTime(
        updates.content !== undefined ? updates.content : current[index].content
      ),
    };
    current[index] = localUpdated;
    writeToFile(current);

    if (!updatedRecord) {
      updatedRecord = localUpdated;
    }
  } else if (updatedRecord) {
    current.unshift(updatedRecord);
    writeToFile(current);
  }

  return updatedRecord;
}

/**
 * Permanently delete an article from Supabase PostgreSQL & local cache.
 */
export async function deletePost(id: string): Promise<boolean> {
  let deleted = false;
  const supabase = getSupabaseClient();

  // 1. Delete permanently from Supabase PostgreSQL
  if (supabase && isValidUUID(id)) {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error(`Supabase delete post '${id}' error:`, error);
      throw new Error(`Database delete error: ${error.message}`);
    }

    if (Array.isArray(data) && data.length > 0) {
      deleted = true;
    }
  }

  // 2. Remove permanently from local cache file
  const current = readFromFile();
  const beforeLen = current.length;
  const filtered = current.filter((p) => p.id !== id);

  if (filtered.length < beforeLen) {
    writeToFile(filtered);
    deleted = true;
  }

  return deleted;
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

  // Backup to local leads file
  try {
    let existingLeads: any[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      existingLeads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    }
    existingLeads.push({
      ...lead,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to save lead locally:", err);
  }

  return false;
}
