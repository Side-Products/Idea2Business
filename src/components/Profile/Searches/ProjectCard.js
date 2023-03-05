const ProjectCard = ({ project }) => {
	return (
		<div className="px-6 py-5 bg-dark-700 rounded-md cursor-pointer shadow hover:shadow-primary-500 transition-all duration-500">
			<p className="text-xl font-semibold">{project.name}</p>
			<p className="mt-4 text-sm">{project.description}</p>
		</div>
	);
};

export default ProjectCard;
