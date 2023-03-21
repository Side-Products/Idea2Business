import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";
import { bonusContent } from "@/config/constants";

export default function BonusContent({
	isGenerating,
	setIsGenerating,
	promptEnterProjectInfo,
	projectInfo,
	cardsAvailable,
	setModalText,
	setContentModalOpen,
	setSubscriptionRequiredModalOpen,
}) {
	const { projectName, projectDescription } = projectInfo;
	const [, setLoading] = useContext(LoadingContext);

	const callSPMEEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "SPME for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/spme", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;

		setModalText({ heading: cardText, content: output.text });
		setContentModalOpen(true);

		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	const callMVPEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "MVP Launch checklist for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/mvp-launch-checklist", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;

		setModalText({ heading: cardText, content: output.text });
		setContentModalOpen(true);

		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	const callGrantEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Grant Proposal for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/grant-proposal", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;

		setModalText({ heading: cardText, content: output.text });
		setContentModalOpen(true);

		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	const callLegalAdviceEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Legal Advice for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/legal-advice", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;

		setModalText({ heading: cardText, content: output.text });
		setContentModalOpen(true);

		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	return (
		<>
			<SectionHeading>Bonus</SectionHeading>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<PromptCard
					cardText={bonusContent[0].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[0].isGeneratingText);
						await callSPMEEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[0].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={bonusContent[0].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[1].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[1].isGeneratingText);
						await callMVPEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[1].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={bonusContent[1].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[2].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[2].isGeneratingText);
						await callGrantEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[2].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={bonusContent[2].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[3].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[3].isGeneratingText);
						await callLegalAdviceEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[3].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={bonusContent[3].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
			</div>
		</>
	);
}
