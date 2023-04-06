import { useSelector } from "react-redux";
import { Ideas } from "@/components/Profile/Searches/Ideas";

export default function AllSearches() {
	const { ideas, resultsPerPage, ideasCount, filteredIdeasCount, error } = useSelector((state) => state.allIdeas);

	return (
		<Ideas adminView={true} ideas={ideas} resultsPerPage={resultsPerPage} ideasCount={ideasCount} filteredIdeasCount={filteredIdeasCount} error={error} />
	);
}
