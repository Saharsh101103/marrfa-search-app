import { blogs } from "@/lib/data";
import { BlogPost } from "@/types";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const slug = searchParams.get("id") as string;
    const blogId = parseInt(slug)
    return NextResponse.json({status: 200, payload: blogs[blogId-1]})
}

export async function POST(req: Request) {
  const body = await req.json();
  const { query, category } = body;

  // If query is empty, return an empty payload
  if (!query || query.trim() === "") {
    return NextResponse.json({ status: 200, payload: [] });
  }

  // Filter results based on both query and category
  const filteredResults = blogs.filter((blog: BlogPost) => {
    const matchesQuery =
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || blog.category === category;

    return matchesQuery && matchesCategory;
  });

  return NextResponse.json({ status: 200, payload: filteredResults });
}



