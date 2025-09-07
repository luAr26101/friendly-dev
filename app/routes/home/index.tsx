import AboutPreview from "~/components/AboutPreview";
import FeaturedProjects from "~/components/FeaturedProjects";
import LatestPosts from "~/components/LatestPosts";
import type { PostMeta, Project } from "~/types";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  const [projectRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL("/posts-meta.json", url)),
  ]);

  if (!projectRes.ok || !postsRes.ok)
    throw new Error("Failed to fetch projects or posts");

  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postsRes.json(),
  ]);

  return {
    projects,
    posts,
  };
}

function HomePage({ loaderData }: Route.ComponentProps) {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} limit={2} />
    </>
  );
}

export default HomePage;
