import type { PostMeta } from "~/types";
import type { Route } from "./+types/details";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  console.log(slug);

  const url = new URL("/posts-meta.json", request.url);

  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data.");

  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("Not Found", { status: 404 });

  // Dynamically import the raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

function BlogPostDetailsPage({ loaderData }: Route.ComponentProps) {
  const { postMeta, markdown } = loaderData;

  console.log(postMeta, markdown);
  return <>Blog </>;
}

export default BlogPostDetailsPage;
