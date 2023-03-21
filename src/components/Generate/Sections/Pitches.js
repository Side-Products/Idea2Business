import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";
import { pitches } from "@/config/constants";

export default function Pitches({
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

	const callGenerateVCPitchEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "VC Pitch for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting VC Pitch Content from OpenAI
		const response = await fetch("/api/generate/pitches/vc-pitch", {
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

	const callGenerateCoFounderPitchEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Co-Founder pitch for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting Pitch to Co Founder Content from OpenAI
		const response = await fetch("/api/generate/pitches/co-founder-pitch", {
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

	const callGenerateMarketingAdvisorEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Pitch to Marketing Advisor for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting Pitch to Marketing Advisor Content from OpenAI
		const response = await fetch("/api/generate/pitches/marketing-advisor", {
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

	const callGenerateMentorPitch = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Pitch to Mentor for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting Pitch to Marketing Advisor Content from OpenAI
		const response = await fetch("/api/generate/pitches/mentor-pitch", {
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
			<SectionHeading>Pitches</SectionHeading>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<PromptCard
					cardText={pitches[0].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(pitches[0].isGeneratingText);
						await callGenerateCoFounderPitchEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === pitches[0].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={pitches[0].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={pitches[1].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(pitches[1].isGeneratingText);
						await callGenerateMentorPitch(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === pitches[1].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={pitches[1].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={pitches[2].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(pitches[2].isGeneratingText);
						await callGenerateVCPitchEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === pitches[2].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={pitches[2].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={pitches[3].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(pitches[3].isGeneratingText);
						await callGenerateMarketingAdvisorEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === pitches[3].isGeneratingText}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					subscriptionPlanRequired={pitches[3].subscriptionPlanRequired}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
			</div>
		</>
	);
}
