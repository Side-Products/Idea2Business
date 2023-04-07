import { useContext } from "react";
import { StatusContext } from "@/store/StatusContextProvider";
import { getTimestamp } from "@/utils/Helpers";
import { generateCategories } from "@/config/constants";
import { findByMatchingProperties } from "@/utils/Helpers";

const GeneratedResponseCard = ({
	generatedResponse,
	adminView,
	setModalText,
	setContentModalOpen,
	setGeneratedResponseToDelete,
	setDeleteGeneratedResponseModalOpen,
}) => {
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
		<div className="group relative px-6 pt-5 pb-8 bg-dark-700 rounded-md cursor-pointer shadow hover:shadow-primary-500 transition-all duration-500">
			<div
				onClick={() => {
					setModalText({
						heading: findByMatchingProperties(generateCategories[generatedResponse.category], { identifier: generatedResponse.identifier })[0]
							.cardText,
						content: generatedResponse.response,
					});
					setContentModalOpen(true);
				}}
			>
				{adminView && (
					<div className="mb-4">
						<p className="text-sm text-dark-100">{generatedResponse.user.name}</p>
						<p className="text-sm text-dark-100">
							<span data-info={generatedResponse.user.email}>{generatedResponse.user.email}</span>
							<i className="far fa-copy ml-2 cursor-pointer" onClick={copyToClipboard}></i>
						</p>
					</div>
				)}
				<p className="text-xl font-semibold text-gradient-primary-tr">{generatedResponse.identifier}</p>
				<p className="mt-4 text-sm">
					{generatedResponse.response.length < 140 ? generatedResponse.response : generatedResponse.response.substring(0, 140)}...
				</p>
				<p className="mt-1 text-sm text-dark-100">Click to view more</p>
				<p className="mt-4 text-lg font-semibold text-gradient-secondary-tr">Searched Idea</p>
				<p className="mt-2 text-sm">{generatedResponse.ideaSearch.name}</p>
				<p className="mt-4 text-sm">{generatedResponse.ideaSearch.description}</p>
				<span className="absolute left-6 bottom-2 text-xs text-dark-200">{getTimestamp(generatedResponse.createdAt).slice(0, 10)}</span>
			</div>

			<span
				className="absolute group-hover:block hidden right-4 bottom-2 text-lg cursor-pointer text-light-300 hover:text-error-400 transition duration-300"
				onClick={() => {
					setGeneratedResponseToDelete(generatedResponse);
					setDeleteGeneratedResponseModalOpen(true);
				}}
			>
				<i className="fa-solid fa-trash"></i>
			</span>
		</div>
	);
};

export default GeneratedResponseCard;
