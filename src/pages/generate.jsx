import { useState, useContext, useEffect } from "react";
import PageWrapper from "@/layout/PageWrapper";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { wrapper } from "@/redux/redux-store";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { StatusContext } from "@/store/StatusContextProvider";
import { generateCategories } from "@/config/constants";
// Import sections
import EnterIdeaInfo from "@/components/Generate/EnterIdeaInfo";
import Decks from "@/components/Generate/Decks";
import Section from "@/components/Generate/Section";
import SectionHeading from "@/components/Generate/SectionHeading";
import ContentModal from "@/components/Generate/ContentModal";
import SubscriptionRequiredModal from "@/components/Generate/SubscriptionRequiredModal";
import GoToSectionCarousel from "@/components/Generate/GoToSectionCarousel";

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
			const categoriesSlider = document.getElementById("categoriesSlider");
			categoriesSlider.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	}, [cardsAvailable]);

	const {
		decks,
		pitches,
		understandingPotentialUsers,
		socialMediaStrategy,
		adviceFromBooks,
		investorMeetingPrep,
		design,
		marketValidation,
		vision,
		productLaunch,
		marketing,
		growth,
		bonusContent,
	} = generateCategories;

	const sectionOptions = {
		isGenerating,
		setIsGenerating,
		promptEnterIdeaInfo,
		ideaInfo,
		cardsAvailable,
		setSubscriptionRequiredModalOpen,
		setModalText,
		setContentModalOpen,
	};

	return (
		<PageWrapper useDefaultContainer={false}>
			<div className="w-full flex flex-col items-center bg-dark-1000 min-h-screen" id="ideaInfo">
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

			<div className="w-full flex justify-center items-center pt-32 bg-dark-1000">
				<div className="relative w-full max-w-[1920px] px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<span id="categoriesSlider" className="absolute -top-52"></span>
					<GoToSectionCarousel />
				</div>
			</div>

			<div className="w-full flex justify-center items-center pt-6 pb-32 bg-dark-1000" id="cardContainer">
				<div className="w-full md:w-11/12 xl:w-9/12 flex flex-col justify-center items-center md:p-0 p-4">
					<Decks title="Decks" items={decks} category={"decks"} sectionStyle={1} {...sectionOptions} />

					<Section title="Pitches" items={pitches} category={"pitches"} sectionStyle={2} {...sectionOptions} />

					<Section
						title="Understanding Potential Users"
						items={understandingPotentialUsers}
						category={"understandingPotentialUsers"}
						sectionStyle={3}
						{...sectionOptions}
					/>

					<Section title="Social Media Strategy" items={socialMediaStrategy} category={"socialMediaStrategy"} sectionStyle={4} {...sectionOptions} />

					<Section title="Advice from Books" items={adviceFromBooks} category={"adviceFromBooks"} sectionStyle={5} {...sectionOptions} />

					<Section title="Market Validation" items={marketValidation} category={"marketValidation"} sectionStyle={6} {...sectionOptions} />

					<Section title="Vision" items={vision} category={"vision"} sectionStyle={2} {...sectionOptions} />

					<Section title="Design" items={design} category={"design"} sectionStyle={8} {...sectionOptions} />

					<Section title="Product Launch" items={productLaunch} category={"productLaunch"} sectionStyle={3} {...sectionOptions} />

					<Section title="Marketing" items={marketing} category={"marketing"} sectionStyle={5} {...sectionOptions} />

					<Section title="Growth" items={growth} category={"growth"} sectionStyle={6} {...sectionOptions} />

					<Section title="Investor Meeting Prep" items={investorMeetingPrep} category={"investorMeetingPrep"} sectionStyle={1} {...sectionOptions} />

					<Section title="Bonus" items={bonusContent} category={"bonusContent"} sectionStyle={7} {...sectionOptions} />

					<SectionHeading>More coming soon...</SectionHeading>
				</div>
			</div>

			<ContentModal isOpen={isContentModalOpen} setOpen={setContentModalOpen} heading={modalText.heading} content={modalText.content} />
			<SubscriptionRequiredModal isOpen={isSubscriptionRequiredModalOpen} setOpen={setSubscriptionRequiredModalOpen} />
		</PageWrapper>
	);
};

export default Generate;
