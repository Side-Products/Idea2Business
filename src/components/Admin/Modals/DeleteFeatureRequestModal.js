import Modal from "@/components/ui/Modal";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { adminDeleteFeatureRequest, clearErrors } from "@/redux/actions/featureRequestActions";
import { ADMIN_DELETE_FEATURE_REQUEST_RESET } from "@/redux/constants/featureRequestConstants";
import { StatusContext } from "@/store/StatusContextProvider";
import Loader from "@/components/ui/Loader";
import { sleep } from "@/utils/Sleep";

const DeleteFeatureRequestModal = ({ isOpen, setOpen, featureRequestToDelete }) => {
	const { setSuccess, setError } = useContext(StatusContext);

	const dispatch = useDispatch();
	const router = useRouter();

	const { error, isDeleted, loading } = useSelector((state) => state.adminDeleteFeatureRequest);

	useEffect(() => {
		if (isDeleted) {
			setSuccess({
				title: "Feature Request deleted successfully",
				message: "The selected feature request was deleted",
				showSuccessBox: true,
			});

			dispatch({ type: ADMIN_DELETE_FEATURE_REQUEST_RESET });
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
	}, [dispatch, featureRequestToDelete, error, isDeleted]);

	const deleteFeatureRequestHandler = () => {
		dispatch(adminDeleteFeatureRequest(featureRequestToDelete._id));
		setOpen(false);
	};

	return loading ? (
		<Loader />
	) : (
		<Modal
			isOpen={isOpen}
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-trash"></i>
				</div>
			}
			title={"Delete Feature Request"}
			content={
				<div>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							deleteFeatureRequestHandler();
						}}
					>
						<div className="flex flex-col justify-center">
							<div className="flex justify-center items-center gap-x-4">
								<p className="text-xl font-semibold text-light-300">{featureRequestToDelete.name}</p>
							</div>
							<p className="text-sm text-light-600 mt-1">{featureRequestToDelete.email}</p>

							<div className="text-start text-base mt-4">
								<span className="font-medium text-gradient-secondary-tr">Feature Name</span>
								<p className="text-light-400">{featureRequestToDelete.featureName}</p>
							</div>

							<div className="text-start text-base mt-4">
								<span className="font-medium text-gradient-secondary-tr">Feature Description</span>&nbsp;
								<p className="text-light-500 pr-2 max-h-[400px] overflow-scroll">{featureRequestToDelete.featureDescription}</p>
							</div>
						</div>

						<p className="text-sm font-semibold text-center mt-10">Are you sure you want to delete this feature request?</p>

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
				</div>
			}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default DeleteFeatureRequestModal;
