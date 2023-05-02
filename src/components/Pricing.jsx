import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Tick from "@/components/ui/Tick";
import Button from "@/components/ui/Button";
import getStripe from "@/utils/getStripe";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { StatusContext } from "@/store/StatusContextProvider";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import SelectCountryModal from "@/components/SelectCountryModal";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { generateCategories, freePlan, proPlan, premiumPlan } from "@/config/constants";
import {
	getCurrentSubscriptionTier,
	getSubscriptionPlanName,
	getSubscriptionPlanPrice,
	getSubscriptionPlanPriceId,
	getSubscriptionPlanCredits,
} from "@/utils/Helpers";
import Pill from "@/components/ui/Pill";

const Pricing = () => {
	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(StatusContext);
	const router = useRouter();

	const { subscription } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan = getCurrentSubscriptionTier(subscription);

	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);

	const buySubscription = async (stripePriceId) => {
		if (status === "authenticated" && session && session.user) {
			await redirectToCheckout(stripePriceId);
		} else {
			setAuthModalOpen(true);
		}
	};

	const redirectToCheckout = async (stripePriceId) => {
		if (status === "authenticated" && session && session.user) {
			setLoading({ status: true, title: "Please wait for a moment..." });

			try {
				const link = `/api/stripe/checkout-session`;
				const { data } = await axios.get(link, { params: { stripePriceId: stripePriceId } });
				const stripe = await getStripe();
				// Redirect to Stripe Checkout
				await stripe.redirectToCheckout({ sessionId: data.id });
				setLoading({ status: false });
			} catch (error) {
				console.error("Checkout error:", error);
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
			<div className="py-8 mx-auto max-w-screen-xl lg:py-10">
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
							<div className="flex justify-center items-baseline mt-8">
								<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(freePlan)}</span>
								<span className="text-gray-400">forever</span>
							</div>
							<p className="text-gray-400 mt-1">You get {getSubscriptionPlanCredits(freePlan)} free credits</p>

							<div className="my-8 font-bold text-lg text-light-600">WHAT YOU CAN DO</div>

							<ul role="list" className="mb-8 space-y-4 text-left">
								{Object.keys(generateCategories).map((key, index) => {
									return generateCategories[key].map((item, idx) => {
										return (
											!item.hidden &&
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
							<h3 className="mb-4 text-2xl font-semibold">
								<i className="fa-solid fa-crown text-gradient-pricing-standard mr-2"></i>
								{getSubscriptionPlanName(proPlan)}
							</h3>
							<p className="font-light sm:text-lg text-gray-400">Begin transforming your ideas into real-world products.</p>
							<div className="flex justify-center items-baseline mt-8">
								<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(proPlan)}</span>
								<span className="text-gray-400">for a week</span>
							</div>
							<p className="text-gray-400 mt-1">You get {getSubscriptionPlanCredits(proPlan)} credits</p>

							<div className="my-8 font-bold text-lg text-light-600">ALL OF FREE PLUS</div>

							<ul role="list" className="mb-8 space-y-4 text-left">
								{Object.keys(generateCategories).map((key, index) => {
									return generateCategories[key].map((item, idx) => {
										return (
											!item.hidden &&
											item.subscriptionPlanRequired == getSubscriptionPlanName(proPlan) && (
												<li className="flex items-center text-sm space-x-3" key={idx}>
													<Tick />
													<span>
														{item.cardText}
														<HotPill item={item} itemsArr={["Email Pitch to VC", "Value Proposition"]} />
													</span>
												</li>
											)
										);
									});
								})}
							</ul>
						</div>

						{subscriptionPlan == getSubscriptionPlanName(proPlan) ? (
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
									buySubscription(getSubscriptionPlanPriceId(proPlan));
								}}
								classes="text-lg px-8 py-3"
							>
								Choose Plan
							</Button>
						) : null}
					</div>

					<div className="flex flex-col justify-between p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<div className="relative">
							<Pill variant={"tertiary"} classes={"absolute -top-5 -right-6 text-xs"} rounded={true}>
								Most Popular
							</Pill>
							<h3 className="mb-4 text-2xl font-semibold">
								<i className="fa-solid fa-crown text-gradient-pricing-pro mr-2"></i>
								{getSubscriptionPlanName(premiumPlan)}
							</h3>
							<p className="font-light sm:text-lg text-gray-400">Get all the power you need to build a profitable business.</p>
							<div className="flex justify-center items-baseline mt-8">
								<span className="mr-2 text-5xl font-extrabold">${getSubscriptionPlanPrice(premiumPlan)}</span>
								<span className="text-gray-400">for a month</span>
							</div>
							<p className="text-gray-400 mt-1">You get {getSubscriptionPlanCredits(premiumPlan)} credits</p>

							<div className="my-8 font-bold text-lg text-light-600">ALL OF PRO PLUS</div>

							<ul role="list" className="mb-8 space-y-4 text-left">
								{Object.keys(generateCategories).map((key, index) => {
									return generateCategories[key].map((item, idx) => {
										return (
											!item.hidden &&
											item.subscriptionPlanRequired == getSubscriptionPlanName(premiumPlan) && (
												<li className="flex items-center text-sm space-x-3" key={idx}>
													<Tick />
													<span>
														{item.cardText}
														<HotPill
															item={item}
															itemsArr={[
																"Download PitchDeck",
																"Customer Pain Points",
																"Guide to launch on Product Hunt",
																"Grant Proposal",
															]}
														/>
													</span>
												</li>
											)
										);
									});
								})}
							</ul>
						</div>

						{subscriptionPlan == getSubscriptionPlanName(premiumPlan) ? (
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
									buySubscription(getSubscriptionPlanPriceId(premiumPlan));
								}}
								classes="text-lg px-8 py-3"
							>
								Choose Plan
							</Button>
						)}
					</div>
				</div>

				<p className="text-center mt-16 text-light-500">
					Clicking the &apos;Choose Plan&apos; button will redirect you to a secure Stripe hosted checkout page.
				</p>
			</div>
		</section>
	);
};

export default Pricing;

const HotPill = ({ item, itemsArr }) => {
	return (
		itemsArr.includes(item.cardText) && (
			<Pill variant={"secondary"} classes={"text-xs py-[3px] ml-2"} rounded={true}>
				<i className="fa-solid fa-fire mr-1"></i>Hot
			</Pill>
		)
	);
};
