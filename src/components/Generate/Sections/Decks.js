import { useContext } from "react";
import pptxgen from "pptxgenjs";
import redBG from "../../../../public/themes/redbg";
import LoadingContext from "@/store/loading-context";
import SectionHeading from "../SectionHeading";
import Button from "@/components/ui/Button";

export default function Decks({ isGenerating, setIsGenerating, promptEnterProjectInfo, projectInfo, cardsAvailable, setModalText, setContentModalOpen }) {
	const { projectName, projectDescription } = projectInfo;
	const [, setLoading] = useContext(LoadingContext);

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

			return outputArray;
		} else {
			promptEnterProjectInfo();
		}
	};

	function splitFirstOccurrence(str, separator) {
		const [first, ...rest] = str.split(separator);
		const remainder = rest.join("-");
		return { first, remainder };
	}

	async function generatePitchdeck(apiOutput) {
		// Initialization
		const pptx = new pptxgen();

		// Layout of the whole slide
		pptx.layout = "LAYOUT_16x9";

		// -----------------------------------------------------------------------------------
		// SLIDE: 1
		// -----------------------------------------------------------------------------------

		const slide1 = pptx.addSlide();
		slide1.background = { data: redBG };

		const result1 = splitFirstOccurrence(apiOutput[1], ":");
		slide1.addText(
			[
				{ text: result1.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result1.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 2
		// -----------------------------------------------------------------------------------

		const slide2 = pptx.addSlide();
		slide2.background = { data: redBG };

		const result2 = splitFirstOccurrence(apiOutput[3], ":");
		slide2.addText(
			[
				{ text: result2.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result2.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 3
		// -----------------------------------------------------------------------------------

		const slide3 = pptx.addSlide();
		slide3.background = { data: redBG };

		const result3 = splitFirstOccurrence(apiOutput[5], ":");
		slide3.addText(
			[
				{ text: result3.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result3.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 4
		// -----------------------------------------------------------------------------------

		const slide4 = pptx.addSlide();
		slide4.background = { data: redBG };

		const result4 = splitFirstOccurrence(apiOutput[7], ":");
		slide4.addText(
			[
				{ text: result4.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result4.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 5
		// -----------------------------------------------------------------------------------

		const slide5 = pptx.addSlide();
		slide5.background = { data: redBG };

		const result5 = splitFirstOccurrence(apiOutput[9], ":");
		slide5.addText(
			[
				{ text: result5.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result5.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 6
		// -----------------------------------------------------------------------------------

		const slide6 = pptx.addSlide();
		slide6.background = { data: redBG };

		const result6 = splitFirstOccurrence(apiOutput[11], ":");
		slide6.addText(
			[
				{ text: result6.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result6.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 7
		// -----------------------------------------------------------------------------------

		const slide7 = pptx.addSlide();
		slide7.background = { data: redBG };

		const result7 = splitFirstOccurrence(apiOutput[13], ":");
		slide7.addText(
			[
				{ text: result7.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result7.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 8
		// -----------------------------------------------------------------------------------

		const slide8 = pptx.addSlide();
		slide8.background = { data: redBG };

		const result8 = splitFirstOccurrence(apiOutput[15], ":");
		slide8.addText(
			[
				{ text: result8.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result8.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 9
		// -----------------------------------------------------------------------------------

		const slide9 = pptx.addSlide();
		slide9.background = { data: redBG };

		const result9 = splitFirstOccurrence(apiOutput[17], ":");
		slide9.addText(
			[
				{ text: result9.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result9.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 10
		// -----------------------------------------------------------------------------------

		const slide10 = pptx.addSlide();
		slide10.background = { data: redBG };

		const result10 = splitFirstOccurrence(apiOutput[19], ":");
		slide10.addText(
			[
				{ text: result10.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result10.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 11
		// -----------------------------------------------------------------------------------

		const slide11 = pptx.addSlide();
		slide11.background = { data: redBG };

		const result11 = splitFirstOccurrence(apiOutput[21], ":");
		slide11.addText(
			[
				{ text: result11.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result11.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		// -----------------------------------------------------------------------------------
		// SLIDE: 12
		// -----------------------------------------------------------------------------------

		const slide12 = pptx.addSlide();
		slide12.background = { data: redBG };

		const result12 = splitFirstOccurrence(apiOutput[23], ":");
		slide12.addText(
			[
				{ text: result12.first, options: { y: 1, align: "center", fontSize: 40, bold: true, underline: true, color: "ffffff", isTextBox: true } },
				{ text: result12.remainder, options: { paraSpaceBefore: 48, fontSize: 16, breakLine: true, color: "ffffff" } },
			],
			{
				x: 0.7,
				y: 1.1,
				w: 8.5,
				h: 2.5,
				color: "000000",
				valign: "middle",
				align: "center",
				isTextBox: true,
			}
		);

		pptx.writeFile({ fileName: `${projectName}.pptx` });
	}

	return (
		<>
			<SectionHeading>Decks</SectionHeading>

			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center items-center justify-center justify-items-center place-content-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				<div className="w-full col-start-2">
					<Button
						type="button"
						variant={"primary"}
						outline={true}
						onClick={async (_ev) => {
							if (cardsAvailable) {
								setLoading({
									status: true,
									title: "Hang on for a moment",
									message: "Pitchdeck for your project is being generated",
									waitMessage: "It may take up to 30 seconds to generate the response...",
								});
								setIsGenerating("pitchdeck");
								const _apiOutput = await callGenerateEndpoint();
								setIsGenerating(false);
								generatePitchdeck(_apiOutput);
								setLoading({
									status: false,
									title: "",
									message: "",
								});
							} else {
								promptEnterProjectInfo();
							}
						}}
						isLoading={isGenerating === "pitchdeck"}
						innerClasses="py-3"
					>
						Download PitchDeck
					</Button>
				</div>
			</div>
		</>
	);
}
