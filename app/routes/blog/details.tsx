import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
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
  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">
        {postMeta.title}
      </h1>
      <p className="mb-6 text-sm text-gray-400">
        {new Date(postMeta.date).toDateString()}
      </p>
      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <Link
        to="/blog"
        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Back to posts →
      </Link>
    </div>
  );
}

export default BlogPostDetailsPage;
