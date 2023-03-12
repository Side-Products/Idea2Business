import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";

export default function BonusContent({
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

	const callSPMEEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "SPME for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/spme", {
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
			a.download = "SPMEforSolopreneurs.txt";
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

	const callMVPEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "MVP Launch checklist for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/mvp", {
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
			a.download = "MVPLaunchChecklist.txt";
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

	const callGrantEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Grant Proposal for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/grant", {
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
			a.download = "GrantProposal.txt";
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

	const callLegalAdviceEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Legal Advice for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/legal-advice", {
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
			a.download = "LegalAdvice.txt";
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
			<SectionHeading>Bonus</SectionHeading>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<PromptCard
					cardText="SPME (Strategy, Positioning, Messaging, Experimentations): Marketing for solopreneurs"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("spme");
						await callSPMEEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "spme"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="MVP Launch Checklist"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("mvpLaunchChecklist");
						await callMVPEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "mvpLaunchChecklist"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Grant Proposal"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("grantProposal");
						await callGrantEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "grantProposal"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Legal Advice"
					handleCardClick={async (choice, cardText) => {
						setIsGenerating("legalAdvice");
						await callLegalAdviceEndpoint(choice, cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "legalAdvice"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
			</div>
		</>
	);
}
