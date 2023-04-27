import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearErrors } from "@/redux/actions/subscriptionActions";
import Button from "@/components/ui/Button";
import easyinvoice from "easyinvoice";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { product_name, domain, freePlan, standardPlan, proPlusPlan } from "@/config/constants";
import { getCurrentSubscriptionTier, getSubscriptionPlanName } from "@/utils/Helpers";

export default function MySubscription() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { subscription, error } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan = getCurrentSubscriptionTier(subscription);
	const { setError } = useContext(StatusContext);
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
	}, [error]);

	const downloadInvoice = async (subscription) => {
		setLoading({ status: true });
		const data = {
			settings: {
				currency: subscription.country == "India" ? "INR" : "USD",
				"tax-notation": "vat",
				"margin-top": 50,
				"margin-right": 50,
				"margin-left": 50,
				"margin-bottom": 25,
			},
			translate: {
				invoice: product_name + " Invoice", // Default to 'INVOICE'
				number: "Invoice Number", // Defaults to 'Number'
				date: "Invoice Date", // Default to 'Date'
				"due-date": "Valid Until", // Defaults to 'Due Date'
				products: "Plan", // Defaults to 'Products'
			},
			images: {
				logo: `https://${domain}/logo.png`,
			},
			sender: {
				company: product_name,
				address: "KH. No. 23/2, 1st Floor, Gali No. 5, Block-A, Himgiri Enclave, Village - Mukandpur, Delhi, India",
				zip: "110081",
				city: "New Delhi",
				country: "India",
			},
			client: {
				company: `${subscription.user.name}`,
				address: `${subscription.user.email}`,
				zip: ``,
				city: ``,
				country: null,
			},
			information: {
				number: `${subscription._id}`,
				date: `${new Date(Date.now()).toLocaleString()}`,
				"due-date": `${new Date(subscription.subscriptionValidUntil).toDateString()}`,
			},
			products: [
				{
					quantity: `1`,
					description: `${subscriptionPlan}`,
					"tax-rate": 0,
					price: `${subscription.amountPaid}`,
				},
			],
			bottomNotice: "This is an auto generated invoice of your subscription on " + product_name,
		};

		const result = await easyinvoice.createInvoice(data);
		easyinvoice.download(`invoice_${subscription._id}.pdf`, result.pdf);
		setLoading({ status: false });
	};

	return (
		<>
			<p className="text-3xl font-semibold text-light-300">Current Plan</p>
			{subscription && new Date(subscription.subscriptionValidUntil) > Date.now() ? (
				<>
					<div className="text-3xl">
						{subscriptionPlan !== getSubscriptionPlanName(freePlan) && (
							<span className="mr-3">
								{subscriptionPlan == getSubscriptionPlanName(standardPlan) ? (
									<i className="fa-solid fa-crown text-gradient-pricing-standard"></i>
								) : subscriptionPlan == getSubscriptionPlanName(proPlusPlan) ? (
									<i className="fa-solid fa-crown text-gradient-pricing-pro"></i>
								) : (
									<></>
								)}
							</span>
						)}
						<span className="mt-[2px] font-bold text-gradient-primary-tr">
							{subscriptionPlan}
							{subscriptionPlan !== freePlan && (
								<span
									className="ml-2 text-lg cursor-pointer text-light-300 hover:text-light-600 transition duration-300"
									onClick={() => downloadInvoice(subscription)}
								>
									<i className="fa-solid fa-download"></i>
								</span>
							)}
						</span>
					</div>
					{subscriptionPlan !== freePlan && (
						<p className="text-light-400 text-sm mt-2">
							<span className="font-medium">Valid Until:</span>&nbsp;
							{new Date(subscription.subscriptionValidUntil).toDateString()}
						</p>
					)}
				</>
			) : (
				<>
					<p className="mt-1 text-3xl font-bold text-gradient-primary-tr">Free</p>
					<div className="mt-2">
						<Button
							type="button"
							variant={"secondary"}
							rounded={true}
							onClick={() => {
								router.push("/pricing");
							}}
							classes="text-sm px-6 py-[6px]"
						>
							Upgrade Now
						</Button>
					</div>
				</>
			)}
		</>
	);
}
