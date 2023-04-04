import PageLayout from "@/layout/PageLayout";
import AllSubscriptions from "@/components/Admin/AllSubscriptions";

export default function Subscriptions() {
	return (
		<PageLayout>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-[40px] sm:text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">All Subscriptions</h1>
				<AllSubscriptions />
			</div>
		</PageLayout>
	);
}
