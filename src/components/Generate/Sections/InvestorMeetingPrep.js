import { useContext } from "react";
import { LoadingContext } from "@/store/LoadingContextProvider";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";
import SectionGrid from "../SectionGrid";
import { investorMeetingPrep } from "@/config/constants";

export default function InvestorMeetingPrep({
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

	const callExpectedInvestorQuestionsEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Expected Investor Questions for your idea are being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/investor-meeting-prep/expected-investor-questions", {
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

	const callTipsAndTricksToNailYourPitchEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Tips & Tricks to nail the pitch for your idea are being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/investor-meeting-prep/tips-and-tricks-to-nail-your-pitch", {
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

	const callRevenueModelEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Revenue Model for your idea is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/investor-meeting-prep/revenue-model", {
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

	const callExitStrategyEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Exit Strategy for your idea is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/investor-meeting-prep/exit-strategy", {
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
			<SectionHeading sectionStyle={sectionStyle}>Investor Meeting Prep</SectionHeading>
			<SectionGrid>
				<PromptCard
					cardText={investorMeetingPrep[0].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(investorMeetingPrep[0].isGeneratingText);
						await callExpectedInvestorQuestionsEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === investorMeetingPrep[0].isGeneratingText}
					subscriptionPlanRequired={investorMeetingPrep[0].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={investorMeetingPrep[1].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(investorMeetingPrep[1].isGeneratingText);
						await callTipsAndTricksToNailYourPitchEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === investorMeetingPrep[1].isGeneratingText}
					subscriptionPlanRequired={investorMeetingPrep[1].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={investorMeetingPrep[2].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(investorMeetingPrep[2].isGeneratingText);
						await callRevenueModelEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === investorMeetingPrep[2].isGeneratingText}
					subscriptionPlanRequired={investorMeetingPrep[2].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={investorMeetingPrep[3].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(investorMeetingPrep[3].isGeneratingText);
						await callExitStrategyEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === investorMeetingPrep[3].isGeneratingText}
					subscriptionPlanRequired={investorMeetingPrep[3].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterIdeaInfo={promptEnterIdeaInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
			</SectionGrid>
		</>
	);
}
