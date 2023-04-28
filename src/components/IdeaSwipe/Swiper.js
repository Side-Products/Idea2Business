import { useState, useEffect, useContext, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { newIdeaSwipeSearch, voteIdea, clearErrors } from "@/redux/actions/ideaSwipeActions";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import Card from "./Card";
import { updateAllIdeas } from "@/utils/Helpers";

const Swiper = () => {
	const { loading, success, ideaSwipe } = useSelector((state) => state.newIdeaSwipe);
	const dispatch = useDispatch();

	const [cards, setCards] = useState([]);
	const canVote = useRef(false);

	const { loading: sectionIdeaVoteLoading, success: sectionIdeaVoteSuccess, ideaSwipeVote: sectionIdeaVote } = useSelector((state) => state.voteSectionIdea);
	const { loading: ideaSwipeVoteLoading, success: ideaSwipeVoteSuccess, ideaSwipeVote } = useSelector((state) => state.voteIdea);
	const { ideaSwipes } = useSelector((state) => state.allIdeaSwipes);

	const voteCurrentIdea = async (id, type) => {
		const voteInfo = { id: id, type: type };
		dispatch(voteIdea(voteInfo));
	};

	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);

	useEffect(() => {
		if (ideaSwipe) {
			setCards([{ _id: "none" }, ideaSwipe]);
			canVote.current = true;
		}
	}, [ideaSwipe]);

	useEffect(() => {
		if (sectionIdeaVoteSuccess && sectionIdeaVote) {
			updateAllIdeas(ideaSwipes, sectionIdeaVote);
			const matchingObj = cards.find((item) => item._id === sectionIdeaVote.ideaSwipe._id);
			if (matchingObj) {
				setCards((current) =>
					current.filter((card) => {
						return card._id !== sectionIdeaVote.ideaSwipe._id;
					})
				);
				dispatch(newIdeaSwipeSearch());
			}
			dispatch(clearErrors());
		}
	}, [sectionIdeaVote, sectionIdeaVoteSuccess]);
	useEffect(() => {
		if (ideaSwipeVoteSuccess && ideaSwipeVote) {
			updateAllIdeas(ideaSwipes, ideaSwipeVote);
			dispatch(newIdeaSwipeSearch());
			dispatch(clearErrors());
		}
	}, [ideaSwipeVote, ideaSwipeVoteSuccess]);

	const handleVote = async (selectedCard, type) => {
		if (status === "authenticated" && session && session.user && selectedCard._id !== "none") {
			voteCurrentIdea(selectedCard._id, type);
			setCards((current) =>
				current.filter((card) => {
					return card._id !== selectedCard._id;
				})
			);
		} else {
			if (!session || !session.user) setAuthModalOpen(true);
		}
	};

	const activeIndex = cards.length - 1;

	const handleDownvote = () => {
		if (!ideaSwipeVoteLoading && !loading && canVote.current) {
			if (document.getElementById("downvote")) document.getElementById("downvote").click();
			canVote.current = false;
		}
	};
	const handleUpvote = () => {
		if (!ideaSwipeVoteLoading && !loading && canVote.current) {
			if (document.getElementById("upvote")) document.getElementById("upvote").click();
			canVote.current = false;
		}
	};

	// Handle keyboard events
	function handleKeyPress(event) {
		if (event.key === "ArrowLeft") {
			handleDownvote();
		}
		if (event.key === "ArrowRight") {
			handleUpvote();
		}
	}
	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);
	}, []);

	return (
		<div className="relative flex flex-col justify-center items-center min-h-[600px] w-full overflow-hidden">
			<AnimatePresence>
				{cards.map((card, index) => (
					<Card key={card._id} card={card} active={index === activeIndex} handleVote={handleVote} loading={loading} />
				))}
			</AnimatePresence>
			{cards.length === 0 ? <span className="text-light-600 text-xl">You&apos;re all caught up!</span> : null}
		</div>
	);
};

export default Swiper;
