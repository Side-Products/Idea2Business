import { useContext, useEffect } from "react";
import StatusContext from "@/store/status-context";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";

export const Projects = () => {
	const [, , , setError] = useContext(StatusContext);
	const { projects, error } = useSelector((state) => state.allProjects);

	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
		}
	}, [error]);

	return (
		<div className="w-full flex flex-col">
			<h1 className="text-6xl font-bold text-center">Searched Projects</h1>
			<div className="w-full flex flex-col items-center justify-center mt-20">
				{projects && projects.length === 0 ? (
					<div className="text-2xl font-bold text-center">No Projects</div>
				) : (
					<div className="w-full grid grid-cols-4 gap-6">
						{projects && projects.map((project) => <ProjectCard key={project._id} project={project} />)}
					</div>
				)}
			</div>
		</div>
	);
};
