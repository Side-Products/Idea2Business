import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";

export default function AdviceFromBooks({
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

	const callLeanStartupEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from the Lean Startup for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/leanstartup", {
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
			a.download = "AdviceFromLeanStartup.txt";
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

	const callHookedEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from Hooked for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/hooked", {
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
			a.download = "AdviceFromHooked.txt";
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

	const callHardThingsAboutHardThingsEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from The Hard Thing About Hard Things for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/the-hard-thing-about-hard-things", {
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
			a.download = "AdviceFromTheHardThing.txt";
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

	const callStartupOwnersManualEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Advice from The Startup Owner's Manual for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/startup-owners-manual", {
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
			a.download = "AdviceFromStartupOwnersManual.txt";
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
			<SectionHeading>Advice from Books</SectionHeading>

			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<PromptCard
					cardText="Advice from the book: The Lean Startup"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("leanStartup");
						await callLeanStartupEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "leanStartup"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Advice from the book: Hooked"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("hooked");
						await callHookedEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "hooked"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Advice from the book: The Hard Thing About Hard Things"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("hardThingAboutHardThings");
						await callHardThingsAboutHardThingsEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "hardThingAboutHardThings"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Advice from the book: The Startup Owner’s Manual"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("startupOwnersManual");
						await callStartupOwnersManualEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "startupOwnersManual"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
			</div>
		</>
	);
}
