import Modal from "@/components/ui/Modal";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { adminDeleteIdeaSearch, clearErrors } from "@/redux/actions/ideaActions";
import { ADMIN_DELETE_IDEA_SEARCH_RESET } from "@/redux/constants/ideaConstants";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { sleep } from "@/utils/Sleep";

const DeleteIdeaSearchModal = ({ isOpen, setOpen, ideaSearchToDelete }) => {
	const { setSuccess, setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);

	const dispatch = useDispatch();
	const router = useRouter();

	const { error, isDeleted, loading } = useSelector((state) => state.adminDeleteIdeaSearch);

	useEffect(() => {
		if (loading) {
			setLoading({ status: true });
		} else {
			setLoading({ status: false });
		}
	}, [loading]);

	useEffect(() => {
		if (isDeleted) {
			setSuccess({
				title: "Searched Idea deleted successfully",
				message: "The selected idea search was deleted",
				showSuccessBox: true,
			});
			dispatch({ type: ADMIN_DELETE_IDEA_SEARCH_RESET });
			sleep(1000).then(() => {
				router.reload();
			});
		}
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [dispatch, ideaSearchToDelete, error, isDeleted]);

	const deleteIdeaSearchHandler = () => {
		dispatch(adminDeleteIdeaSearch(ideaSearchToDelete._id));
		setOpen(false);
	};

	return (
		!loading && (
			<Modal
				isOpen={isOpen}
				image={
					<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
						<i className="fa-solid fa-trash"></i>
					</div>
				}
				title={"Delete Searched Idea"}
				content={
					<div>
						{ideaSearchToDelete && (
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									deleteIdeaSearchHandler();
								}}
							>
								<div className="flex flex-col justify-start text-start whitespace-pre-wrap max-h-[300px] sm:max-h-[400px] overflow-y-scroll pr-4">
									<div className="mb-4">
										<p className="text-sm text-dark-100">{ideaSearchToDelete.user.name}</p>
										<p className="text-sm text-dark-100">
											<span data-info={ideaSearchToDelete.user.email}>{ideaSearchToDelete.user.email}</span>
										</p>
									</div>
									<p className="text-xl font-semibold text-gradient-primary-tr">{ideaSearchToDelete.name}</p>
									<p className="mt-6 text-sm">{ideaSearchToDelete.description}</p>
								</div>

								<p className="text-sm font-semibold text-center mt-10">Are you sure you want to delete this searched idea?</p>

								<div className="flex justify-end">
									<button
										type="submit"
										className="flex items-center mt-10 -mb-6 px-6 py-2 text-sm font-primary font-bold rounded-md bg-error-600 hover:bg-error-700 text-light-100"
									>
										Delete
										<span className="ml-6 text-lg">
											<i className="fa-solid fa-arrow-right-long"></i>
										</span>
									</button>
								</div>
							</form>
						)}
					</div>
				}
				onClose={() => {
					setOpen(false);
				}}
			></Modal>
		)
	);
};

export default DeleteIdeaSearchModal;
