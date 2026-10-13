import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import { BlogPost, SEED_POSTS, estimateReadTime } from "./supabase";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");
const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.MONGODB_DB_NAME || "ftt_blog";
const COLLECTION_NAME = "posts";

// Global cache for MongoDB connection across HMR in development
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

function isMongoConfigured(): boolean {
  return Boolean(MONGODB_URI && MONGODB_URI.startsWith("mongodb"));
}

if (isMongoConfigured()) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(MONGODB_URI);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
  }
}

// -------------------------------------------------------------
// LOCAL FILE SYSTEM PERSISTENCE (Fallback / Instant Offline Sync)
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

  // If file doesn't exist, seed it
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
    id: post.id || (post._id ? post._id.toString() : crypto.randomUUID()),
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
// PUBLIC RE-EXPORTS: UNIFIED DB ENGINE
// -------------------------------------------------------------

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const docs = await db
        .collection(COLLECTION_NAME)
        .find({ published: true })
        .sort({ created_at: -1 })
        .toArray();

      if (docs.length > 0) {
        return docs.map(formatPost);
      }
    } catch (err) {
      console.warn("MongoDB fetch published posts failed, using local file store:", err);
    }
  }

  const posts = readFromFile();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(formatPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const doc = await db.collection(COLLECTION_NAME).findOne({ slug });
      if (doc) {
        return formatPost(doc);
      }
    } catch (err) {
      console.warn("MongoDB fetch post by slug failed, using local file store:", err);
    }
  }

  const posts = readFromFile();
  const found = posts.find((p) => p.slug === slug);
  return found ? formatPost(found) : null;
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const docs = await db
        .collection(COLLECTION_NAME)
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      if (docs.length > 0) {
        return docs.map(formatPost);
      }
    } catch (err) {
      console.warn("MongoDB fetch admin posts failed, using local file store:", err);
    }
  }

  const posts = readFromFile();
  return posts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(formatPost);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      let query: any = { id };
      if (ObjectId.isValid(id)) {
        query = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      const doc = await db.collection(COLLECTION_NAME).findOne(query);
      if (doc) {
        return formatPost(doc);
      }
    } catch (err) {
      console.warn("MongoDB fetch post by id failed, using local file store:", err);
    }
  }

  const posts = readFromFile();
  const found = posts.find((p) => p.id === id);
  return found ? formatPost(found) : null;
}

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

  // Always write to local file for instant guaranteed durability
  const current = readFromFile();
  current.unshift(record);
  writeToFile(current);

  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      await db.collection(COLLECTION_NAME).insertOne({
        ...record,
        _id: new ObjectId(),
      });
    } catch (err) {
      console.warn("MongoDB insert failed, saved to local file successfully:", err);
    }
  }

  return formatPost(record);
}

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

  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      let query: any = { id };
      if (ObjectId.isValid(id)) {
        query = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      await db.collection(COLLECTION_NAME).updateOne(query, {
        $set: {
          ...updates,
          updated_at,
        },
      });
    } catch (err) {
      console.warn("MongoDB update failed, updated local file successfully:", err);
    }
  }

  return formatPost(updated);
}

export async function deletePost(id: string): Promise<boolean> {
  const current = readFromFile();
  const beforeLen = current.length;
  const filtered = current.filter((p) => p.id !== id);
  writeToFile(filtered);

  if (isMongoConfigured() && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      let query: any = { id };
      if (ObjectId.isValid(id)) {
        query = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      await db.collection(COLLECTION_NAME).deleteOne(query);
    } catch (err) {
      console.warn("MongoDB delete failed, deleted from local file successfully:", err);
    }
  }

  return filtered.length < beforeLen;
}
