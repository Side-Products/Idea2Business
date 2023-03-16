import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Tick from "./Tick";
import Button from "@/components/ui/Button";
import getStripe from "@/utils/getStripe";
import LoadingContext from "@/store/loading-context";
import StatusContext from "@/store/status-context";
import AuthModalContext from "@/store/authModal-context";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Pricing = () => {
	const [, setLoading] = useContext(LoadingContext);
	const [, , , setError] = useContext(StatusContext);
	const router = useRouter();

	const { subscription } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan =
		subscription && subscription.amountPaid == 10 && new Date(subscription.subscriptionValidUntil) > Date.now()
			? "Pro Plus"
			: subscription && subscription.amountPaid == 5 && new Date(subscription.subscriptionValidUntil) > Date.now()
			? "Standard"
			: "Free";

	const { data: session, status } = useSession();
	const [, setAuthModalOpen] = useContext(AuthModalContext);
	const buySubscription = async (_planChosen) => {
		if (status === "authenticated" && session && session.user) {
			setLoading({ status: true });

			const amount = _planChosen;
			try {
				const link = `/api/stripe/checkout-session`;
				const { data } = await axios.get(link, { params: { amount: amount } });

				const stripe = await getStripe();

				// Redirect to Stripe Checkout
				await stripe.redirectToCheckout({ sessionId: data.id });
				setLoading({ status: false });
			} catch (error) {
				setLoading({ status: false });
				setError({
					title: "Something went wrong",
					message: error.message,
					showErrorBox: true,
				});
			}
		} else {
			setAuthModalOpen(true);
		}
	};

	return (
		<section>
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-light-300">Made for driven people like you</h2>
					<p className="mb-5 font-light sm:text-xl text-gray-400">
						Everything you need to convert your side-project into a profitable product.
						<br />
						Choose a plan that suits you. Grow business fast.
					</p>
				</div>

				<div className="mt-10 lg:mt-14 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
					<div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<h3 className="mb-4 text-2xl font-semibold">Free</h3>
						<p className="font-light sm:text-lg text-gray-400">Best option for personal use & for your next project.</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">$0</span>
							<span className="text-gray-400">/month</span>
						</div>

						<div className="mb-8 font-bold text-lg text-light-600">WHAT YOU CAN DO</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<Tick />
								<span>Individual configuration</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>No setup, or hidden fees</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Team size: <span className="font-semibold">1 developer</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Premium support: <span className="font-semibold">6 months</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Free updates: <span className="font-semibold">6 months</span>
								</span>
							</li>
						</ul>

						{subscriptionPlan == "Free" ? (
							<Button
								type="button"
								variant={"secondary"}
								onClick={() => {
									router.push("/generate");
								}}
								classes="text-lg px-8 py-3"
							>
								Get Started Now
							</Button>
						) : null}
					</div>

					<div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<h3 className="mb-4 text-2xl font-semibold">Standard</h3>
						<p className="font-light sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">$5</span>
							<span className="dark:text-gray-400">/week</span>
						</div>

						<div className="mb-8 font-bold text-lg text-light-600">ALL OF FREE PLUS</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<Tick />
								<span>Individual configuration</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>No setup, or hidden fees</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Team size: <span className="font-semibold">10 developers</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Premium support: <span className="font-semibold">24 months</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Free updates: <span className="font-semibold">24 months</span>
								</span>
							</li>
						</ul>

						{subscriptionPlan == "Standard" ? (
							<Button
								type="button"
								variant={"secondary"}
								onClick={() => {
									router.push("/generate");
								}}
								classes="text-lg px-8 py-3"
							>
								Current Plan
							</Button>
						) : subscriptionPlan && subscriptionPlan === "Free" ? (
							<Button
								type="button"
								variant={"primary"}
								onClick={() => {
									buySubscription(5);
								}}
								classes="text-lg px-8 py-3"
							>
								Choose Plan
							</Button>
						) : null}
					</div>

					<div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<h3 className="mb-4 text-2xl font-semibold">Pro Plus</h3>
						<p className="font-light sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">$10</span>
							<span className="dark:text-gray-400">/month</span>
						</div>

						<div className="mb-8 font-bold text-lg text-light-600">ALL OF STANDARD PLUS</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<Tick />
								<span>Individual configuration</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>No setup, or hidden fees</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Team size: <span className="font-semibold">100+ developers</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Premium support: <span className="font-semibold">36 months</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Free updates: <span className="font-semibold">36 months</span>
								</span>
							</li>
						</ul>

						{subscriptionPlan == "Pro Plus" ? (
							<Button
								type="button"
								variant={"secondary"}
								onClick={() => {
									router.push("/generate");
								}}
								classes="text-lg px-8 py-3"
							>
								Current Plan
							</Button>
						) : (
							<Button
								type="button"
								variant={"primary"}
								onClick={() => {
									buySubscription(10);
								}}
								classes="text-lg px-8 py-3"
							>
								Choose Plan
							</Button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
