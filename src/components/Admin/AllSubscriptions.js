import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetSubscriptions, adminDeleteSubscription, clearErrors } from "@/redux/actions/subscriptionActions";
import { ADMIN_DELETE_SUBSCRIPTION_RESET } from "@/redux/constants/subscriptionConstants";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import Loader from "@/components/ui/Loader";
import DeleteSubscriptionConfirmModal from "./Modals/DeleteSubscriptionConfirmModal";

export default function AllSubscriptions() {
	const dispatch = useDispatch();
	const { subscriptions, error, loading } = useSelector((state) => state.adminGetSubscriptions);
	const { isDeleted, error: deleteSubscriptionError, loading: deleteSubscriptionLoading } = useSelector((state) => state.adminDeleteSubscription);

	const [isDeleteSubscriptionConfirmModalOpen, setDeleteSubscriptionConfirmModalOpen] = useState(false);
	const [subscriptionToDelete, setSubscriptionToDelete] = useState("");

	const { setSuccess, setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);

	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (deleteSubscriptionError) {
			setError({
				title: "Something went wrong",
				message: deleteSubscriptionError,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (isDeleted) {
			dispatch({ type: ADMIN_DELETE_SUBSCRIPTION_RESET });
			setSuccess({
				title: "Subscription deleted successfully",
				message: "The selected subscription was deleted",
				showSuccessBox: true,
			});
			dispatch(adminGetSubscriptions());
		}
	}, [error, deleteSubscriptionError, isDeleted]);

	useEffect(() => {
		if (deleteSubscriptionLoading) {
			setLoading({ status: true });
		} else {
			setLoading({ status: false });
		}
	}, [deleteSubscriptionLoading]);

	useEffect(() => {
		dispatch(adminGetSubscriptions());
	}, [dispatch]);

	const deleteSubscriptionHandler = (id) => {
		dispatch(adminDeleteSubscription(id));
	};

	return loading ? (
		<Loader />
	) : subscriptions && subscriptions.length > 0 ? (
		<div className="mt-16 w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
			{subscriptions.map((subscription) => (
				<div className="relative group px-8 py-7 rounded-xl bg-dark-700">
					<div className="flex items-start justify-between">
						<p className="text-2xl font-semibold text-light-300">{subscription.user.name}</p>
						<span className="text-3xl font-bold text-gradient-primary-tr">
							{subscription.amountPaid == 5 ? "$5" : subscription.amountPaid == 10 ? "$10" : ""}
						</span>
					</div>
					<p className="text-sm text-light-600">{subscription.user.email}</p>

					<p className="text-light-500 text-sm mt-4">
						<span className="font-medium">Started On:</span>&nbsp;
						{new Date(subscription.paidOn).toDateString()}
					</p>
					<p className="text-light-500 text-sm mt-1">
						<span className="font-medium">Valid Until:</span>&nbsp;
						{new Date(subscription.subscriptionValidUntil).toDateString()}
					</p>

					<p className="text-light-500 text-sm mt-1">
						<span className="font-medium">Stripe Payment ID:</span>&nbsp;
						{subscription.paymentInfo.id}
					</p>

					<span
						className="absolute group-hover:block hidden right-4 bottom-2 text-lg cursor-pointer text-light-300 hover:text-error-400 transition duration-300"
						onClick={() => {
							setSubscriptionToDelete(subscription);
							setDeleteSubscriptionConfirmModalOpen(true);
						}}
					>
						<i className="fa-solid fa-trash"></i>
					</span>
				</div>
			))}

			<DeleteSubscriptionConfirmModal
				isOpen={isDeleteSubscriptionConfirmModalOpen}
				setOpen={setDeleteSubscriptionConfirmModalOpen}
				subscriptionToDelete={subscriptionToDelete}
				deleteSubscriptionHandler={deleteSubscriptionHandler}
			/>
		</div>
	) : (
		<div className="mt-20 text-light-500">No subscriptions yet</div>
	);
}
