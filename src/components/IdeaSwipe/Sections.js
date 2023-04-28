import Section from "@/components/IdeaSwipe/Section";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { voteSectionIdea, clearErrors } from "@/redux/actions/ideaSwipeActions";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { updateAllIdeas } from "@/utils/Helpers";

export default function Sections({}) {
	const { loading, ideaSwipes } = useSelector((state) => state.allIdeaSwipes);

	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);

	const dispatch = useDispatch();

	const { loading: sectionIdeaVoteLoading, success: sectionIdeaVoteSuccess, ideaSwipeVote: sectionIdeaVote } = useSelector((state) => state.voteSectionIdea);
	const { loading: ideaSwipeVoteLoading, success: ideaSwipeVoteSuccess, ideaSwipeVote } = useSelector((state) => state.voteIdea);

	useEffect(() => {
		if (sectionIdeaVoteSuccess && sectionIdeaVote) {
			updateAllIdeas(ideaSwipes, sectionIdeaVote);
			dispatch(clearErrors());
		}
	}, [sectionIdeaVote, sectionIdeaVoteSuccess]);
	useEffect(() => {
		if (ideaSwipeVoteSuccess && ideaSwipeVote) {
			updateAllIdeas(ideaSwipes, ideaSwipeVote);
			dispatch(clearErrors());
		}
	}, [ideaSwipeVote, ideaSwipeVoteSuccess]);

	const voteCurrentIdea = async (card, type) => {
		// Updating results on client side for faster response
		const newVote = type == "upvote" ? 1 : -1;
		const oldVote = card.vote;
		if (oldVote == 1 || oldVote == -1)
			updateAllIdeas(ideaSwipes, { ideaSwipe: { _id: card._id, votes: card.votes + newVote + newVote }, vote: type == "upvote" ? 1 : -1 });
		else updateAllIdeas(ideaSwipes, { ideaSwipe: { _id: card._id, votes: card.votes + newVote }, vote: type == "upvote" ? 1 : -1 });

		// Sending to server
		const voteInfo = { id: card._id, type: type };
		dispatch(voteSectionIdea(voteInfo));
	};

	const handleVote = async (selectedCard, type) => {
		if (status === "authenticated" && session && session.user) {
			if ((selectedCard.vote == -1 && type == "downvote") || (selectedCard.vote == 1 && type == "upvote")) {
				// Don't vote
			} else {
				voteCurrentIdea(selectedCard, type);
			}
		} else {
			setAuthModalOpen(true);
		}
	};

	return (
		!loading && (
			<>
				<Section heading={"🏆 This month's top ideas"} cards={ideaSwipes.monthlyTop} handleVote={handleVote} />
				<Section heading={"🎖️ This week's top ideas"} cards={ideaSwipes.weeklyTop} handleVote={handleVote} />
				<Section heading={"🏅 Yesterday's top ideas"} cards={ideaSwipes.yesterdayTop} handleVote={handleVote} />
				<Section heading={"⭐️ Today's top ideas"} cards={ideaSwipes.todayTop} handleVote={handleVote} />
				<Section heading={"🌟 New ideas just in"} cards={ideaSwipes.newTop} handleVote={handleVote} />
				<Section heading={"💯 All-time top ideas"} cards={ideaSwipes.allTimeTop} handleVote={handleVote} />
			</>
		)
	);
}
