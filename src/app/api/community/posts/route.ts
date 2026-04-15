import { NextResponse } from "next/server";
import { fetchPosts } from "@/app/actions/community-actions";

export async function GET() {
  const result = await fetchPosts();
  return NextResponse.json(result);
}
