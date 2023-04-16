import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Tick from "@/components/ui/Tick";
import Button from "@/components/ui/Button";
import getStripe from "@/utils/getStripe";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { StatusContext } from "@/store/StatusContextProvider";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { generateCategories, freePlan, standardPlan, proPlusPlan } from "@/config/constants";
import { getCurrentSubscriptionTier, getSubscriptionPlanName, getSubscriptionPlanPrice } from "@/utils/Helpers";

const Pricing = () => {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(StatusContext);
	const router = useRouter();

	const { subscription } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan = getCurrentSubscriptionTier(subscription);

	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);
	const buySubscription = async (_planChosen) => {
		if (status === "authenticated" && session && session.user) {
			setLoading({ status: true, title: "Please wait for a moment..." });

			const amount = _planChosen;
			try {
				// Get country from where user is accessing the website
				const ipData = await fetch("https://api.ipify.org?format=json")
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						return data;
					});
				const ipAddress = ipData?.ip;

				const link = `/api/stripe/checkout-session`;
				const { data } = await axios.get(link, { params: { amount: amount, ipAddress: ipAddress } });

				const stripe = await getStripe();

				// Redirect to Stripe Checkout
				await stripe.redirectToCheckout({ sessionId: data.id });
				setLoading({ status: false });
			} catch (error) {
				console.error("Error:", error);
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
			<div className="py-8 mx-auto max-w-screen-xl lg:py-16">
				<div className="mx-auto max-w-screen-md text-center">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-light-300">Made for driven people like you</h2>
					<p className="mb-5 font-light sm:text-xl text-gray-400">
						Everything you need to convert your idea into a profitable business.
						<br />
						Choose a plan that suits you. Grow business fast.
					</p>
				</div>

				<div className="mt-10 lg:mt-14 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
					<div className="flex flex-col justify-between  p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<div>
							<h3 className="mb-4 text-2xl font-semibold">{getSubscriptionPlanName(freePlan)}</h3>
							<p className="font-light sm:text-lg text-gray-400">Best option to get started and try things out.</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(freePlan)}</span>
								<span className="text-gray-400">forever</span>
							</div>

							<div className="mb-8 font-bold text-lg text-light-600">WHAT YOU CAN DO</div>

							<ul role="list" className="mb-8 space-y-4 text-left">
								{Object.keys(generateCategories).map((key, index) => {
									return generateCategories[key].map((item, idx) => {
										return (
											item.subscriptionPlanRequired == getSubscriptionPlanName(freePlan) && (
												<li className="flex items-center text-sm space-x-3" key={idx}>
													<Tick />
													<span>{item.cardText}</span>
												</li>
											)
										);
									});
								})}
							</ul>
						</div>

						{subscriptionPlan == getSubscriptionPlanName(freePlan) ? (
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

					<div className="flex flex-col justify-between p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<div>
							<h3 className="mb-4 text-2xl font-semibold">{getSubscriptionPlanName(standardPlan)}</h3>
							<p className="font-light sm:text-lg text-gray-400">Begin transforming your ideas into real-world products.</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(standardPlan)}</span>
								<span className="text-gray-400">for a week</span>
							</div>

							<div className="mb-8 font-bold text-lg text-light-600">ALL OF FREE PLUS</div>

							<ul role="list" className="mb-8 space-y-4 text-left">
								{Object.keys(generateCategories).map((key, index) => {
									return generateCategories[key].map((item, idx) => {
										return (
											item.subscriptionPlanRequired == getSubscriptionPlanName(standardPlan) && (
												<li className="flex items-center text-sm space-x-3" key={idx}>
													<Tick />
													<span>{item.cardText}</span>
												</li>
											)
										);
									});
								})}
							</ul>
						</div>

						{subscriptionPlan == getSubscriptionPlanName(standardPlan) ? (
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
						) : subscriptionPlan && subscriptionPlan == getSubscriptionPlanName(freePlan) ? (
							<Button
								type="button"
								variant={"primary"}
								onClick={() => {
									buySubscription(getSubscriptionPlanPrice(standardPlan));
								}}
								classes="text-lg px-8 py-3"
							>
								Choose Plan
							</Button>
						) : null}
					</div>

					<div className="flex flex-col justify-between p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<div>
							<h3 className="mb-4 text-2xl font-semibold">{getSubscriptionPlanName(proPlusPlan)}</h3>
							<p className="font-light sm:text-lg text-gray-400">Get all the power you need to build a profitable business.</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(proPlusPlan)}</span>
								<span className="text-gray-400">for a month</span>
							</div>

							<div className="mb-8 font-bold text-lg text-light-600">ALL OF STANDARD PLUS</div>

							<ul role="list" className="mb-8 space-y-4 text-left">
								{Object.keys(generateCategories).map((key, index) => {
									return generateCategories[key].map((item, idx) => {
										return (
											item.subscriptionPlanRequired == getSubscriptionPlanName(proPlusPlan) && (
												<li className="flex items-center text-sm space-x-3" key={idx}>
													<Tick />
													<span>{item.cardText}</span>
												</li>
											)
										);
									});
								})}
							</ul>
						</div>

						{subscriptionPlan == getSubscriptionPlanName(proPlusPlan) ? (
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
									buySubscription(getSubscriptionPlanPrice(proPlusPlan));
								}}
								classes="text-lg px-8 py-3"
							>
								Choose Plan
							</Button>
						)}
					</div>
				</div>

				<p className="text-center mt-16 text-light-500">
					One-time payment. No subscription. Clicking the buy button will redirect you to a secure Stripe hosted checkout page.
				</p>
			</div>
		</section>
	);
};

export default Pricing;
