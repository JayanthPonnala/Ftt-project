import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import { getAllPostsAdmin, createPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await getAllPostsAdmin();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Admin fetch posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, published } = body;

    if (!title?.trim() || !excerpt?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title, excerpt, and content are required fields." },
        { status: 400 }
      );
    }

    // Auto-generate clean slug if not provided
    const cleanSlug =
      slug?.trim()
        ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        : title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

    const newPost = await createPost({
      title: title.trim(),
      slug: cleanSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      published: published !== undefined ? Boolean(published) : true,
    });

    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/blog");
      revalidatePath("/admin/blog");
      if (newPost.slug) revalidatePath(`/blog/${newPost.slug}`);
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Admin create post error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
