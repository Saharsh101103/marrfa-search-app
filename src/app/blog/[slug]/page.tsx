import { BlogPost } from "@/components/BlogPost";

export default async function BlogPostPage({
    params,
  }: {
    params: { slug: string };
  }) {
    const data = await params; 
    const id = data.slug
    return <BlogPost id={id} />;
}
