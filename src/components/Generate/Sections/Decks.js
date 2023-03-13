import { useState, useContext } from "react";
import pptxgen from "pptxgenjs";
import redBG from "../../../../public/themes/redbg";
import LoadingContext from "@/store/loading-context";
import SectionHeading from "../SectionHeading";
import Button from "@/components/ui/Button";

export default function Decks({ isGenerating, setIsGenerating, promptEnterProjectInfo, projectInfo, cardsAvailable, setModalText, setContentModalOpen }) {
	const { projectName, projectDescription } = projectInfo;
	const [, setLoading] = useContext(LoadingContext);

	const [apiOutput, setApiOutput] = useState(false);

	const callGenerateEndpoint = async () => {
		if (projectName.length > 0 && projectDescription.length > 0) {
			// Getting pitch deck content from OpenAI
			const response = await fetch("/api/generate/decks/pitchdeck", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userInput: `${projectName}: ${projectDescription}` }),
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

		pptx.writeFile({ fileName: `${projectName}.pptx` });
	}

	return (
		<>
			<SectionHeading>Decks</SectionHeading>

			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center items-center justify-center justify-items-center place-content-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<Button
					type="button"
					variant={"secondary"}
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
					classes="w-full text-lg px-8 py-3 col-start-2"
				>
					Download PitchDeck
				</Button>
			</div>
		</>
	);
}
