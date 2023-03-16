import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import AllUsers from "@/components/Admin/AllUsers";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import { adminGetAllUsers } from "@/redux/actions/userActions";

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

	await store.dispatch(adminGetAllUsers(req));

	return {
		props: { session },
	};
});

export default function Users() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-light-200 dark:bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<div className="w-full flex flex-col items-center justify-center">
						<h1 className="text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">All Users</h1>
						<AllUsers />
					</div>
				</div>
			</div>
		</>
	);
}
