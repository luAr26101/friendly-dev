import { Link } from "react-router";
import type { PostMeta } from "~/types";

function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="mb-4 rounded-lg bg-gray-800 p-6 shadow">
      <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
      <p className="mb-2 text-sm text-gray-400">
        {new Date(post.date).toDateString()}
      </p>
      <p className="mb-4 text-gray-300">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className="text-sm text-blue-300 hover:underline"
      >
        Read More →
      </Link>
    </article>
  );
}

export default PostCard;
