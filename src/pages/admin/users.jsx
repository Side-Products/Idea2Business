import PageLayout from "@/layout/PageLayout";
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
		<PageLayout>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">All Users</h1>
				<AllUsers />
			</div>
		</PageLayout>
	);
}
