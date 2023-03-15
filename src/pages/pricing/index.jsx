import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import Pricing from "@/components/Pricing";

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
	const session = await getSession({ req: req });
	if (!session) {
		return {
			props: {},
		};
	}

	await store.dispatch(mySubscription(req));

	return {
		props: { session },
	};
});

export default function PricingPage() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-light-200 dark:bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<div className="w-full flex flex-col items-center justify-center">
						<h1 className="text-[80px] font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Select, Start, Grow</h1>
						<Pricing />
					</div>
				</div>
			</div>
		</>
	);
}