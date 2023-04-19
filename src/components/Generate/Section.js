import { useContext } from "react";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { StatusContext } from "@/store/StatusContextProvider";
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
	const { setError } = useContext(StatusContext);

	const callGenerateEndpoint = async (item, category, index) => {
		setLoading({
			status: true,
			title: "Hang on for a moment",
			message: item.loadingMessage,
			waitMessage: "It may take up to 30 seconds to generate the response...",
		});

		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ideaName: ideaName, ideaDescription: ideaDescription, identifier: item.identifier, category: category, index: index }),
			});
			const data = await response.json();
			// Not enough credits to generate
			if (!data.success && data.error) {
				throw data.message;
			}
			const { output } = data;

			setModalText({ heading: item.cardText, content: output });
			setContentModalOpen(true);
		} catch (err) {
			setError({
				title: "Something went wrong",
				message: err || "Please try again later.",
				showErrorBox: true,
			});
			setContentModalOpen(false);
		}

		setLoading({
			status: false,
			title: "",
			message: "",
		});
	};

	return (
		<>
			<SectionHeading sectionStyle={sectionStyle} sectionId={category}>
				{title}
			</SectionHeading>

			<SectionGrid>
				{items &&
					items.map((item, index) => {
						return (
							!item.hidden && (
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
							)
						);
					})}
			</SectionGrid>
		</>
	);
}
