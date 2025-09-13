import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import type { Post, StrapiPost, StrapiResponse } from "~/types";
import type { Route } from "./+types/details";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  console.log(slug);

  // const url = new URL("/posts-meta.json", request.url);
  // const res = await fetch(url.href);

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`,
  );

  if (!res.ok) throw new Error("Failed to fetch data.");

  // const index = await res.json();
  // const postMeta = index.find((post: PostMeta) => post.slug === slug);
  const json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response("Not Found", { status: 404 });

  // Dynamically import the raw markdown
  // const markdown = await import(`../../posts/${slug}.md?raw`);
  // return {
  //   postMeta,
  //   markdown: markdown.default,
  // };

  const item = json.data[0];

  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };

  return { post };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    post: Post;
  };
};

function BlogPostDetailsPage({ loaderData }: BlogPostDetailsPageProps) {
  // const { postMeta, markdown } = loaderData;
  const { post } = loaderData;
  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">{post.title}</h1>
      <p className="mb-6 text-sm text-gray-400">
        {new Date(post.date).toDateString()}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="mb-4 h-64 w-full object-cover"
      />
      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{post.body}</ReactMarkdown>
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
