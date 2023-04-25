import PageWrapper from "@/layout/PageWrapper";
import { useState, useEffect, useContext } from "react";
import { StatusContext } from "@/store/StatusContextProvider";
import { useSession } from "next-auth/react";
import { newIdeaSwipeSearch, newIdeaSearch, voteIdea, clearErrors } from "@/redux/actions/ideaSwipeActions";
import { wrapper } from "@/redux/redux-store";
import { useSelector, useDispatch } from "react-redux";
import Swiper from "@/components/IdeaSwipe/Swiper";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
	await store.dispatch(newIdeaSwipeSearch(req));

	return {
		props: {},
	};
});

export default function IdeaSwipe({}) {
	const { setError } = useContext(StatusContext);
	const { data: session, status } = useSession();

	const { loading, success, ideaSwipe } = useSelector((state) => state.newIdeaSwipe);
	const dispatch = useDispatch();

	const [ideaName, setIdeaName] = useState((ideaSwipe && ideaSwipe.name) || "");
	const [ideaDescription, setIdeaDescription] = useState((ideaSwipe && ideaSwipe.description) || "");

	// useEffect(() => {
	// 	const callGenerateIdeaEndpoint = async () => {
	// 		try {
	// 			const response = await fetch("/api/generate-idea", {
	// 				method: "POST",
	// 			});
	// 			const data = await response.json();
	// 			// Not enough credits to generate
	// 			if (!data.success && data.error) {
	// 				throw data.message;
	// 			}
	// 			const { name, description } = data;
	// 			setIdeaName(name);
	// 			setIdeaDescription(description);
	// 		} catch (err) {
	// 			setError({
	// 				title: "Something went wrong",
	// 				message: err || "Please try again later.",
	// 				showErrorBox: true,
	// 			});
	// 		}
	// 	};
	// 	if (status === "authenticated" && session && session.user) {
	// 		if (name && description) {
	// 			setIdeaName(name);
	// 			setIdeaDescription(description);
	// 			console.log(name, description);
	// 		} else {
	// 			// dispatch(newIdeaSwipeSearch());
	// 		}
	// 		// callGenerateIdeaEndpoint();
	// 	}
	// }, [session, status, name, description]);

	const { loading: loadingVote, success: voteSuccess, vote } = useSelector((state) => state.voteIdea);
	const voteCurrentIdea = async (type) => {
		const voteInfo = { id: ideaSwipe._id, type: type };
		dispatch(voteIdea(voteInfo));
	};

	useEffect(() => {
		if (ideaSwipe) {
			setIdeaName(ideaSwipe.name);
			setIdeaDescription(ideaSwipe.description);
		}
	}, [ideaSwipe]);

	useEffect(() => {
		if (voteSuccess) {
			dispatch(clearErrors());
			// dispatch(newIdeaSearch());
			console.log("voted");
		}
	}, [vote, voteSuccess, loadingVote]);

	const props = { ideaName, ideaDescription, voteCurrentIdea };

	return (
		<PageWrapper>
			<h1 className="text-[80px] leading-[100px] font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Idea Swipe</h1>

			<div className="w-full flex flex-col items-center justify-center">
				<div className="w-full max-w-[600px]">
					<p className="text-[20px] leading-[30px] text-center text-light-500 mt-2">
						Get a new idea on each swipe and let your creative juices flow!
					</p>
				</div>

				<Swiper {...props} />
			</div>
		</PageWrapper>
	);
}
