import { Link } from "react-router";
import type { Post } from "~/types";

type LatestPostsProps = {
  posts: Post[];
  limit?: number;
};

function LatestPosts({ posts, limit = 3 }: LatestPostsProps) {
  const sorted = [...posts].sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const latests = sorted.slice(0, limit);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold text-white">🆕 Latest pots</h2>
      <div className="lg:grid-cold-3 grid gap-6 sm:grid-cols-2">
        {latests.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="block rounded-lg border border-gray-700 bg-gray-800 p-4 transition hover:shadow-md"
          >
            <h3 className="mb-1 text-lg font-semibold text-blue-400">
              {post.title}
            </h3>
            <p className="text-sm text-gray-300">{post.excerpt}</p>
            <span className="mt-3 block text-xs text-gray-400">
              {new Date(post.date).toDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default LatestPosts;
