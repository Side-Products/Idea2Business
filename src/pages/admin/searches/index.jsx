import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
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
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<div className="w-full flex flex-col items-center justify-center">
						<h1 className="mb-10 text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">All Searches</h1>
						<AllSearches />
					</div>
				</div>
			</div>
		</>
	);
}
