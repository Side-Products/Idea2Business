import Head from "next/head";
import { getSession } from "next-auth/react";
import { title_main_page, meta_description } from "@/config/constants";
import { getMyProjects } from "@/redux/actions/projectActions";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { wrapper } from "@/redux/redux-store";
import { useSelector } from "react-redux";
import UserDetails from "@/components/Profile/UserDetails";
import { Projects } from "@/components/Profile/Searches/Projects";

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

	await store.dispatch(getMyProjects(req, query.page, query.search));
	await store.dispatch(mySubscription(req));

	return {
		props: { session },
	};
});

export default function Profile() {
	const { projects, resultsPerPage, projectsCount, filteredProjectsCount, error } = useSelector((state) => state.myProjects);

	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-light-200 dark:bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<UserDetails projectsCount={projectsCount} />
					<div className="w-full flex flex-col">
						<h1 className="text-6xl font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Past Searches</h1>
						<Projects
							projects={projects}
							resultsPerPage={resultsPerPage}
							projectsCount={projectsCount}
							filteredProjectsCount={filteredProjectsCount}
							error={error}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
