import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";

export default function SocialMediaStrategy({
	isGenerating,
	setIsGenerating,
	promptEnterProjectInfo,
	projectInfo,
	cardsAvailable,
	setModalText,
	setContentModalOpen,
}) {
	const { projectName, projectDescription } = projectInfo;
	const [, setLoading] = useContext(LoadingContext);

	const callTwitterEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Twitter Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/twitter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;
		let userCusOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
			a.download = "TwitterStrategy.txt";
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

	const callInstagramEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Instagram Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/instagram", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;
		let userCusOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
			a.download = "InstagramStrategy.txt";
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

	const callLinkedInEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "LinkedIn Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/linkedin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;
		let userCusOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
			a.download = "LinkedInStrategy.txt";
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

	const callTikTokEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "TikTok/Reels/Shorts Strategy for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/tiktok", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
		});
		const data = await response.json();
		const { output } = data;
		let userCusOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
			a.download = "TikTokStrategy.txt";
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
			<SectionHeading>Social Media Strategy</SectionHeading>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<PromptCard
					cardText="Twitter Strategy"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("twitterStrategy");
						await callTwitterEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "twitterStrategy"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Instagram Strategy"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("instagramStrategy");
						await callInstagramEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "instagramStrategy"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="LinkedIn Strategy"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("linkedinStrategy");
						await callLinkedInEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "linkedinStrategy"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="TikTok/Reels/Shorts Strategy"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("tiktokStrategy");
						await callTikTokEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "tiktokStrategy"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
			</div>
		</>
	);
}
