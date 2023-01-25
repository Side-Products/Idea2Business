import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import pptxgen from "pptxgenjs";
import redBG from "../../public/themes/redbg";
import Loading from "../components/loading";

import { GoogleSpreadsheet } from "google-spreadsheet";
import PromptCard from "../components/PromptCard";

import { create } from "ipfs-http-client";

const Home = () => {
	const [userInput, setUserInput] = useState("");
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [apiOutput, setApiOutput] = useState([]);
	const [apiVCOutput, setVCApiOutput] = useState([]);
	const [apiCoFounderOutput, setCoFounderApiOutput] = useState([]);
	const [apiMomTestOutput, setMomTestApiOutput] = useState([]);
	const [apiMarketingAdvisorOutput, setMarketingAdvisorApiOutput] = useState([]);

	const [isGenerating, setIsGenerating] = useState(false);
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

	const [email, setEmail] = useState("");

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
		setIsGenerating(true);
		console.log("User Input: " + userInput);
		console.log("Doing Magic...");

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

		console.log("Email:", email);
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
			Email: email,
			UserPrompt: userInput,
		};
		appendSpreadsheet(newRow);
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

	const onUserChangedEmail = (event) => {
		// console.log(event.target.value);
		setEmail(event.target.value);
	};

	const validateInput = () => {
		return (
			productName.length && productDescription.length && email.length && email.split("").filter((x) => x === "@").length == 1 && email.indexOf(".") !== -1
		);
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

	return (
		<>
			<div className="root">
				<Head>
					<title>Project2Product</title>
				</Head>

				<div className="container">
					<div className="header">
						<div className="header-title">
							<h1>Project2Product</h1>
						</div>
						<div className="header-subtitle">
							<h2>
								Transforming your side-projects and hackathon-projects into profitable products. <br />
								Just enter your project name and project description, Project2Product will help you turn it into a successful venture.
							</h2>
						</div>
					</div>
					<div className="prompt-container">
						<form>
							<input className="email-field" placeholder="Product Name" value={productName} onChange={onUserChangedProductName} required />
							<br />
							<textarea
								className="prompt-box"
								placeholder="Product Description"
								value={productDescription}
								onChange={onUserChangedProductDescription}
								required
							/>
							<br />
							<input
								className="email-field"
								placeholder="Your Email"
								value={email}
								onChange={onUserChangedEmail}
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								required
							/>
							<div className="prompt-buttons">
								{/* <a 
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div 
              className="generate"
              disabled={!validateInput()}
            >
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a> */}

								<button
									type="button"
									className={isGenerating ? "generate-button loading" : "generate-button"}
									onClick={() => {
										callGenerateEndpoint();
									}}
									disabled={!validateInput()}
								>
									<div className="generate">{isGenerating ? <span className="loader"></span> : <p>Generate</p>}</div>
								</button>
							</div>
						</form>

						<div className="output">
							{apiOutput.length > 0 && (
								<div className="output-content">
									<div className="output-content-btns">
										<button type="button" className="botn first" onClick={(_ev) => runDemo(apiOutput, "download")}>
											Download PitchDeck <br />
										</button>
										<button type="button" className="botn first" onClick={(_ev) => runDemo(apiOutput, "getLink")}>
											{isPitchdeckLinkGenerating ? <span className="loader"></span> : "Get PitchDeck Link"} <br />
										</button>
									</div>

									{ipfsUrl && (
										<a href={ipfsUrl} target="_blank" rel="noopener noreferrer" className="ipfs-url">
											{ipfsUrl}
										</a>
									)}

									<div className=" w-full grid grid-cols-3 place-items-center gap-y-6 gap-x-20">
										<PromptCard
											handleCardClick={callGenerateMomTestEndpoint}
											cardInfo="Mom Test: How to talk to initial customers"
											isLoading={isGeneratingMomTestPitch}
										/>
										<PromptCard
											handleCardClick={callGenerateVCPitchEndpoint}
											cardInfo="Email Pitch to VC"
											isLoading={isGeneratingVCPitch}
										/>
										<PromptCard
											handleCardClick={callGenerateUserPersonaEndpoint}
											cardInfo="User Persona"
											isLoading={isGeneratingUserPersona}
										/>
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
										<PromptCard
											handleCardClick={callInstagramEndpoint}
											cardInfo="Initial Instagram Strategy"
											isLoading={isGeneratingInstagram}
										/>
									</div>
									{/* <button 
              type="button" 
              className={isGeneratingVCPitch ? 'botn first loading' : 'botn first'} 
              onClick={callGenerateVCPitchEndpoint}>	
                <div className="">
                  {isGeneratingVCPitch ? <span className="loader"></span> : <p>Generate Pitch to VC</p>}
                </div>
							</button> */}

									{/* <button 
              type="button" 
              className={isGeneratingMomTestPitch ? 'botn first loading' : 'botn first'} 
              onClick={callGenerateMomTestEndpoint}>	
                <div className="">
                  {isGeneratingMomTestPitch ? <span className="loader"></span> : <p>Generate Pitch for Mom Test</p>}
                </div>
							</button> */}

									{/* <button 
              type="button" 
              className={isGeneratingCoFounderPitch ? 'botn first loading' : 'botn first'} 
              onClick={callGenerateCoFounderPitchEndpoint}>	
                <div className="">
                  {isGeneratingCoFounderPitch ? <span className="loader"></span> : <p>Generate Pitch to Potential Co-Founder</p>}
                </div>
							</button> */}

									{/* <button 
              type="button" 
              className={isGeneratingMarketingAdvisorPitch ? 'botn first loading' : 'botn first'} 
              onClick={callGenerateMarketingAdvisorEndpoint}>	
                <div className="">
                  {isGeneratingMarketingAdvisorPitch ? <span className="loader"></span> : <p>Generate Pitch to Potential Advisor (Marketing)</p>}
                </div>
							</button> */}
								</div>
							)}
							{/* <PromptCard/> */}
						</div>
					</div>
				</div>
			</div>
			{/* } */}
		</>
	);
};

export default Home;
