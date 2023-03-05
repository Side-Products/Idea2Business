import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import pptxgen from "pptxgenjs";
import redBG from "../../public/themes/redbg";
import { useSession } from "next-auth/react";
import { create } from "ipfs-http-client";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dynamic from "next/dynamic";
const ContentModal = dynamic(() => import("@/components/ContentModal"));
import PromptCard from "@/components/PromptCard";
import { title_main_page, meta_description } from "@/config/constants";
import Button from "@/components/ui/Button";
import StatusContext from "@/store/status-context";
import LoadingContext from "@/store/loading-context";
import AuthModalContext from "@/store/authModal-context";
import { sleep } from "@/utils/Sleep";

const Home = () => {
	const { data: session, status } = useSession();

	const [, , , setError] = useContext(StatusContext);
	const [, setLoading] = useContext(LoadingContext);
	const [, setAuthModalOpen] = useContext(AuthModalContext);

	const [userInput, setUserInput] = useState("");
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [apiOutput, setApiOutput] = useState(false);
	const [modalText, setModalText] = useState({ heading: "", content: "" });
	const [isContentModalOpen, setContentModalOpen] = useState(false);

	const [isGenerating, setIsGenerating] = useState(false);
	const [cardsAvailable, setCardsAvailable] = useState(false);

	// IPFS Initialize
	const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
	const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
	const auth = `Basic ` + Buffer.from(projectId + `:` + projectSecret).toString(`base64`);
	const ipfs = create({
		host: `ipfs.infura.io`,
		port: 5001,
		protocol: `https`,
		headers: {
			authorization: auth,
		},
	});
	const [ipfsUrl, setIpfsUrl] = useState("");

	// Config variables
	const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
	const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
	const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
	const GOOGLE_SERVICE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

	// GoogleSpreadsheet Initialize
	const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

	// Append Function
	const appendSpreadsheet = async (row) => {
		try {
			await doc.useServiceAccountAuth({
				client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
				private_key: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
			});
			// loads document properties and worksheets
			await doc.loadInfo();

			const sheet = doc.sheetsById[SHEET_ID];
			await sheet.addRow(row);
		} catch (e) {
			console.error("Error: ", e);
		}
	};

	const callGenerateEndpoint = async () => {
		if (productName.length > 0 && productDescription.length > 0) {
			// Getting pitch deck content from OpenAI
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userInput }),
			});
			const data = await response.json();
			const { output } = data;
			let outputArray = output.text.split(/\r?\n/);
			setApiOutput([...outputArray]);

			return outputArray;
		} else {
			promptEnterProjectInfo();
		}
	};

	const callGenerateMomTestEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "Mom Test for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting Mom Test Content from OpenAI
		const response = await fetch("/api/momtest", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		const data = await response.json();
		const { output } = data;
		let momTestOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([momTestOutputArray], { type: "text/plain" }));
			a.download = "MomTest.txt";
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

	const callGenerateVCPitchEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "VC Pitch for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		// Getting VC Pitch Content from OpenAI
		const response = await fetch("/api/vcpitch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
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
		const response = await fetch("/api/cofounderpitch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
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
		const response = await fetch("/api/marketingadvisor", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
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
		const response = await fetch("/api/mentorpitch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
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

	const callGenerateUserPersonaEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "User Personas for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/userpersona", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		const data = await response.json();
		const { output } = data;
		let userPersonaOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([userPersonaOutputArray], { type: "text/plain" }));
			a.download = "UserPersona.txt";
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

	const callGeneratePotentialCustomerEndpoint = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "List of Potential Customers for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/potentialcustomer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		const data = await response.json();
		const { output } = data;
		let userCusOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
			a.download = "PotentialCustomer.txt";
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

	const callGenerateCustomerPainPoints = async (choice, cardText) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: "List of Customer Pain Points for your project is being generated",
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});
		const response = await fetch("/api/customer-pain-points", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		const data = await response.json();
		const { output } = data;
		let painPointsOutputArray = output.text;

		if (choice === "download") {
			// Downloading a text file
			var a = window.document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([painPointsOutputArray], { type: "text/plain" }));
			a.download = "CustomerPainPoints.txt";
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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
			body: JSON.stringify({ userInput }),
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

	const onUserChangedProductName = (event) => {
		setProductName(event.target.value);
		setUserInput(event.target.value + ": " + productDescription);
	};

	const onUserChangedProductDescription = (event) => {
		setProductDescription(event.target.value);
		setUserInput(productName + ": " + event.target.value);
	};

	async function generatePitchdeck(apiOutput, method) {
		// Initialization
		let pptx = new pptxgen();

		// Layout of the whole slide
		pptx.layout = "LAYOUT_16x9";

		// // -----------------------------------------------------------------------------------
		// // SLIDE: 1
		// // -----------------------------------------------------------------------------------

		let slide1 = pptx.addSlide();
		// slide1.background = { data: redBG };
		slide1.addText([{ text: apiOutput[1], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 2
		// -----------------------------------------------------------------------------------

		let slide2 = pptx.addSlide();
		// slide2.background = { data: redBG };
		slide2.addText([{ text: apiOutput[3], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 3
		// -----------------------------------------------------------------------------------

		let slide3 = pptx.addSlide();
		// slide3.background = { data: redBG };
		slide3.addText([{ text: apiOutput[5], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 4
		// -----------------------------------------------------------------------------------

		let slide4 = pptx.addSlide();
		// slide4.background = { data: redBG };

		slide4.addText([{ text: apiOutput[7], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 5
		// -----------------------------------------------------------------------------------

		let slide5 = pptx.addSlide();
		// slide5.background = { data: redBG };

		slide5.addText([{ text: apiOutput[9], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 6
		// -----------------------------------------------------------------------------------

		let slide6 = pptx.addSlide();
		// slide6.background = { data: redBG };

		slide6.addText([{ text: apiOutput[11], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 7
		// -----------------------------------------------------------------------------------

		let slide7 = pptx.addSlide();
		// slide7.background = { data: redBG };

		slide7.addText([{ text: apiOutput[13], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 8
		// -----------------------------------------------------------------------------------

		let slide8 = pptx.addSlide();
		// slide8.background = { data: redBG };

		slide8.addText([{ text: apiOutput[15], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 9
		// -----------------------------------------------------------------------------------

		let slide9 = pptx.addSlide();
		// slide9.background = { data: redBG };

		slide9.addText([{ text: apiOutput[17], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 10
		// -----------------------------------------------------------------------------------

		let slide10 = pptx.addSlide();
		// slide10.background = { data: redBG };

		slide10.addText([{ text: apiOutput[19], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 11
		// -----------------------------------------------------------------------------------

		let slide11 = pptx.addSlide();
		// slide11.background = { data: redBG };

		slide11.addText([{ text: apiOutput[21], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 12
		// -----------------------------------------------------------------------------------

		let slide12 = pptx.addSlide();
		// slide12.background = { data: redBG };

		slide12.addText([{ text: apiOutput[23], options: { fontSize: 16, breakLine: true } }], {
			x: 0.7,
			y: 2.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		if (method == "getLink") {
			const _file = await pptx.stream();
			const ipfsFile = await ipfs.add(_file);

			setIpfsUrl("https://project2product.infura-ipfs.io/ipfs/" + ipfsFile.path);
			console.log("https://project2product.infura-ipfs.io/ipfs/" + ipfsFile.path);
		} else {
			pptx.writeFile({ fileName: "Project2Product.pptx" });
		}
	}

	useEffect(() => {
		if (cardsAvailable) {
			const cardContainer = document.getElementById("cardContainer");
			cardContainer.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	}, [cardsAvailable]);

	const promptEnterProjectInfo = () => {
		setError({
			title: "Missing information",
			message: "Please enter project name and description first",
			showErrorBox: true,
		});
		const projectInfoContainer = document.getElementById("projectInfo");
		projectInfoContainer.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	};

	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="flex justify-center items-center bg-[url('/hero-3.jpg')] bg-cover bg-no-repeat h-screen" id="projectInfo">
				<div className="flex flex-col justify-center items-center">
					<div className="flex flex-col">
						<h1 className="text-center text-[44px] sm:text-[80px] tracking-[-1.5px] font-semibold leading-[1.2em]">Project~Product</h1>
						<h2 className="mt-4 px-4 text-center text-sm sm:text-lg leading-[1.4em] text-light-400">
							Transforming your side-projects and hackathon-projects into profitable products. <br />
							Just enter your project name and project description, Project2Product will help you turn it into a successful venture.
						</h2>
					</div>

					<form className="w-full p-4 sm:p-0 sm:w-1/2 h-min flex flex-col items-center justify-center mt-4 sm:mt-14">
						<input
							className="w-full bg-dark-600/40 border border-light-700 focus:border-light-500 transform duration-300 outline-0 rounded-xl h-12 p-3 normal-case"
							placeholder="Project Name"
							value={productName}
							onChange={onUserChangedProductName}
							required
						/>
						<br />
						<textarea
							className="w-full bg-dark-600/40 border border-light-700 focus:border-light-500 transform duration-300 outline-0 rounded-xl h-60 p-3 normal-case resize-none"
							placeholder="Project Description"
							value={productDescription}
							onChange={onUserChangedProductDescription}
							required
						/>
						<br />
						<div className="w-2/3 sm:w-1/3 flex items-center justify-center">
							<Button
								type="button"
								variant={"primary"}
								onClick={() => {
									// if (status === "authenticated" && session && session.user) {
									if (productName.length > 0 && productDescription.length > 0) {
										if (isGenerating !== "generating") {
											setCardsAvailable(false);
											setIsGenerating("generating");
											sleep(1000).then(() => {
												setIsGenerating(false);
												setCardsAvailable(true);
												let currentdate = new Date();
												let datetime =
													currentdate.getDate() +
													"/" +
													(currentdate.getMonth() + 1) +
													"/" +
													currentdate.getFullYear() +
													" @ " +
													currentdate.getHours() +
													":" +
													currentdate.getMinutes() +
													":" +
													currentdate.getSeconds();
												const newRow = {
													DateTime: datetime,
													UserPrompt: userInput,
													Email: session.user.email,
												};
												appendSpreadsheet(newRow);
											});
										}
									} else {
										promptEnterProjectInfo();
									}
									// } else {
									// 	setAuthModalOpen(true);
									// }
								}}
								isLoading={isGenerating === "generating"}
								rounded={true}
								classes="text-lg px-8 py-3"
							>
								Generate
							</Button>
						</div>
					</form>
				</div>
			</div>

			<div className="w-full flex justify-center items-center pt-20 pb-32 bg-gradient-to-r from-[#828282] via-[#5C5C5C] to-[#424242]" id="cardContainer">
				<div className="w-full md:w-5/6 xl:w-4/6 flex flex-col justify-center items-center md:p-0 p-10">
					<h2 className="text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-16 mb-10">Pitches</h2>

					<div className="w-full md:w-6/12 flex sm:flex-row flex-col gap-10 justify-between items-between">
						<Button
							type="button"
							variant={"primary"}
							outline={true}
							onClick={async (_ev) => {
								if (cardsAvailable) {
									setIsGenerating("pitchdeck");
									const _apiOutput = await callGenerateEndpoint();
									setIsGenerating(false);
									generatePitchdeck(_apiOutput, "download");
								} else {
									promptEnterProjectInfo();
								}
							}}
							isLoading={isGenerating === "pitchdeck"}
							classes="w-full text-lg px-8 py-3"
						>
							Download PitchDeck
						</Button>
						{/* <Button
							type="button"
							onClick={async (_ev) => {
								if (cardsAvailable) {
									setIsGenerating("pitchdeckLink");
									if (!apiOutput) {
										const _apiOutput = await callGenerateEndpoint();
										await generatePitchdeck(_apiOutput, "getLink");
									} else {
										await generatePitchdeck(apiOutput, "getLink");
									}
									setIsGenerating(false);
								} else {
									promptEnterProjectInfo();
								}
							}}
							isLoading={isGenerating === "pitchdeckLink"}
							outline={true}
							classes="w-full text-lg px-8 py-3"
						>
							Get PitchDeck Link
						</Button> */}
					</div>
					{/* {ipfsUrl && (
						<a href={ipfsUrl} target="_blank" rel="noopener noreferrer" className="mb-12 underline hover:text-primary-400">
							{ipfsUrl}
						</a>
					)} */}
					<div className="mt-8 w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
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

					<h2 className="text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10">
						Understanding Potential Users
					</h2>
					<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
						<PromptCard
							cardText="User Persona"
							handleCardClick={async (choice, cardText) => {
								setIsGenerating("userPersona");
								await callGenerateUserPersonaEndpoint(choice, cardText);
								setIsGenerating(false);
							}}
							isLoading={isGenerating === "userPersona"}
							cardsAvailable={cardsAvailable}
							promptEnterProjectInfo={promptEnterProjectInfo}
						/>
						<PromptCard
							cardText="Mom Test: How to talk to initial customers"
							handleCardClick={async (choice, cardText) => {
								setIsGenerating("momTest");
								await callGenerateMomTestEndpoint(choice, cardText);
								setIsGenerating(false);
							}}
							isLoading={isGenerating === "momTest"}
							cardsAvailable={cardsAvailable}
							promptEnterProjectInfo={promptEnterProjectInfo}
						/>
						<PromptCard
							cardText="Type of Potential Customers"
							handleCardClick={async (choice, cardText) => {
								setIsGenerating("potentialCustomers");
								await callGeneratePotentialCustomerEndpoint(choice, cardText);
								setIsGenerating(false);
							}}
							isLoading={isGenerating === "potentialCustomers"}
							cardsAvailable={cardsAvailable}
							promptEnterProjectInfo={promptEnterProjectInfo}
						/>
						<PromptCard
							cardText="Customer Pain Points"
							handleCardClick={async (choice, cardText) => {
								setIsGenerating("customerPainPoints");
								await callGenerateCustomerPainPoints(choice, cardText);
								setIsGenerating(false);
							}}
							isLoading={isGenerating === "customerPainPoints"}
							cardsAvailable={cardsAvailable}
							promptEnterProjectInfo={promptEnterProjectInfo}
						/>
					</div>

					<h2 className="text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10">
						Social Media Strategy
					</h2>
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

					<h2 className="text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10">Advice from books</h2>
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

					<h2 className="text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10">Bonus</h2>
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

					<h2 className="text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10">More coming soon...</h2>
				</div>
			</div>

			<ContentModal isOpen={isContentModalOpen} setOpen={setContentModalOpen} heading={modalText.heading} content={modalText.content} />
		</>
	);
};

export default Home;
