import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";

export default function Pitches({ isGenerating, setIsGenerating, promptEnterProjectInfo, projectInfo, cardsAvailable, setModalText, setContentModalOpen }) {
	const { projectName, projectDescription } = projectInfo;
	const [, setLoading] = useContext(LoadingContext);

	const callGenerateVCPitchEndpoint = async (choice, cardText) => {
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
		let vcOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([vcOutputArray], { type: "text/plain" }));
			a.download = "EmailPitchToVC.txt";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else if (choice === "view") {
			setModalText({ heading: cardText, content: output.text });
			setContentModalOpen(true);
		}
		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	const callGenerateCoFounderPitchEndpoint = async (choice, cardText) => {
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
		let cofounderOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([cofounderOutputArray], { type: "text/plain" }));
			a.download = "PitchToCoFounder.txt";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else if (choice === "view") {
			setModalText({ heading: cardText, content: output.text });
			setContentModalOpen(true);
		}
		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	const callGenerateMarketingAdvisorEndpoint = async (choice, cardText) => {
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
		let marketingAdvisorOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([marketingAdvisorOutputArray], { type: "text/plain" }));
			a.download = "PitchToMarketingAdvisor.txt";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else if (choice === "view") {
			setModalText({ heading: cardText, content: output.text });
			setContentModalOpen(true);
		}
		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	const callGenerateMentorPitch = async (choice, cardText) => {
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
		let mentorpitchOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([mentorpitchOutputArray], { type: "text/plain" }));
			a.download = "MentorPitch.txt";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else if (choice === "view") {
			setModalText({ heading: cardText, content: output.text });
			setContentModalOpen(true);
		}
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
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("vcPitch");
						await callGenerateVCPitchEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "vcPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Pitch to Onboard Potential Co-Founder"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("coFounderPitch");
						await callGenerateCoFounderPitchEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "coFounderPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Pitch to Onboard Potential Advisor (Marketing)"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("marketingAdvisorPitch");
						await callGenerateMarketingAdvisorEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "marketingAdvisorPitch"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Pitch to Get Yourself a Mentor"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("mentorPitch");
						await callGenerateMentorPitch(choice, cardText);
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
