import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import AllContactUsMessages from "@/components/Admin/AllContactUsMessages";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import { adminGetContactUsMessages } from "@/redux/actions/contactUsActions";

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

	await store.dispatch(adminGetContactUsMessages(req));

	return {
		props: { session },
	};
});

export default function ContactUsMessages() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<div className="w-full flex flex-col items-center justify-center">
						<h1 className="text-[60px] font-bold text-center tracking-[-1px] leading-[70px] text-gradient-primary-tr">All Contact Us Messages</h1>
						<AllContactUsMessages />
					</div>
				</div>
			</div>
		</>
	);
}
