import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearErrors } from "@/redux/actions/subscriptionActions";
import Button from "@/components/ui/Button";
import easyinvoice from "easyinvoice";
import StatusContext from "@/store/status-context";
import LoadingContext from "@/store/loading-context";

export default function MySubscription() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { subscription, error } = useSelector((state) => state.subscription);
	const [, , , setError] = useContext(StatusContext);
	const [, setLoading] = useContext(LoadingContext);

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
				currency: "USD",
				"tax-notation": "vat",
				"margin-top": 50,
				"margin-right": 50,
				"margin-left": 50,
				"margin-bottom": 25,
			},
			translate: {
				invoice: "Project2Product Invoice", // Default to 'INVOICE'
				number: "Invoice Number", // Defaults to 'Number'
				date: "Invoice Date", // Default to 'Date'
				"due-date": "Valid Until", // Defaults to 'Due Date'
				products: "Plan", // Defaults to 'Products'
			},
			// TODO: change logo url
			images: {
				logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
			},
			sender: {
				company: "Project2Product",
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
					description: `${subscription.amountPaid == 5 ? "Standard" : subscription.amountPaid == 10 ? "Pro Plus" : ""}`,
					"tax-rate": 0,
					price: `${subscription.amountPaid}`,
				},
			],
			bottomNotice: "This is an auto generated invoice of your subscription on Project2Product.",
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
					<p className="mt-1 text-3xl font-bold text-gradient-primary-tr">
						{subscription.amountPaid == 5 ? "Standard" : subscription.amountPaid == 10 ? "Pro Plus" : ""}
						<span
							className="ml-2 text-lg cursor-pointer text-light-300 hover:text-light-600 transition duration-300"
							onClick={() => downloadInvoice(subscription)}
						>
							<i className="fa-solid fa-download"></i>
						</span>
					</p>
					<p className="text-light-400 text-sm mt-2">
						<span className="font-medium">Valid Until:</span>&nbsp;
						{new Date(subscription.subscriptionValidUntil).toDateString()}
					</p>
				</>
			) : (
				<>
					<p className="mt-1 text-3xl font-bold text-gradient-primary-tr">Free</p>
					<div className="mt-2">
						<Button
							type="button"
							variant={"primary"}
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
