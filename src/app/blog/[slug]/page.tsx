import { BlogPost } from "@/components/BlogPost";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <BlogPost id={slug} />;
}
