import { useContext } from "react";
import { useRouter } from "next/router";
import { StatusContext } from "@/store/StatusContextProvider";
import { getTimestamp } from "@/utils/helpers";

const ProjectCard = ({ project, adminView }) => {
	const router = useRouter();
	const { setSuccess } = useContext(StatusContext);

	const copyToClipboard = async (event) => {
		const reqStr = event.target.parentNode.querySelector("span").dataset.info;
		await navigator.clipboard.writeText(reqStr);
		setSuccess((prevState) => ({
			...prevState,
			title: "Text copied",
			message: "Text has been copied to clipboard",
			showSuccessBox: true,
		}));
	};

	return (
		<div
			onClick={() => router.push(`/generate?name=${project.name}&description=${project.description}`)}
			className="relative px-6 py-5 bg-dark-700 rounded-md cursor-pointer shadow hover:shadow-primary-500 transition-all duration-500"
		>
			{adminView && (
				<div className="mb-4">
					<p className="text-sm text-dark-100">{project.user.name}</p>
					<p className="text-sm text-dark-100">
						<span data-info={project.user.email}>{project.user.email}</span>
						<i className="far fa-copy ml-2 cursor-pointer" onClick={copyToClipboard}></i>
					</p>
				</div>
			)}
			<p className="text-xl font-semibold">{project.name}</p>
			<p className="mt-4 text-sm">{project.description}</p>
			<span className="absolute right-2 bottom-1 text-xs text-dark-300">{getTimestamp(project.createdAt).slice(0, 10)}</span>
		</div>
	);
};

export default ProjectCard;
