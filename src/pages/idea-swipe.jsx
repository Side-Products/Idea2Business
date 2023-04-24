import PageWrapper from "@/layout/PageWrapper";
import { getTimestamp } from "@/utils/Helpers";
import { useState, useEffect, useContext } from "react";
import { StatusContext } from "@/store/StatusContextProvider";
import { useSession } from "next-auth/react";
import { newIdeaSwipeSearch, voteIdea } from "@/redux/actions/ideaSwipeActions";
import { wrapper } from "@/redux/redux-store";
import { useSelector, useDispatch } from "react-redux";

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
		if (voteSuccess) {
			// dispatch(newIdeaSwipeSearch());
			console.log("voted");
		}
	}, [vote, voteSuccess, loadingVote]);

	return (
		<PageWrapper>
			<h1 className="text-[80px] leading-[100px] font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Idea Swipe</h1>

			<div className="w-full flex flex-col items-center justify-center">
				<div className="w-full max-w-[600px]">
					<p className="text-[20px] leading-[30px] text-center text-light-500 mt-2">
						Idea Swipe is a simple, yet powerful tool that generates ideas. It&apos;s a great way to get your creative juices flowing.
					</p>
				</div>

				<div className="relative max-w-[400px] bg-[#FFF8C9] text-lg text-dark-900 font-semibold rounded-xl pt-6 pb-9 px-6 mt-20 shadow-xl">
					<div className="w-full flex justify-center text-center font-bold text-[22px]">{ideaName}</div>
					<div className="mt-6 text-center">{ideaDescription}</div>
					<div className="flex justify-between items-center px-16 mt-10">
						<label
							onClick={() => voteCurrentIdea("downvote")}
							className="flex group justify-center items-center w-14 h-14 rounded-full border-2 border-dark-900 hover:bg-dark-900 transition duration-300 cursor-pointer"
						>
							<i className="fa-solid fa-xmark text-2xl text-dark-900 group-hover:text-[#FFF8C9]"></i>
						</label>
						<span className="text-dark-900 font-bold">32</span>
						<label
							onClick={() => voteCurrentIdea("upvote")}
							className="flex group justify-center items-center w-14 h-14 rounded-full border-2 border-rose-500 hover:bg-rose-500 transition duration-300 cursor-pointer"
						>
							<i className="fa-solid fa-heart text-2xl text-rose-500 group-hover:text-[#FFF8C9]"></i>
						</label>
					</div>
					<span className={"right-3 bottom-2 absolute text-xs text-light-600"}>{getTimestamp(Date.now()).slice(0, 10)}</span>
				</div>
			</div>
		</PageWrapper>
	);
}
