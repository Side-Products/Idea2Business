import { useState, useContext, useEffect } from "react";
import PageWrapper from "@/layout/PageWrapper";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { wrapper } from "@/redux/redux-store";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { StatusContext } from "@/store/StatusContextProvider";
import ContentModal from "@/components/Generate/ContentModal";
import SubscriptionRequiredModal from "@/components/Generate/SubscriptionRequiredModal";
import SectionHeading from "@/components/Generate/SectionHeading";
// Import sections
import EnterIdeaInfo from "@/components/Generate/EnterIdeaInfo";
import Decks from "@/components/Generate/Sections/Decks";
import Pitches from "@/components/Generate/Sections/Pitches";
import UnderstandingPotentialUsers from "@/components/Generate/Sections/UnderstandingPotentialUsers";
import SocialMediaStrategy from "@/components/Generate/Sections/SocialMediaStrategy";
import AdviceFromBooks from "@/components/Generate/Sections/AdviceFromBooks";
import InvestorMeetingPrep from "@/components/Generate/Sections/InvestorMeetingPrep";
import BonusContent from "@/components/Generate/Sections/BonusContent";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
	const session = await getSession({ req: req });
	if (!session) {
		return {
			props: {},
		};
	}

	await store.dispatch(mySubscription(req));

	return {
		props: { session },
	};
});

const Generate = () => {
	const { setError } = useContext(StatusContext);

	// Input states
	const [ideaInfo, setIdeaInfo] = useState({ ideaName: "", ideaDescription: "" });
	const onFieldChange = (e) => {
		setIdeaInfo({ ...ideaInfo, [e.target.name]: e.target.value });
	};

	const router = useRouter();
	const { name, description } = router.query;
	// If name and description are present in the query string, set the input states
	useEffect(() => {
		if (name && description) {
			setIdeaInfo({ ideaName: name, ideaDescription: description });
		}
	}, [name, description]);

	const promptEnterIdeaInfo = () => {
		setError({
			title: "Missing information",
			message: "Please enter idea details first",
			showErrorBox: true,
		});
		const ideaInfoContainer = document.getElementById("ideaInfo");
		ideaInfoContainer.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	};

	const [cardsAvailable, setCardsAvailable] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	// Modal states
	const [modalText, setModalText] = useState({ heading: "", content: "" });
	const [isContentModalOpen, setContentModalOpen] = useState(false);
	const [isSubscriptionRequiredModalOpen, setSubscriptionRequiredModalOpen] = useState(false);

	// Scroll to cards when they are available
	useEffect(() => {
		if (cardsAvailable) {
			const cardContainer = document.getElementById("cardContainer");
			cardContainer.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	}, [cardsAvailable]);

	return (
		<PageWrapper useDefaultContainer={false}>
			<div className="w-full flex flex-col items-center bg-dark-1000 h-screen" id="ideaInfo">
				<div className="w-full max-w-[1920px] py-36 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<EnterIdeaInfo
						ideaInfo={ideaInfo}
						onFieldChange={onFieldChange}
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						setCardsAvailable={setCardsAvailable}
					/>
				</div>
			</div>

			<div className="w-full flex justify-center items-center pt-10 pb-32 bg-dark-1000" id="cardContainer">
				<div className="w-full md:w-11/12 xl:w-9/12 flex flex-col justify-center items-center md:p-0 p-4">
					<Decks
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<Pitches
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
						sectionStyle={1}
					/>

					<UnderstandingPotentialUsers
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
						sectionStyle={2}
					/>

					<SocialMediaStrategy
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
						sectionStyle={3}
					/>

					<AdviceFromBooks
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
						sectionStyle={4}
					/>

					<InvestorMeetingPrep
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
						sectionStyle={5}
					/>

					<BonusContent
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterIdeaInfo={promptEnterIdeaInfo}
						ideaInfo={ideaInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
						sectionStyle={6}
					/>

					<SectionHeading>More coming soon...</SectionHeading>
				</div>
			</div>

			<ContentModal isOpen={isContentModalOpen} setOpen={setContentModalOpen} heading={modalText.heading} content={modalText.content} />
			<SubscriptionRequiredModal isOpen={isSubscriptionRequiredModalOpen} setOpen={setSubscriptionRequiredModalOpen} />
		</PageWrapper>
	);
};

export default Generate;
