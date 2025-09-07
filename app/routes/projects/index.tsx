import { useState } from "react";
import Pagination from "~/components/Pagination";
import ProjectCard from "~/components/ProjectCard";
import type { Project } from "~/types";
import type { Route } from "./+types/index";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();

  return {
    projects: data,
  };
}

function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 10;
  const { projects } = loaderData as { projects: Project[] };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects base on category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Calculate totalPages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get curent page's projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;

  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-white">🚀 Projects</h2>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`cursor-pointer rounded px-3 py-1 text-sm ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="sm: grid grid-cols-2 gap-6">
        {currentProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
      {
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      }
    </>
  );
}

export default ProjectsPage;
