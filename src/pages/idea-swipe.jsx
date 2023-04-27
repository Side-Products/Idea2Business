import PageWrapper from "@/layout/PageWrapper";
import { newIdeaSwipeSearchServerSide, getIdeaSwipe, getAllIdeaSwipes, getAllIdeaSwipesUnauthenticatedUser } from "@/redux/actions/ideaSwipeActions";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import Swiper from "@/components/IdeaSwipe/Swiper";
import Sections from "@/components/IdeaSwipe/Sections";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
	const session = await getSession({ req: req });

	if (!session) {
		await store.dispatch(getIdeaSwipe(req));
		await store.dispatch(getAllIdeaSwipesUnauthenticatedUser(req));
		return {
			props: {},
		};
	} else {
		await store.dispatch(newIdeaSwipeSearchServerSide(req));
		await store.dispatch(getAllIdeaSwipes(req));
	}

	return {
		props: { session },
	};
});

export default function IdeaSwipe({}) {
	return (
		<PageWrapper>
			<h1 className="text-[60px] sm:text-[80px] leading-[90px] font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Idea Swipe</h1>

			<div className="w-full flex flex-col items-center justify-center">
				<div className="w-full max-w-[600px]">
					<p className="text-[20px] leading-[30px] text-center text-light-500 mt-2">
						Get a new idea on each swipe and let your creative juices flow!
					</p>
				</div>

				<Swiper />

				<p className="text-dark-100 text-sm">
					<i className="fa-solid fa-xmark"></i> Swipe left, or click your left arrow key to dislike
				</p>
				<p className="text-dark-100 text-sm">
					<i className="fa-solid fa-heart"></i> Swipe right, or click your right arrow key to like
				</p>

				<Sections />
			</div>
		</PageWrapper>
	);
}
