import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import StatusContext from "@/store/status-context";
import { clearErrors } from "@/redux/actions/projectActions";
import Pager from "./Pager";
import ProjectCard from "./ProjectCard";
import Search from "./Search";

export const Projects = () => {
	const [, , , setError] = useContext(StatusContext);
	const { projects, resultsPerPage, projectsCount, filteredProjectsCount, error } = useSelector((state) => state.allProjects);

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

	let count = projectsCount;
	if (search) {
		count = filteredProjectsCount;
	}

	return (
		<>
			<div className="w-full flex flex-col">
				<h1 className="text-6xl font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Past Searches</h1>

				<div className="flex flex-col xl:w-1/3 lg:w-9/12 md:w-1/2 mt-8">
					<Search />
					{search && <div className="text-sm mt-2 ml-2">Showing results for: {search}</div>}
				</div>

				<div className="w-full flex flex-col items-center justify-center mt-10">
					{projects && projects.length === 0 ? (
						<div className="text-2xl font-bold text-center">No Projects</div>
					) : (
						<div className="w-full grid grid-cols-4 gap-6">
							{projects && projects.map((project) => <ProjectCard key={project._id} project={project} />)}
						</div>
					)}
				</div>

				<div className="mt-12">
					{resultsPerPage < count && (
						<Pager activePage={page} onPageChange={handlePagination} itemsCountPerPage={resultsPerPage} totalItemsCount={count} />
					)}
				</div>
			</div>
		</>
	);
};
