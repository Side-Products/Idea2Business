import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "@/redux/actions/subscriptionActions";

const MySubscription = () => {
	const dispatch = useDispatch();
	const { subscription, error } = useSelector((state) => state.subscription);

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

	return subscription ? (
		<div>
			<p>{subscription.amountPaid}</p>
			{/* <p>{subscription.paymentInfo}</p> */}
			<p>{subscription.paidOn}</p>
			<p>{subscription.subscriptionValidUntil}</p>
		</div>
	) : null;
};

export default MySubscription;
