import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";

export default function PromptCard({
	cardsAvailable,
	handleCardClick,
	cardText,
	promptEnterProjectInfo,
	subscriptionPlanRequired,
	setSubscriptionRequiredModalOpen,
}) {
	// Subscription state
	const { subscription } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan =
		subscription && subscription.amountPaid == 10 && new Date(subscription.subscriptionValidUntil) > Date.now()
			? "Pro Plus"
			: subscription && subscription.amountPaid == 5 && new Date(subscription.subscriptionValidUntil) > Date.now()
			? "Standard"
			: "Free";

	const [canAccess, setCanAccess] = useState(false);
	useEffect(() => {
		if (subscriptionPlan == "Pro Plus") {
			setCanAccess(true);
		} else if (subscriptionPlan == "Standard" && subscriptionPlanRequired == "Standard") {
			setCanAccess(true);
		} else if (subscriptionPlan == "Free" && subscriptionPlanRequired == "Free") {
			setCanAccess(true);
		} else {
			setCanAccess(false);
		}
	}, [subscriptionPlan, subscription]);

	const formSubmit = () => {
		if (!cardsAvailable) {
			promptEnterProjectInfo();
			return;
		}
		if (cardsAvailable && !canAccess) {
			setSubscriptionRequiredModalOpen(true);
			return;
		}
		if (cardsAvailable && canAccess) {
			handleCardClick(cardText);
			return;
		}
	};

	return (
		<form
			className="w-full relative flex flex-col group cursor-pointer aspect-square rounded-2xl h-fit sm:h-full bg-gradient-to-r from-[#161616] to-[#202020] shadow hover:shadow-primary-400 overflow-hidden transition-all duration-500"
			onSubmit={(e) => {
				e.preventDefault();
				formSubmit();
			}}
			onClick={(e) => {
				e.preventDefault();
				formSubmit();
			}}
		>
			<div
				className={
					"relative w-full h-full flex flex-col justify-center items-center p-4 transition-all " +
					((!cardsAvailable || !canAccess) && "duration-500 group-hover:opacity-0")
				}
			>
				<h3 className="font-secondary font-medium text-[16px] text-center">{cardText}</h3>
				{(!cardsAvailable || !canAccess) && (
					<span className="absolute bottom-3 right-4">
						<i className="fa-solid fa-lock"></i>
					</span>
				)}
			</div>

			{cardsAvailable && canAccess ? (
				<div className="w-full absolute bottom-4 flex space-x-2 px-4 py-1 justify-center items-center">
					<Button type="submit" variant={"primary"} rounded={true} classes="text-xs px-1 py-1 gap-x-1">
						<i className="fa-solid fa-eye"></i>&nbsp;View
					</Button>
				</div>
			) : (
				<div className="absolute flex flex-col w-full h-full justify-center items-center transition-all duration-700 opacity-0 group-hover:opacity-100">
					<i className="fa-solid fa-lock text-4xl"></i>
					{!cardsAvailable ? (
						<p className="px-8 mt-2 text-xs text-center">Please enter project details first</p>
					) : (
						<p className="px-8 mt-2 text-xs text-center">{subscriptionPlanRequired} subscription needed to access this</p>
					)}
				</div>
			)}
		</form>
	);
}
