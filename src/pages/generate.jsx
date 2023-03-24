import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { title_main_page, meta_description } from "@/config/constants";
import StatusContext from "@/store/status-context";
import ContentModal from "@/components/Generate/ContentModal";
import SubscriptionRequiredModal from "@/components/Generate/SubscriptionRequiredModal";
import SectionHeading from "@/components/Generate/SectionHeading";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
// Import sections
import EnterProjectInfo from "@/components/Generate/EnterProjectInfo";
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
	const [, , , setError] = useContext(StatusContext);

	// Input states
	const [projectInfo, setProjectInfo] = useState({ projectName: "", projectDescription: "" });
	const onFieldChange = (e) => {
		setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
	};

	const router = useRouter();
	const { name, description } = router.query;
	// If name and description are present in the query string, set the input states
	useEffect(() => {
		if (name && description) {
			setProjectInfo({ projectName: name, projectDescription: description });
		}
	}, [name, description]);

	const promptEnterProjectInfo = () => {
		setError({
			title: "Missing information",
			message: "Please enter project name and description first",
			showErrorBox: true,
		});
		const projectInfoContainer = document.getElementById("projectInfo");
		projectInfoContainer.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center bg-dark-1000 h-screen" id="projectInfo">
				<div className="w-full max-w-[1920px] py-36 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<EnterProjectInfo
						projectInfo={projectInfo}
						onFieldChange={onFieldChange}
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						setCardsAvailable={setCardsAvailable}
					/>
				</div>
			</div>

			<div className="w-full flex justify-center items-center pt-10 pb-32 bg-dark-1000" id="cardContainer">
				<div className="w-full md:w-5/6 xl:w-4/6 flex flex-col justify-center items-center md:p-0 p-10">
					<Decks
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<Pitches
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<UnderstandingPotentialUsers
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<SocialMediaStrategy
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<AdviceFromBooks
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<InvestorMeetingPrep
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<BonusContent
						isGenerating={isGenerating}
						setIsGenerating={setIsGenerating}
						promptEnterProjectInfo={promptEnterProjectInfo}
						projectInfo={projectInfo}
						cardsAvailable={cardsAvailable}
						setModalText={setModalText}
						setContentModalOpen={setContentModalOpen}
						setSubscriptionRequiredModalOpen={setSubscriptionRequiredModalOpen}
					/>

					<SectionHeading>More coming soon...</SectionHeading>
				</div>
			</div>

			<ContentModal isOpen={isContentModalOpen} setOpen={setContentModalOpen} heading={modalText.heading} content={modalText.content} />
			<SubscriptionRequiredModal isOpen={isSubscriptionRequiredModalOpen} setOpen={setSubscriptionRequiredModalOpen} />
		</>
	);
};

export default Generate;
