import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import pptxgen from "pptxgenjs";
import redBG from "../../public/themes/redbg";
import Loading from "../components/loading";
import { create } from "ipfs-http-client";
import { GoogleSpreadsheet } from "google-spreadsheet";
import PromptCard from "@/components/PromptCard";
import { title_main_page, meta_description } from "@/config/constants";
import CustomButton from "@/layout/CustomButton";
import StatusContext from "@/store/status-context";
import { sleep } from "@/utils/Sleep";

const Home = () => {
	const [error, , , setError] = useContext(StatusContext);

	const [userInput, setUserInput] = useState("");
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [apiOutput, setApiOutput] = useState([]);
	const [apiVCOutput, setVCApiOutput] = useState([]);
	const [apiCoFounderOutput, setCoFounderApiOutput] = useState([]);
	const [apiMomTestOutput, setMomTestApiOutput] = useState([]);
	const [apiMarketingAdvisorOutput, setMarketingAdvisorApiOutput] = useState([]);

	const [isGenerating, setIsGenerating] = useState(false);
	const [cardsAvailable, setCardsAvailable] = useState(false);
	const [isGeneratingVCPitch, setIsGeneratingVCPitch] = useState(false);
	const [isGeneratingCoFounderPitch, setIsGeneratingCoFounderPitch] = useState(false);
	const [isGeneratingMomTestPitch, setIsGeneratingMomTestPitch] = useState(false);
	const [isGeneratingMarketingAdvisorPitch, setIsGeneratingMarketingAdvisorPitch] = useState(false);

	const [isGeneratingUserPersona, setIsGeneratingUserPersona] = useState(false);
	const [isGeneratingPotentialCustomers, setIsGeneratingPotentialCustomers] = useState(false);
	const [isGeneratingLeanStartup, setIsGeneratingLeanStartup] = useState(false);
	const [isGeneratingSPME, setIsGeneratingSPME] = useState(false);
	const [isGeneratingMVP, setIsGeneratingMVP] = useState(false);
	const [isGeneratingGrant, setIsGeneratingGrant] = useState(false);
	const [isGeneratingTwitter, setIsGeneratingTwitter] = useState(false);
	const [isGeneratingInstagram, setIsGeneratingInstagram] = useState(false);

	// Config variables
	const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
	const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
	const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
	const GOOGLE_SERVICE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

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
	const [isPitchdeckLinkGenerating, setPitchdeckLinkGenerating] = useState(false);

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
		if (productName.length && productDescription.length) {
			setIsGenerating("pitchdeck");

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

			setIsGenerating(false);

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
			};
			appendSpreadsheet(newRow);

			return outputArray;
		} else {
			setError({
				title: "Missing information",
				message: "Please enter project name and description",
				showErrorBox: true,
			});
		}
	};

	const callGenerateVCPitchEndpoint = async () => {
		setIsGeneratingVCPitch(true);
		console.log("Doing Magic Again...");

		// Getting VC Pitch Content from OpenAI
		const response = await fetch("/api/vcpitch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		// console.log("Response", response)
		const data = await response.json();
		const { output } = data;
		// console.log("API VC OUTPUT:", output);
		// let vcOutputArray = output.text.split(/\r?\n/);
		let vcOutputArray = output.text;

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([vcOutputArray], { type: "text/plain" }));
		a.download = "EmailPitchToVC.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		setVCApiOutput([...vcOutputArray]);
		setIsGeneratingVCPitch(false);
	};

	const callGenerateMomTestEndpoint = async () => {
		setIsGeneratingMomTestPitch(true);
		console.log("Doing Magic Again...");

		// Getting Mom Test Content from OpenAI
		const response = await fetch("/api/momtest", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		// console.log("Response", response)
		const data = await response.json();
		const { output } = data;
		// console.log("API VC OUTPUT:", output);
		// let vcOutputArray = output.text.split(/\r?\n/);
		let momTestOutputArray = output.text;

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([momTestOutputArray], { type: "text/plain" }));
		a.download = "MomTest.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		setMomTestApiOutput([...momTestOutputArray]);
		setIsGeneratingMomTestPitch(false);
	};

	const callGenerateCoFounderPitchEndpoint = async () => {
		setIsGeneratingCoFounderPitch(true);
		console.log("Doing Magic Again...");

		// Getting Pitch to Co Founder Content from OpenAI
		const response = await fetch("/api/cofounderpitch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		// console.log("Response", response)
		const data = await response.json();
		const { output } = data;
		// console.log("API VC OUTPUT:", output);
		// let vcOutputArray = output.text.split(/\r?\n/);
		let cofounderOutputArray = output.text;

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([cofounderOutputArray], { type: "text/plain" }));
		a.download = "PitchToCoFounder.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		setCoFounderApiOutput([...cofounderOutputArray]);
		setIsGeneratingCoFounderPitch(false);
	};

	const callGenerateMarketingAdvisorEndpoint = async () => {
		setIsGeneratingMarketingAdvisorPitch(true);
		console.log("Doing Magic Again...");

		// Getting Pitch to Marketing Advisor Content from OpenAI
		const response = await fetch("/api/marketingadvisor", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});
		// console.log("Response", response)
		const data = await response.json();
		const { output } = data;
		// console.log("API VC OUTPUT:", output);
		// let vcOutputArray = output.text.split(/\r?\n/);
		let marketingAdvisorOutputArray = output.text;

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([marketingAdvisorOutputArray], { type: "text/plain" }));
		a.download = "PitchToMarketingAdvisor.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		setMarketingAdvisorApiOutput([...marketingAdvisorOutputArray]);
		setIsGeneratingMarketingAdvisorPitch(false);
	};

	const callGenerateUserPersonaEndpoint = async () => {
		setIsGeneratingUserPersona(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userPersonaOutputArray], { type: "text/plain" }));
		a.download = "UserPersona.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingUserPersona(false);
	};

	const callGeneratePotentialCustomerEndpoint = async () => {
		setIsGeneratingPotentialCustomers(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "PotentialCustomer.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingPotentialCustomers(false);
	};

	const callLeanStartupEndpoint = async () => {
		setIsGeneratingLeanStartup(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "AdviceFromLeanStartup.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingLeanStartup(false);
	};

	const callSPMEEndpoint = async () => {
		setIsGeneratingSPME(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "SPMEforSolopreneurs.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingSPME(false);
	};

	const callMVPEndpoint = async () => {
		setIsGeneratingMVP(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "MVPLaunchChecklist.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingMVP(false);
	};

	const callGrantEndpoint = async () => {
		setIsGeneratingGrant(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "GrantProposal.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingGrant(false);
	};

	const callTwitterEndpoint = async () => {
		setIsGeneratingTwitter(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "TwitterStrategy.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingTwitter(false);
	};

	const callInstagramEndpoint = async () => {
		setIsGeneratingInstagram(true);
		console.log("Doing Magic Again...");
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

		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([userCusOutputArray], { type: "text/plain" }));
		a.download = "InstagramStrategy.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setIsGeneratingInstagram(false);
	};

	const onUserChangedProductName = (event) => {
		setProductName(event.target.value);
		setUserInput(event.target.value + ": " + productDescription);
	};

	const onUserChangedProductDescription = (event) => {
		setProductDescription(event.target.value);
		setUserInput(productName + ": " + event.target.value);
	};

	async function runDemo(apiOutput, method) {
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
			setPitchdeckLinkGenerating(true);
			const _file = await pptx.stream();
			const ipfsFile = await ipfs.add(_file);

			setIpfsUrl("https://project2product.infura-ipfs.io/ipfs/" + ipfsFile.path);
			console.log("https://project2product.infura-ipfs.io/ipfs/" + ipfsFile.path);
			setPitchdeckLinkGenerating(false);
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

	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="flex justify-center items-center bg-[url('/hero-3.jpg')] bg-cover bg-no-repeat h-screen">
				<div className="flex flex-col justify-center items-center">
					<div className="flex flex-col">
						<h1 className="text-center text-[80px] tracking-[-2px] font-semibold leading-[1.2em]">Project~Product</h1>
						<h2 className="mt-4 text-center text-lg leading-[1.4em] text-light-400">
							Transforming your side-projects and hackathon-projects into profitable products. <br />
							Just enter your project name and project description, Project2Product will help you turn it into a successful venture.
						</h2>
					</div>

					<form className="w-1/2 h-min flex flex-col items-center justify-center mt-14">
						<input
							className="w-full bg-light-700/40 border border-light-700 focus:border-light-500 transform duration-300 outline-0 rounded-xl h-12 p-3 normal-case"
							placeholder="Project Name"
							value={productName}
							onChange={onUserChangedProductName}
							required
						/>
						<br />
						<textarea
							className="w-full bg-light-700/40 border border-light-700 focus:border-light-500 transform duration-300 outline-0 rounded-xl h-40 p-3 normal-case resize-none"
							placeholder="Project Description"
							value={productDescription}
							onChange={onUserChangedProductDescription}
							required
						/>
						<br />
						<div className="w-1/3 flex items-center justify-center">
							<CustomButton
								type="button"
								onClick={() => {
									if (isGenerating !== "generating") {
										setCardsAvailable(false);
										setIsGenerating("generating");
										sleep(2000).then(() => {
											setIsGenerating(false);
											setCardsAvailable(true);
										});
									}
								}}
								isLoading={isGenerating === "generating"}
								primary={true}
								rounded={true}
								classes="text-lg px-8 py-3"
							>
								Generate
							</CustomButton>
						</div>
					</form>
				</div>
			</div>

			{/* apiOutput.length > 0 */}
			{cardsAvailable && (
				<div className="flex justify-center items-center py-28 bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700" id="cardContainer">
					<div className="w-4/6 flex flex-col justify-center items-center">
						<div className="w-6/12 flex gap-10 justify-between items-between mb-10">
							<CustomButton
								type="button"
								onClick={async (_ev) => {
									const _apiOutput = await callGenerateEndpoint();
									runDemo(_apiOutput, "download");
								}}
								isLoading={isGenerating === "pitchdeck"}
								outline={true}
								classes="w-full text-lg px-8 py-3"
							>
								Download PitchDeck
							</CustomButton>
							<CustomButton
								type="button"
								onClick={async (_ev) => {
									if (!apiOutput) {
										const _apiOutput = await callGenerateEndpoint();
										runDemo(_apiOutput, "getLink");
									} else {
										runDemo(apiOutput, "getLink");
									}
								}}
								isLoading={isPitchdeckLinkGenerating}
								outline={true}
								classes="w-full text-lg px-8 py-3"
							>
								Get PitchDeck Link
							</CustomButton>
						</div>

						{ipfsUrl && (
							<a href={ipfsUrl} target="_blank" rel="noopener noreferrer" className="mb-12 underline hover:text-primary-400">
								{ipfsUrl}
							</a>
						)}

						<div className="w-full grid grid-cols-3 place-items-center gap-y-6 gap-x-20">
							<PromptCard
								handleCardClick={callGenerateMomTestEndpoint}
								cardInfo="Mom Test: How to talk to initial customers"
								isLoading={isGeneratingMomTestPitch}
							/>
							<PromptCard handleCardClick={callGenerateVCPitchEndpoint} cardInfo="Email Pitch to VC" isLoading={isGeneratingVCPitch} />
							<PromptCard handleCardClick={callGenerateUserPersonaEndpoint} cardInfo="User Persona" isLoading={isGeneratingUserPersona} />
							<PromptCard
								handleCardClick={callGeneratePotentialCustomerEndpoint}
								cardInfo="Type of Potential Customers"
								isLoading={isGeneratingPotentialCustomers}
							/>
							<PromptCard
								handleCardClick={callLeanStartupEndpoint}
								cardInfo="Advice from the book: The Lean Startup"
								isLoading={isGeneratingLeanStartup}
							/>
							<PromptCard
								handleCardClick={callSPMEEndpoint}
								cardInfo="SPME (Strategy, Positioning, Messaging, Experimentations): Marketing for solopreneurs"
								isLoading={isGeneratingSPME}
							/>
							<PromptCard handleCardClick={callMVPEndpoint} cardInfo="MVP Launch Checklist" isLoading={isGeneratingMVP} />
							<PromptCard handleCardClick={callGrantEndpoint} cardInfo="Grant Proposal" isLoading={isGeneratingGrant} />

							<PromptCard
								handleCardClick={callGenerateCoFounderPitchEndpoint}
								cardInfo="Pitch to Onboard Potential Co-Founder"
								isLoading={isGeneratingCoFounderPitch}
							/>
							<PromptCard
								handleCardClick={callGenerateMarketingAdvisorEndpoint}
								cardInfo="Pitch to Onboard Potential Advisor (Marketing)"
								isLoading={isGeneratingMarketingAdvisorPitch}
							/>
							<PromptCard handleCardClick={callTwitterEndpoint} cardInfo="Initial Twitter Strategy" isLoading={isGeneratingTwitter} />
							<PromptCard handleCardClick={callInstagramEndpoint} cardInfo="Initial Instagram Strategy" isLoading={isGeneratingInstagram} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
