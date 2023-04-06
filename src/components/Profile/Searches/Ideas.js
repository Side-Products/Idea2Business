import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { StatusContext } from "@/store/StatusContextProvider";
import { clearErrors } from "@/redux/actions/ideaActions";
import Pager from "@/components/ui/Pagination/Pager";
import Button from "@/components/ui/Button";
import IdeaCard from "./IdeaCard";
import Search from "./Search";

export const Ideas = ({ ideas, resultsPerPage, ideasCount, filteredIdeasCount, error, adminView }) => {
	const { setError } = useContext(StatusContext);

	const router = useRouter();
	let { search, page = 1 } = router.query;
	page = Number(page);

	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [error]);

	let queryParams;
	if (typeof window !== "undefined") {
		queryParams = new URLSearchParams(window.location.search);
	}

	const handlePagination = (pageNumber) => {
		if (queryParams.has("page")) {
			queryParams.set("page", pageNumber + 1);
		} else {
			queryParams.append("page", pageNumber + 1);
		}

		router.replace({
			search: queryParams.toString(),
		});
	};

	let count = ideasCount;
	if (search) {
		count = filteredIdeasCount;
	}

	return (
		<>
			<div className="flex flex-col xl:w-1/3 lg:w-9/12 md:w-1/2 mt-8">
				<Search />
				{search && <div className="text-sm mt-2 ml-2">Showing results for: {search}</div>}
			</div>

			<div className="w-full flex flex-col items-center justify-center mt-10">
				{ideas && ideas.length === 0 ? (
					<div>
						<p className="text-2xl font-medium text-light-400 text-center mt-10">No idea searches yet</p>
						<div className="mt-8">
							<Button
								variant={"primary"}
								outline={true}
								rounded={true}
								classes="px-[2px] py-[2px]"
								onClick={() => {
									router.push("/generate");
								}}
							>
								<div className="px-4 text-sm font-normal">
									Go search for an idea now
									<span className="ml-2 text-sm">
										<i className="fa-solid fa-arrow-right-long"></i>
									</span>
								</div>
							</Button>
						</div>
					</div>
				) : (
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{ideas && ideas.map((idea) => <IdeaCard key={idea._id} idea={idea} adminView={adminView} />)}
					</div>
				)}
			</div>

			<div className="mt-12">
				{resultsPerPage < count && (
					<Pager activePage={page} onPageChange={handlePagination} itemsCountPerPage={resultsPerPage} totalItemsCount={count} />
				)}
			</div>
		</>
	);
};
