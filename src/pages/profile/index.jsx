import Head from "next/head";
import { getSession } from "next-auth/react";
import { title_main_page, meta_description } from "@/config/constants";
import { getProjects } from "@/redux/actions/projectActions";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { wrapper } from "@/redux/redux-store";
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

	await store.dispatch(getProjects(req, query.page, query.search));
	await store.dispatch(mySubscription(req));

	return {
		props: { session },
	};
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
					<UserDetails />
					<Projects />
				</div>
			</div>
		</>
	);
}
