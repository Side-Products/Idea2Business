import Modal from "@/components/ui/Modal";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { adminDeleteGeneratedResponse, clearErrors } from "@/redux/actions/generatedResponseActions";
import { ADMIN_DELETE_GENERATED_RESPONSE_RESET } from "@/redux/constants/generatedResponseConstants";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { sleep } from "@/utils/Sleep";
import { generateCategories } from "@/config/constants";
import { findByMatchingProperties } from "@/utils/Helpers";

const DeleteGeneratedResponseModal = ({ isOpen, setOpen, generatedResponseToDelete }) => {
	const { setSuccess, setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);

	const dispatch = useDispatch();
	const router = useRouter();

	const {
		isDeleted,
		error: deleteGeneratedResponseError,
		loading: deleteGeneratedResponseLoading,
	} = useSelector((state) => state.adminDeleteGeneratedResponse);

	useEffect(() => {
		if (deleteGeneratedResponseError) {
			setError({
				title: "Something went wrong",
				message: deleteGeneratedResponseError,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (isDeleted) {
			dispatch({ type: ADMIN_DELETE_GENERATED_RESPONSE_RESET });
			setSuccess({
				title: "Generated Response deleted successfully",
				message: "The selected response was deleted",
				showSuccessBox: true,
			});

			sleep(1000).then(() => {
				router.reload();
			});
		}
	}, [deleteGeneratedResponseError, generatedResponseToDelete, isDeleted]);

	useEffect(() => {
		if (deleteGeneratedResponseLoading) {
			setLoading({ status: true });
		} else {
			setLoading({ status: false });
		}
	}, [deleteGeneratedResponseLoading]);

	const deleteGeneratedResponseHandler = () => {
		dispatch(adminDeleteGeneratedResponse(generatedResponseToDelete._id));
		setOpen(false);
	};

	return (
		<Modal
			isOpen={isOpen}
			classes="max-w-[48rem]"
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-trash"></i>
				</div>
			}
			title={"Delete Generated Response"}
			content={
				<div>
					{generatedResponseToDelete && (
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								deleteGeneratedResponseHandler();
							}}
						>
							<div className="flex flex-col justify-start text-start whitespace-pre-wrap max-h-[300px] sm:max-h-[400px] overflow-y-scroll pr-4">
								<div className="mb-4">
									<p className="text-sm text-dark-100">{generatedResponseToDelete.user.name}</p>
									<p className="text-sm text-dark-100">
										<span data-info={generatedResponseToDelete.user.email}>{generatedResponseToDelete.user.email}</span>
									</p>
								</div>
								<p className="text-xl font-semibold text-gradient-primary-tr">
									{
										findByMatchingProperties(generateCategories[generatedResponseToDelete.category], {
											identifier: generatedResponseToDelete.identifier,
										})[0].cardText
									}
								</p>
								<p className="mt-8 text-sm">{generatedResponseToDelete.response}</p>

								<p className="mt-8 text-lg font-semibold text-gradient-secondary-tr">Searched Idea</p>
								<p className="mt-2 text-sm">{generatedResponseToDelete.ideaSearch.name}</p>
								<p className="mt-4 text-sm">{generatedResponseToDelete.ideaSearch.description}</p>
							</div>

							<p className="text-sm font-semibold text-center mt-10">Are you sure you want to delete this response?</p>

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
	);
};

export default DeleteGeneratedResponseModal;
