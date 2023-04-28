import PageWrapper from "@/layout/PageWrapper";
import AllNewsletters from "@/components/Admin/AllNewsletters";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import { adminGetNewsletters } from "@/redux/actions/newsletterActions";

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

	await store.dispatch(adminGetNewsletters(req));

	return {
		props: { session },
	};
});

export default function Newsletters() {
	return (
		<PageWrapper>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-[60px] font-bold text-center tracking-[-1px] leading-[70px] text-gradient-primary-tr">All Newsletter Entries</h1>
				<AllNewsletters />
			</div>
		</PageWrapper>
	);
}
