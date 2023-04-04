import PageWrapper from "@/layout/PageWrapper";
import { getSession } from "next-auth/react";
import AllSearches from "@/components/Admin/AllSearches";
import { getAllProjects } from "@/redux/actions/projectActions";
import { wrapper } from "@/redux/redux-store";

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

	await store.dispatch(getAllProjects(req, query.page, query.search));

	return {
		props: { session },
	};
});

export default function Searches() {
	return (
		<PageWrapper>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="mb-6 text-[40px] sm:text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">All Searches</h1>
				<AllSearches />
			</div>
		</PageWrapper>
	);
}
