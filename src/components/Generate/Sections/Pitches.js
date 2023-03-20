import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";

export default function Pitches({ isGenerating, setIsGenerating, promptEnterProjectInfo, projectInfo, cardsAvailable, setModalText, setContentModalOpen }) {
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
					cardText="Email Pitch to VC"
					handleCardClick={async (cardText) => {
						setIsGenerating("vcPitch");
						await callGenerateVCPitchEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "vcPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Pitch to Onboard Potential Co-Founder"
					handleCardClick={async (cardText) => {
						setIsGenerating("coFounderPitch");
						await callGenerateCoFounderPitchEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "coFounderPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Pitch to Onboard Potential Advisor (Marketing)"
					handleCardClick={async (cardText) => {
						setIsGenerating("marketingAdvisorPitch");
						await callGenerateMarketingAdvisorEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "marketingAdvisorPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Pitch to Get Yourself a Mentor"
					handleCardClick={async (cardText) => {
						setIsGenerating("mentorPitch");
						await callGenerateMentorPitch(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "mentorPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
			</div>
		</>
	);
}
