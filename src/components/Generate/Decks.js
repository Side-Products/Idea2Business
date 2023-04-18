import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import pptxgen from "pptxgenjs";
import redBG from "../../../public/themes/redbg";
import { LoadingContext } from "@/store/LoadingContextProvider";
import SectionHeading from "./SectionHeading";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { standardPlan, proPlusPlan } from "@/config/constants";
import { getCurrentSubscriptionTier } from "@/utils/Helpers";

export default function Decks({
	title,
	items,
	category,
	sectionStyle,
	isGenerating,
	setIsGenerating,
	promptEnterIdeaInfo,
	ideaInfo,
	cardsAvailable,
	setSubscriptionRequiredModalOpen,
}) {
	const { ideaName, ideaDescription } = ideaInfo;
	const { setLoading } = useContext(LoadingContext);

	function splitFirstOccurrence(str, separator) {
		try {
			const [first, ...rest] = str.split(separator);
			const remainder = rest.join("-");
			return { first, remainder };
		} catch (error) {
			console.log("splitFirstOccurrence error:", error);
		}
	}

	async function generatePitchdeck(apiOutput) {
		// Initialization
		const pptx = new pptxgen();

		// Layout of the whole slide
		pptx.layout = "LAYOUT_16x9";

		// -----------------------------------------------------------------------------------
		// SLIDE: 0
		// -----------------------------------------------------------------------------------

		const slide0 = pptx.addSlide();
		slide0.background = { data: redBG };

		slide0.addText([{ text: ideaName, options: { y: 1, align: "center", fontSize: 50, bold: true, color: "ffffff", isTextBox: true } }], {
			x: 0.7,
			y: 1.2,
			w: 8.5,
			h: 2.5,
			color: "000000",
			valign: "middle",
			align: "center",
			isTextBox: true,
		});

		// -----------------------------------------------------------------------------------
		// SLIDE: 1
		// -----------------------------------------------------------------------------------

		const slide1 = pptx.addSlide();
		slide1.background = { data: redBG };

		const result1 = splitFirstOccurrence(apiOutput[0], ":");
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

		const result2 = splitFirstOccurrence(apiOutput[2], ":");
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

		const result3 = splitFirstOccurrence(apiOutput[4], ":");
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

		const result4 = splitFirstOccurrence(apiOutput[6], ":");
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

		const result5 = splitFirstOccurrence(apiOutput[8], ":");
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

		const result6 = splitFirstOccurrence(apiOutput[10], ":");
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

		const result7 = splitFirstOccurrence(apiOutput[12], ":");
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

		const result8 = splitFirstOccurrence(apiOutput[14], ":");
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

		const result9 = splitFirstOccurrence(apiOutput[16], ":");
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

		const result10 = splitFirstOccurrence(apiOutput[18], ":");
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

		const result11 = splitFirstOccurrence(apiOutput[20], ":");
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

		const result12 = splitFirstOccurrence(apiOutput[22], ":");
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

		pptx.writeFile({ fileName: `${ideaName}.pptx` });
	}

	const callGenerateEndpoint = async (item, category, index) => {
		if (ideaName.length > 0 && ideaDescription.length > 0) {
			setLoading({
				status: true,
				title: "Hang on for a moment",
				message: item.loadingMessage,
				waitMessage: "It may take up to 30 seconds to generate the response...",
			});

			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ideaName: ideaName,
					ideaDescription: ideaDescription,
					identifier: item.identifier,
					category: category,
					index: index,
				}),
			});
			const data = await response.json();
			const { output } = data;

			const outputArray = output.split(/\r?\n/);
			await generatePitchdeck(outputArray);

			setLoading({
				status: false,
				title: "",
				message: "",
			});
		} else {
			promptEnterIdeaInfo();
		}
	};

	// Subscription state
	const { subscription } = useSelector((state) => state.subscription);
	// Check for which plan the user is subscribed to
	const subscriptionPlan = getCurrentSubscriptionTier(subscription);

	const { data: session } = useSession();
	const [canAccess, setCanAccess] = useState(false);
	useEffect(() => {
		if (session && session.user && (session.user.role == "admin" || session.user.role == "allAccess")) {
			setCanAccess(true);
		} else if (subscriptionPlan == proPlusPlan) {
			setCanAccess(true);
		} else if (subscriptionPlan == standardPlan) {
			setCanAccess(false);
		} else {
			setCanAccess(false);
		}
	}, [subscriptionPlan, subscription, session]);

	return (
		<>
			<SectionHeading sectionStyle={sectionStyle} sectionId={category}>
				{title}
			</SectionHeading>

			<div className="w-full flex items-center justify-center justify-items-center place-content-center gap-y-6 gap-x-10 md:gap-x-16 lg:gap-x-26 2xl:gap-x-18">
				{items &&
					items.map((item, index) => {
						return (
							<div className="w-full sm:w-1/2 md:w-1/3" key={item.identifier}>
								<Button
									type="button"
									variant={"primary"}
									outline={true}
									onClick={async (_ev) => {
										if (cardsAvailable) {
											if (canAccess) {
												setIsGenerating("pitchdeck");
												await callGenerateEndpoint(item, category, index);
												setIsGenerating(false);
											} else {
												setSubscriptionRequiredModalOpen(true);
											}
										} else {
											promptEnterIdeaInfo();
										}
									}}
									isLoading={isGenerating === item.identifier}
									innerClasses="py-3"
								>
									{item.cardText}
								</Button>
							</div>
						);
					})}
			</div>
		</>
	);
}
