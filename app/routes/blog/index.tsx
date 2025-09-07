import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostCard from "~/components/PostCard";
import PostFilter from "~/components/PostFilter";
import type { PostMeta } from "~/types";
import type { Route } from "./+types/index";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(`${url.href}`);

  if (!res.ok) throw new Error("Failed to fetch data.");

  const data = await res.json();

  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { posts: data };
}

function BlogPage({ loaderData }: Route.ComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const { posts } = loaderData;
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold text-white">📝 Blog</h2>
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />
      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-center text-gray-400">No posts found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default BlogPage;
