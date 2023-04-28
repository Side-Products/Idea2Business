import PageWrapper from "@/layout/PageWrapper";
import { mySubscription } from "@/redux/actions/subscriptionActions";
import { wrapper } from "@/redux/redux-store";
import { getSession } from "next-auth/react";
import Pricing from "@/components/Pricing";

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
// 	const session = await getSession({ req: req });
// 	if (!session) {
// 		return {
// 			props: {},
// 		};
// 	}

// 	await store.dispatch(mySubscription(req));

// 	return {
// 		props: { session },
// 	};
// });

export default function PricingPage() {
	return (
		<PageWrapper>
			<h1 className="text-[80px] font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Select, Start, Grow</h1>
			<Pricing />
		</PageWrapper>
	);
}
