import { useSelector } from "react-redux";
import { GeneratedResponses } from "@/components/Profile/Searches/GeneratedResponses";

export default function AllSearches() {
	const { generatedResponses, resultsPerPage, generatedResponsesCount, filteredGeneratedResponsesCount, error } = useSelector(
		(state) => state.allGeneratedResponses
	);

	return (
		<GeneratedResponses
			adminView={true}
			generatedResponses={generatedResponses}
			resultsPerPage={resultsPerPage}
			generatedResponsesCount={generatedResponsesCount}
			filteredGeneratedResponsesCount={filteredGeneratedResponsesCount}
			error={error}
		/>
	);
}
