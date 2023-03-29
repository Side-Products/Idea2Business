import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";
import SectionGrid from "../SectionGrid";
import { socialMediaStrategy } from "@/config/constants";

export default function SocialMediaStrategy({
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

	const callTwitterEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Twitter Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/social-media-strategy/twitter", {
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

	const callInstagramEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Instagram Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/social-media-strategy/instagram", {
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

	const callLinkedInEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "LinkedIn Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/social-media-strategy/linkedin", {
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

	const callTikTokEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "TikTok/Reels/Shorts Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/social-media-strategy/tiktok", {
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
			<SectionHeading sectionStyle={sectionStyle}>Social Media Strategy</SectionHeading>
			<SectionGrid>
				<PromptCard
					cardText={socialMediaStrategy[0].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(socialMediaStrategy[0].isGeneratingText);
						await callTwitterEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === socialMediaStrategy[0].isGeneratingText}
					subscriptionPlanRequired={socialMediaStrategy[0].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={socialMediaStrategy[1].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(socialMediaStrategy[1].isGeneratingText);
						await callInstagramEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === socialMediaStrategy[1].isGeneratingText}
					subscriptionPlanRequired={socialMediaStrategy[1].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={socialMediaStrategy[2].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(socialMediaStrategy[2].isGeneratingText);
						await callLinkedInEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === socialMediaStrategy[2].isGeneratingText}
					subscriptionPlanRequired={socialMediaStrategy[2].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
				<PromptCard
					cardText={socialMediaStrategy[3].cardText}
					handleCardClick={async (cardText) => {
						setIsGenerating(socialMediaStrategy[3].isGeneratingText);
						await callTikTokEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === socialMediaStrategy[3].isGeneratingText}
					subscriptionPlanRequired={socialMediaStrategy[3].subscriptionPlanRequired}
					sectionStyle={sectionStyle}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
					setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
				/>
			</SectionGrid>
		</>
	);
}
