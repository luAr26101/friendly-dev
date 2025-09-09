import AboutPreview from "~/components/AboutPreview";
import FeaturedProjects from "~/components/FeaturedProjects";
import LatestPosts from "~/components/LatestPosts";
import type { PostMeta, Project, StrapiProject, StrapiResponse } from "~/types";
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
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`,
    ),
    fetch(new URL("/posts-meta.json", url)),
  ]);

  if (!projectRes.ok || !postsRes.ok)
    throw new Error("Failed to fetch projects or posts");

  const projectJson: StrapiResponse<StrapiProject> = await projectRes.json();
  const postJson = await await postsRes.json();

  const projects = projectJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));
  return {
    projects,
    posts: postJson,
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
