import PageWrapper from "@/layout/PageWrapper";
import { cancellation_and_refund_meta_description } from "@/config/constants";
import CancellationAndRefundComponent from "@/components/CancellationAndRefund";

export default function CancellationAndRefundPolicy() {
	return (
		<PageWrapper description={cancellation_and_refund_meta_description} classes="w-full max-w-[768px] px-6 md:px-8 lg:px-0 py-40">
			<h1 className="text-[40px] sm:text-[60px] font-bold text-start tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">Cancellation & Refund</h1>
			<CancellationAndRefundComponent />
		</PageWrapper>
	);
}
