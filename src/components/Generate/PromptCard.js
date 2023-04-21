import { useState, useEffect, useContext } from "react";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { removeAllWhiteSpaces } from "@/utils/Helpers";
import { freePlan, standardPlan, proPlusPlan } from "@/config/constants";
import { getCurrentSubscriptionTier } from "@/utils/Helpers";

export default function PromptCard({
	cardsAvailable,
	handleCardClick,
	cardText,
	promptEnterIdeaInfo,
	subscriptionPlanRequired,
	setSubscriptionRequiredModalOpen,
	sectionStyle,
}) {
	// Subscription state
	const { subscription } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan = getCurrentSubscriptionTier(subscription);

	const { data: session, status } = useSession();
	const [canAccess, setCanAccess] = useState(false);
	useEffect(() => {
		if (session && session.user && (session.user.role == "admin" || session.user.role == "allAccess")) {
			setCanAccess(true);
		} else if (subscriptionPlan == proPlusPlan) {
			setCanAccess(true);
		} else if (subscriptionPlan == standardPlan && (subscriptionPlanRequired == standardPlan || subscriptionPlanRequired == freePlan)) {
			setCanAccess(true);
		} else if (subscriptionPlan == freePlan && subscriptionPlanRequired == freePlan) {
			setCanAccess(true);
		} else {
			setCanAccess(false);
		}
	}, [subscriptionPlan, subscription, session]);

	const { setAuthModalOpen } = useContext(AuthModalContext);
	const formSubmit = () => {
		if (status === "authenticated" && session && session.user) {
			if (!cardsAvailable) {
				promptEnterIdeaInfo();
				return;
			}
			if (cardsAvailable && !canAccess) {
				setSubscriptionRequiredModalOpen(true);
				return;
			}
			if (cardsAvailable && canAccess) {
				handleCardClick();
				return;
			}
		} else {
			setAuthModalOpen(true);
		}
	};

	// Radial gradient effect and tilt on prompt card
	useEffect(() => {
		const constrain = 80;

		function transforms(x, y, el) {
			let box = el.getBoundingClientRect();
			let calcX = (y - box.y - box.height / 2) / constrain;
			let calcY = -(x - box.x - box.width / 2) / constrain;

			return "perspective(200px) " + "   rotateX(" + calcX + "deg) " + "   rotateY(" + calcY + "deg) ";
		}

		function transformElement(el, x, y) {
			el.style.transform = transforms(x, y, el);
		}

		function transformElementReset(el) {
			el.style.transform = "";
		}

		const cards = document.getElementsByClassName("prompt-card");
		for (let i = 0; i < cards.length; i++) {
			cards[i].addEventListener("mousemove", (e) => {
				const rect = e.target.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				e.target.style.setProperty("--mouse-x", `${x}px`);
				e.target.style.setProperty("--mouse-y", `${y}px`);

				// Tilt effect
				window.requestAnimationFrame(function () {
					transformElement(cards[i], e.clientX, e.clientY);
				});
			});

			cards[i].addEventListener("mouseout", (e) => {
				window.requestAnimationFrame(function () {
					transformElementReset(cards[i]);
				});
			});
		}
	}, []);

	return (
		<form
			className={
				"w-full relative flex flex-col group cursor-pointer rounded-2xl h-[200px] overflow-hidden transition-all duration-400 " +
				"border border-[#30363d] bg-[#111317] " +
				"before:content-[''] before:absolute before:top-0 before:opacity-0 before:left-0 before:rounded-[inherit] before:h-full before:w-full before:z-[2] before:transition-opacity before:duration-200 hover:before:opacity-100 " +
				"prompt-card " +
				(sectionStyle == 1
					? "prompt-card-1"
					: sectionStyle == 2
					? "prompt-card-2"
					: sectionStyle == 3
					? "prompt-card-3"
					: sectionStyle == 4
					? "prompt-card-4"
					: sectionStyle == 5
					? "prompt-card-5"
					: sectionStyle == 6
					? "prompt-card-6"
					: sectionStyle == 7
					? "prompt-card-7"
					: sectionStyle == 8
					? "prompt-card-8"
					: "prompt-card-default")
			}
			onSubmit={(e) => {
				e.preventDefault();
				formSubmit();
			}}
			// Using id to regenerate response when button is clicked in the modal
			id={removeAllWhiteSpaces(cardText)}
			onClick={(e) => {
				e.preventDefault();
				formSubmit();
			}}
		>
			<div
				className={
					"relative w-full h-full flex flex-col justify-center items-center p-4 transition-all " +
					((!cardsAvailable || !canAccess) && "duration-400 group-hover:opacity-0")
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
				<div className="absolute bottom-3 flex space-x-2 px-4 py-1 justify-center items-center">
					<Button type="submit" variant={"default"} rounded={true} classes="text-xs px-4 py-1 gap-x-1">
						<i className="fa-solid fa-eye"></i>&nbsp;View
					</Button>
				</div>
			) : (
				<div className="absolute flex flex-col w-full h-full justify-center items-center transition-all duration-500 opacity-0 group-hover:opacity-100">
					<i className="fa-solid fa-lock text-4xl"></i>
					{!cardsAvailable ? (
						<p className="px-8 mt-2 text-xs text-center">Please enter idea details first</p>
					) : (
						<p className="px-8 mt-2 text-xs text-center">{subscriptionPlanRequired} subscription needed to access this</p>
					)}
				</div>
			)}
		</form>
	);
}
