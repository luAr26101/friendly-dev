import AboutPreview from "~/components/AboutPreview";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project } from "~/types";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return {
    projects: data,
  };
}

function HomePage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={1} />
      <AboutPreview />
    </>
  );
}

export default HomePage;
