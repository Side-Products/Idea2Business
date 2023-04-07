import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearErrors } from "@/redux/actions/generatedResponseActions";
import { StatusContext } from "@/store/StatusContextProvider";
import Pager from "@/components/ui/Pagination/Pager";
import Button from "@/components/ui/Button";
import GeneratedResponseCard from "./GeneratedResponseCard";
import Search from "./Search";
import ContentModal from "@/components/Generate/ContentModal";
import DeleteGeneratedResponseModal from "@/components/Admin/Modals/DeleteGeneratedResponseModal";

export const GeneratedResponses = ({ generatedResponses, resultsPerPage, generatedResponsesCount, filteredGeneratedResponsesCount, error, adminView }) => {
	const { setError } = useContext(StatusContext);

	const router = useRouter();
	let { search, page = 1 } = router.query;
	page = Number(page);

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

	let count = generatedResponsesCount;
	if (search) {
		count = filteredGeneratedResponsesCount;
	}

	// Modal states
	const [modalText, setModalText] = useState({ heading: "", content: "" });
	const [isContentModalOpen, setContentModalOpen] = useState(false);
	const [isDeleteGeneratedResponseModalOpen, setDeleteGeneratedResponseModalOpen] = useState(false);
	const [generatedResponseToDelete, setGeneratedResponseToDelete] = useState("");

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

	return (
		<>
			<div className="flex flex-col xl:w-1/3 lg:w-9/12 md:w-1/2 mt-8">
				<Search />
				{search && <div className="text-sm mt-2 ml-2">Showing results for: {search}</div>}
			</div>

			<div className="w-full flex flex-col items-center justify-center mt-10">
				{generatedResponses && generatedResponses.length === 0 ? (
					<div>
						<p className="text-2xl font-medium text-light-400 text-center mt-10">No generated responses yet</p>
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
						{generatedResponses &&
							generatedResponses.map((generatedResponse) => (
								<GeneratedResponseCard
									key={generatedResponse._id}
									generatedResponse={generatedResponse}
									adminView={adminView}
									setModalText={setModalText}
									setContentModalOpen={setContentModalOpen}
									setGeneratedResponseToDelete={setGeneratedResponseToDelete}
									setDeleteGeneratedResponseModalOpen={setDeleteGeneratedResponseModalOpen}
								/>
							))}
					</div>
				)}
			</div>

			<div className="mt-12">
				{resultsPerPage < count && (
					<Pager activePage={page} onPageChange={handlePagination} itemsCountPerPage={resultsPerPage} totalPagesCount={count} />
				)}
			</div>

			<div className="mt-16 font-semibold text-2xl text-light-400">Total Count: {generatedResponsesCount}</div>

			<ContentModal
				isOpen={isContentModalOpen}
				setOpen={setContentModalOpen}
				heading={modalText.heading}
				content={modalText.content}
				adminGeneratedResponseView={true}
			/>
			<DeleteGeneratedResponseModal
				isOpen={isDeleteGeneratedResponseModalOpen}
				setOpen={setDeleteGeneratedResponseModalOpen}
				generatedResponseToDelete={generatedResponseToDelete}
			/>
		</>
	);
};
