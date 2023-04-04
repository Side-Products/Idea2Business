import PageLayout from "@/layout/PageLayout";
import { getSession } from "next-auth/react";
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
		<PageLayout>
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
		</PageLayout>
	);
}
