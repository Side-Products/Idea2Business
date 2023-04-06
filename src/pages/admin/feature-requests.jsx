import PageWrapper from "@/layout/PageWrapper";
import AllFeatureRequests from "@/components/Admin/AllFeatureRequests";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import { adminGetFeatureRequests } from "@/redux/actions/featureRequestActions";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
	const session = await getSession({ req: req });

	if (!session || session.user.role !== "admin") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	await store.dispatch(adminGetFeatureRequests(req));

	return {
		props: { session },
	};
});

export default function ContactUsMessages() {
	return (
		<PageWrapper>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-[60px] font-bold text-center tracking-[-1px] leading-[70px] text-gradient-primary-tr">All Feature Requests</h1>
				<AllFeatureRequests />
			</div>
		</PageWrapper>
	);
}
