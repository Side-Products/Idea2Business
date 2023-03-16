import { useSelector } from "react-redux";
import { Projects } from "@/components/Profile/Searches/Projects";

export default function AllSearches() {
	const { projects, resultsPerPage, projectsCount, filteredProjectsCount, error } = useSelector((state) => state.allProjects);

	return (
		<Projects
			adminView={true}
			projects={projects}
			resultsPerPage={resultsPerPage}
			projectsCount={projectsCount}
			filteredProjectsCount={filteredProjectsCount}
			error={error}
		/>
	);
}
