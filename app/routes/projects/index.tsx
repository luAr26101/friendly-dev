import { useState } from "react";
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
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 10;

  // Calculate totalPages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get curent page's projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;

  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  // Pagination button render
  const renderPagination = () => (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          className={`cursor-pointer rounded px-3 py-1 ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          onClick={() => setCurrentPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-white">🚀 Projects</h2>
      <div className="sm: grid grid-cols-2 gap-6">
        {currentProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
      {totalPages > 1 && renderPagination()}
    </>
  );
}

export default ProjectsPage;
