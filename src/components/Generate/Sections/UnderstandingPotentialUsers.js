import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import PromptCard from "../PromptCard";
import SectionHeading from "../SectionHeading";

export default function UnderstandingPotentialUsers({
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

	const callGenerateUserPersonaEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "User Personas for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});

		const response = await fetch("/api/generate/potential-users/user-persona", {
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

	const callGenerateMomTestEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Mom Test for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting Mom Test Content from OpenAI
		const response = await fetch("/api/generate/potential-users/mom-test", {
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

	const callGeneratePotentialCustomerEndpoint = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "List of Potential Customers for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/potential-users/type-of-potential-customers", {
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

	const callGenerateCustomerPainPoints = async (cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "List of Customer Pain Points for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/generate/potential-users/customer-pain-points", {
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
			<SectionHeading>Understanding Potential Users</SectionHeading>
			<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<PromptCard
					cardText="User Persona"
					handleCardClick={async (cardText) => {
						setIsGenerating("userPersona");
						await callGenerateUserPersonaEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "userPersona"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Mom Test: How to talk to initial customers"
					handleCardClick={async (cardText) => {
						setIsGenerating("momTest");
						await callGenerateMomTestEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "momTest"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Type of Potential Customers"
					handleCardClick={async (cardText) => {
						setIsGenerating("potentialCustomers");
						await callGeneratePotentialCustomerEndpoint(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "potentialCustomers"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
				<PromptCard
					cardText="Customer Pain Points"
					handleCardClick={async (cardText) => {
						setIsGenerating("customerPainPoints");
						await callGenerateCustomerPainPoints(cardText);
						setIsGenerating(false);
					}}
					isLoading={isGenerating === "customerPainPoints"}
					cardsAvailable={cardsAvailable}
					promptEnterProjectInfo={promptEnterProjectInfo}
				/>
			</div>
		</>
	);
}
