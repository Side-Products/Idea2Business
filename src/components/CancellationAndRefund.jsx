import Link from "next/link";
import { product_name, product_website_legal, company_name, contact_email } from "@/config/constants";

export default function CancellationAndRefundComponent() {
	return (
		<div className="w-full flex flex-col justify-center items-center pb-20 text-light-400">
			<div className="w-full relative text-base max-w-[1500px]">
				<div className="text-primary-400 text-sm pt-1">(Effective as of Apr 15, 2023)</div>

				<div className="mt-5 font-secondary text-[1em] tracking-[0.5px]">
					At{" "}
					<Link href={"/"} className="text-gradient-primary-tr">
						{product_name}
					</Link>{" "}
					, we strive to provide our customers with the best possible service and experience. We understand that situations may arise that require you
					to cancel or seek a refund for our services, and we are committed to being transparent and fair in our policies.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Cancellation</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					If you wish to cancel our services, please contact us as soon as possible via email at{" "}
					<a href={`mailto:` + contact_email} target="_blank" rel="noopener noreferrer" className="font-primary font-semibold text-[#afafaf]">
						{contact_email}
					</a>{" "}
					or through our contact form on the website. Please include your name, and email address in your cancellation request.
					<br />
					<br />
					We offer a full refund for cancellations made within 24 hours of buying a subscription, provided that significant use of subscription bound
					services has not yet been made. If there has been significant use of services, we may offer a partial refund based on the use of services at
					the time of cancellation.
					<br />
					<br />
					Please note that cancellation may result in the loss of access to certain services or features.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Refunds</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					We stand behind the quality of our work and are committed to ensuring our customers&apos; satisfaction. If you are not satisfied with our
					services, please contact us as soon as possible so we can address your concerns.
					<br />
					<br />
					We offer a full refund if we are unable to deliver the agreed-upon services or if there are any issues with the quality of our work. If you
					are not satisfied with the final product, we may offer revisions or a partial refund based on the extent of the issues.
					<br />
					<br />
					Refunds may take up to 5 business days to process, and we are not responsible for any fees charged by your bank or payment processor.
					<br />
					<br />
					Please note that we do not offer refunds for any services that have been rendered or completed. In addition, we reserve the right to deny a
					refund request if we determine that the request is not made in good faith or if there has been a violation of our terms of service.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Changes to this Policy</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					We may update this Cancellation & Refund Policy from time to time. Any changes will be posted on our website and will become effective
					immediately upon posting. Please check our website periodically for updates.
					<br />
					<br />
					If you have any questions or concerns regarding our Cancellation & Refund Policy, please contact us at{" "}
					<a href={`mailto:` + contact_email} target="_blank" rel="noopener noreferrer" className="font-primary font-semibold text-[#afafaf]">
						{contact_email}
					</a>{" "}
					or through our contact form on the website.
				</div>
			</div>
		</div>
	);
}
