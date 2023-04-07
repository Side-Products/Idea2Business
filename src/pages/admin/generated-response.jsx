import PageWrapper from "@/layout/PageWrapper";
import { getSession } from "next-auth/react";
import AllGeneratedResponses from "@/components/Admin/AllGeneratedResponses";
import { getAllGeneratedResponses } from "@/redux/actions/generatedResponseActions";
import { wrapper } from "@/redux/redux-store";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
	const session = await getSession({ req: req });
	if (!session || session.user.role !== "admin") {
		return {
			redirect: {
				destination: "/?login",
				permanent: false,
			},
		};
	}

	await store.dispatch(getAllGeneratedResponses(req, query.page, query.search));

	return {
		props: { session },
	};
});

export default function GeneratedResponses() {
	return (
		<PageWrapper>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="mb-6 text-[40px] sm:text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">All Generated Responses</h1>
				<AllGeneratedResponses />
			</div>
		</PageWrapper>
	);
}
