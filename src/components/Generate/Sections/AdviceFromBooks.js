import { useContext } from "react";
import { LoadingContext } from "@/store/LoadingContextProvider";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";
import SectionGrid from "../SectionGrid";
import { adviceFromBooks } from "@/config/constants";

export default function AdviceFromBooks({
	isGenerating,
	setIsGenerating,
	promptEnterIdeaInfo,
	ideaInfo,
	cardsAvailable,
	setModalText,
	setContentModalOpen,
	setSubscriptionRequiredModalOpen,
	sectionStyle,
}) {
	const { ideaName, ideaDescription } = ideaInfo;
	const { setLoading } = useContext(LoadingContext);

	const callLeanStartupEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from The Lean Startup for your idea is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/advice-from-books/the-lean-startup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${ideaName}: ${ideaDescription}` }),
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

	const callHookedEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from Hooked for your idea is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/advice-from-books/hooked", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${ideaName}: ${ideaDescription}` }),
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

	const callHardThingsAboutHardThingsEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from The Hard Thing About Hard Things for your idea is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/advice-from-books/the-hard-thing-about-hard-things", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${ideaName}: ${ideaDescription}` }),
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

	const callStartupOwnersManualEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from The Startup Owner's Manual for your idea is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/advice-from-books/startup-owners-manual", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${ideaName}: ${ideaDescription}` }),
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
			<SectionHeading sectionStyle={sectionStyle}>Advice from Books</SectionHeading>
			<SectionGrid>
				<PromptCard
					cardText={adviceFromBooks[0].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(adviceFromBooks[0].isGeneratingText);
						await callLeanStartupEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === adviceFromBooks[0].isGeneratingText}
					subscriptionPlanRequired={adviceFromBooks[0].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={adviceFromBooks[1].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(adviceFromBooks[1].isGeneratingText);
						await callHookedEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === adviceFromBooks[1].isGeneratingText}
					subscriptionPlanRequired={adviceFromBooks[1].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={adviceFromBooks[2].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(adviceFromBooks[2].isGeneratingText);
						await callHardThingsAboutHardThingsEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === adviceFromBooks[2].isGeneratingText}
					subscriptionPlanRequired={adviceFromBooks[2].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={adviceFromBooks[3].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(adviceFromBooks[3].isGeneratingText);
						await callStartupOwnersManualEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === adviceFromBooks[3].isGeneratingText}
					subscriptionPlanRequired={adviceFromBooks[3].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
			</SectionGrid>
		</>
	);
}
