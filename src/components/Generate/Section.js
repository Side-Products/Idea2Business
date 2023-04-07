import { useContext } from "react";
import { LoadingContext } from "@/store/LoadingContextProvider";
import PromptCard from "./PromptCard";
import SectionHeading from "./SectionHeading";
import SectionGrid from "./SectionGrid";

export default function Section({
	title,
	items,
	category,
	isGenerating,
	setIsGenerating,
	promptEnterIdeaInfo,
	ideaInfo,
	cardsAvailable,
	setModalText,
	setContentModalOpen,
	setSubscriptionRequiredModalOpen,
	sectionStyle,
}) {
	const { ideaName, ideaDescription } = ideaInfo;
	const { setLoading } = useContext(LoadingContext);

	const callGenerateEndpoint = async (item, category, index) => {
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
			body: JSON.stringify({ ideaName: ideaName, ideaDescription: ideaDescription, identifier: item.identifier, category: category, index: index }),
		});
		const data = await response.json();
		const { output } = data;

		setModalText({ heading: item.cardText, content: output });
		setContentModalOpen(true);

		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	return (
		<>
			<SectionHeading sectionStyle={sectionStyle}>{title}</SectionHeading>
			<SectionGrid>
				{items &&
					items.map((item, index) => {
						return (
							<PromptCard
								key={item.identifier}
								cardText={item.cardText}
								handleCardClick={async () => {
									setIsGenerating(item.identifier);
									await callGenerateEndpoint(item, category, index);
									setIsGenerating(false);
								}}
								isLoading={isGenerating === item.identifier}
								subscriptionPlanRequired={item.subscriptionPlanRequired}
								sectionStyle={sectionStyle}
								cardsAvailable={cardsAvailable}
								promptEnterIdeaInfo={promptEnterIdeaInfo}
								setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
							/>
						);
					})}
			</SectionGrid>
		</>
	);
}
