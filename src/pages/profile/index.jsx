import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import { getProjects } from "@/redux/actions/projectActions";
import { wrapper } from "@/redux/redux-store";
import { Projects } from "@/components/Profile/Projects";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
	await store.dispatch(getProjects(req, query.page, query.search));
});

export default function Profile() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-light-200 dark:bg-dark-1000">
				<div className="w-full max-w-[1920px] py-36 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<Projects />
				</div>
			</div>
		</>
	);
}
