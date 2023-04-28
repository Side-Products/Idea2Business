import PageWrapper from "@/layout/PageWrapper";
import { getSession } from "next-auth/react";
import { getMyIdeas } from "@/redux/actions/ideaActions";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { wrapper } from "@/redux/redux-store";
import { useSelector } from "react-redux";
import UserDetails from "@/components/Profile/UserDetails";
import { Ideas } from "@/components/Profile/Searches/Ideas";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
	const session = await getSession({ req: req });

	if (!session) {
		return {
			redirect: {
				destination: "/?login",
				permanent: false,
			},
		};
	}

	await store.dispatch(getMyIdeas(req, query.page, query.search));
	// await store.dispatch(mySubscription(req));

	return {
		props: { session },
	};
});

export default function Profile() {
	const { ideas, resultsPerPage, ideasCount, filteredIdeasCount, error } = useSelector((state) => state.myIdeas);

	return (
		<PageWrapper>
			<UserDetails ideasCount={ideasCount} />
			<div className="w-full flex flex-col">
				<h1 className="text-6xl font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Past Searches</h1>
				<Ideas ideas={ideas} resultsPerPage={resultsPerPage} ideasCount={ideasCount} filteredIdeasCount={filteredIdeasCount} error={error} />
			</div>
		</PageWrapper>
	);
}
