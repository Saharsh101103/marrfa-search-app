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

export async function POST(req: Request){
    const body = await req.json()
    const {query, category} = body
    const filteredResults = blogs
    .filter((blog: BlogPost) => 
      (blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase().includes(query.toLowerCase()) ||
      blog.description.toLowerCase().includes(query.toLowerCase())) &&
      (!category || blog.category === category)
    )
    return NextResponse.json({status: 200, payload: filteredResults})
}


