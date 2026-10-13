import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/supabase";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch published posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch published posts" },
      { status: 500 }
    );
  }
}
