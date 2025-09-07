import type { PostMeta } from "~/types";
import type { Route } from "./+types/index";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(`${url.href}`);

  if (!res.ok) throw new Error("Failed to fetch data.");

  const data = await res.json();

  return { posts: data };
}

function BlogPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  console.log(posts);
  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-white">📝 Blog</h2>
    </>
  );
}

export default BlogPage;
