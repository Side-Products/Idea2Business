import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";
import SectionGrid from "../SectionGrid";
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
	sectionStyle,
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

	const callHowToBuildATeamEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "How to build a team for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/how-to-build-a-team", {
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

	const callProductRoadmapEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Product Roadmap for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/product-roadmap", {
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

	const callSocialMediaCalendarEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Social Media Calendar for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/social-media-calendar", {
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

	const callIdealCustomerProfileEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Ideal Customer Profile for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/bonus/ideal-customer-profile", {
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
			<SectionHeading sectionStyle={sectionStyle}>Bonus</SectionHeading>
			<SectionGrid>
				<PromptCard
					cardText={bonusContent[0].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[0].isGeneratingText);
						await callSPMEEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[0].isGeneratingText}
					subscriptionPlanRequired={bonusContent[0].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
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
					subscriptionPlanRequired={bonusContent[1].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[2].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[2].isGeneratingText);
						await callHowToBuildATeamEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[2].isGeneratingText}
					subscriptionPlanRequired={bonusContent[2].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[3].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[3].isGeneratingText);
						await callProductRoadmapEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[3].isGeneratingText}
					subscriptionPlanRequired={bonusContent[3].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[4].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[4].isGeneratingText);
						await callSocialMediaCalendarEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[4].isGeneratingText}
					subscriptionPlanRequired={bonusContent[4].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[5].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[5].isGeneratingText);
						await callIdealCustomerProfileEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[5].isGeneratingText}
					subscriptionPlanRequired={bonusContent[5].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[6].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[6].isGeneratingText);
						await callGrantEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[6].isGeneratingText}
					subscriptionPlanRequired={bonusContent[6].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={bonusContent[7].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(bonusContent[7].isGeneratingText);
						await callLegalAdviceEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === bonusContent[7].isGeneratingText}
					subscriptionPlanRequired={bonusContent[7].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
			</SectionGrid>
		</>
	);
}
