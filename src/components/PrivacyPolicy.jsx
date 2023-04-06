import Link from "next/link";
import { product_name, product_website_legal, company_name, contact_email } from "@/config/constants";

export default function PrivacyPolicy() {
	return (
		<div className="w-full flex flex-col justify-center items-center pb-20 text-light-400">
			<div className="w-full relative text-base max-w-[1500px]">
				<div className="text-primary-400 text-sm pt-1">(Effective as of Mar 31, 2023)</div>

				<div className="mt-5 font-secondary text-[1em] tracking-[0.5px]">
					Protecting your private information is our priority. This Statement of Privacy applies to{" "}
					<Link href={"/"} className="text-gradient-primary-tr">
						{product_name}
					</Link>{" "}
					(“{company_name}”) and{" "}
					<Link href={"/"} className="text-gradient-primary-tr">
						{product_website_legal}
					</Link>{" "}
					and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to {product_name}{" "}
					include{" "}
					<Link href={"/"} className="text-gradient-primary-tr">
						{product_website_legal}
					</Link>{" "}
					and {product_name}. For the purposes of this policy,{" "}
					<Link href={"/"} className="text-gradient-primary-tr">
						{product_website_legal}
					</Link>{" "}
					will hereinafter be referred to as (“Site”). By using the Site, you consent to the data practices described in this statement.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Collection of your Personal Information</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					In order to better provide you with products, services, and content offerings on our Site, {product_name} may collect personally
					identifiable information, such as your:
					<ol className="list-decimal pl-8">
						<li>First and Last Name</li>
						<li>Birthdate</li>
						<li>Email Address</li>
						<li>Username and Password</li>
						<li>Social Media Account OAuth credentials</li>
						<li>User pictures</li>
					</ol>
					<br />
					If you purchase {product_name}&apos;s products and services, we may collect billing and card information. This information is used to
					complete the purchase transaction.
					<br />
					The Site may also collect anonymous demographic information, which is not unique to you, including but not limited to your:
					<ol className="list-decimal pl-8">
						<li>Age</li>
						<li>Gender</li>
					</ol>
					<br />
					We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide
					certain personal information to us when you elect to use certain products or services available on the Site. These may include:
					<ol className="list-decimal pl-8">
						<li>registering for an account on our Site;</li>
						<li>transacting on the Site;</li>
						<li>entering a sweepstakes or contest sponsored by us or one of our partners;</li>
						<li>signing up for special offers from selected third parties;</li>
						<li>sending us an email message;</li>
						<li>accessing our third-party site content; and</li>
						<li>submitting your credit card or other payment information when ordering and purchasing products and services on our Site.</li>
					</ol>
					<br />
					To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have
					requested from us. We also may gather additional personal or non-personal information in the future.
					<br />
					<br />
					We may also automatically collect the following categories of network activity and/or device information (some of which may qualify as
					“Personal Information” or “Personal Data” under applicable law) from devices (e.g., mobile, computer, laptop, tablet) used to visit or use
					our Services (&quot;Device Information&quot;):
					<ol className="list-decimal pl-8">
						<li>IP address;</li>
						<li>Device identifier;</li>
						<li>The website you visited before using our Services;</li>
						<li>Browser type;</li>
						<li>Any search terms entered on or through our Services;</li>
						<li>General location data based on your Device Information, such as country, state or province;</li>
						<li>Computer operating system;</li>
						<li>Access times;</li>
						<li>Usage patterns and page views within our Services;</li>
						<li>Log files;</li>
						<li>Cookies;</li>
						<li>Clear gifs; and</li>
						<li>Flash LSOs.</li>
					</ol>
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Use of your Personal Information</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					{product_name} collects and uses your personal information to operate its Site(s) and deliver the services you have requested.{" "}
					{product_name}
					may also use your personally identifiable information to inform you of other products or services available from {product_name} and its
					affiliates.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Sharing Information with Third Parties</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					{product_name} does not sell, rent or lease its customer lists to third parties. {product_name} may share data with trusted partners to help
					perform statistical analysis, make payments, send you email or postal mail, provide customer support, or arrange for deliveries. All such
					third parties are prohibited from using your personal information except to provide these services to {product_name}, and they are required
					to maintain the confidentiality of your information. {product_name} may disclose your personal information, without notice, if required to
					do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process
					served on {product_name} or the Site; (b) protect and defend the rights or property of {product_name}; and/or (c) act under exigent
					circumstances to protect the personal safety of users of {product_name}, or the public.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">International Transfers</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					Some of the parties identified above may be located in countries that do not provide an equivalent level of protection as your home country.
					Where required, we have taken appropriate measures to allow and secure the transfer of information about you to these recipients for the
					purposes described above and in order to comply with local data privacy laws. By using some of our services, and providing us information
					about you, you consent to the international transfer of information about you to the above parties.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Automatically Collected Information</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					Information about your computer hardware and software may be automatically collected by the Site. This information can include: your IP
					address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the
					service, to maintain quality of the service, and to provide general statistics regarding use of the Site(s).
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Use of Cookies</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					The Site may use (&quot;cookies&quot;) to help you personalize your online experience. A cookie is a text file that is placed on your hard
					disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you,
					and can only be read by a web server in the domain that issued the cookie to you. One of the primary purposes of cookies is to provide a
					convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For
					example, if you personalize {product_name} pages, or register with {product_name} site or services, a cookie helps
					{product_name} to recall your specific information on subsequent visits. This simplifies the process of recording your personal information,
					such as billing addresses, shipping addresses, and so on. When you return to the same {product_name} website, the information you previously
					provided can be retrieved, so you can easily use the {product_name} features that you customized. You have the ability to accept or decline
					cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
					If you choose to decline cookies, you may not be able to fully experience the interactive features of the {product_name} services or
					websites you visit.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Links</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					The Site contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other
					sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects
					personally identifiable information.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Right to Deletion</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					Subject to certain exceptions set out below, on receipt of a verifiable request from you, we will:
					<ul className="list-disc pl-8">
						<li>Delete your personal information from our records; and</li>
						<li>Direct any service providers to delete your personal information from their records.</li>
					</ul>
					<br />
					Please note that we may not be able to comply with requests to delete your personal information if it is necessary to:
					<ul className="list-disc pl-8">
						<li>
							Complete the transaction for which the personal information was collected, fulfill the terms of a written warranty or product recall
							conducted in accordance with the law, provide a good or service requested by you, or reasonably anticipated within the context of
							our ongoing business relationship with you, or otherwise perform a contract between you and us;
						</li>
						<li>
							Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity; or prosecute those responsible for
							that activity;
						</li>
						<li>Debug to identify and repair errors that impair existing intended functionality;</li>
						<li>
							Exercise free speech, ensure the right of another consumer to exercise his or her right of free speech, or exercise another right
							provided for by law;
						</li>
						<li>Enable solely internal uses that are reasonably aligned with your expectations based on your relationship with us;</li>
						<li>Comply with an existing legal obligation; or</li>
						<li>
							Otherwise use your personal information, internally, in a lawful manner that is compatible with the context in which you provided
							the information.
						</li>
					</ul>
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Children Under Thirteen</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					{product_name} does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the
					age of thirteen, you must ask your parent or guardian for permission to use the Site and its allied products. We will take appropriate steps
					to delete any Personally Identifiable Information of persons less than 13 years of age that has been collected on our Site without verified
					parental consent upon learning of the existence of such Personally Identifiable Information.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">E-mail Communications</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					From time to time, {product_name} may contact you via email for the purpose of providing announcements, promotional offers, alerts,
					confirmations, surveys, and/or other general communication. If you would like to stop receiving marketing or promotional communications via
					email from {product_name}, you may opt out of such communications by clicking on the UNSUBSCRIBE button.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Changes to this Statement</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					{product_name} reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way
					we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on
					our site, and/or by updating any privacy information on this page. Your continued use of the Site and/or services available through this
					Site after such modifications will constitute your:
					<br />
					(a) acknowledgment of the modified Privacy Policy; and
					<br />
					(b) agreement to abide and be bound by that Policy.
				</div>

				<div className="font-semibold text-gradient-primary-tr leading-[30px] text-[1.6em] mt-12">Contact Information</div>
				<div className="mt-4 font-secondary text-[1em] tracking-[0.5px]">
					{product_name} welcomes your questions or comments regarding this Statement of Privacy. If you believe that {product_name} has not adhered
					to this Statement, please contact {product_name} at:
					<br />
					<a
						href="https://www.google.co.in/maps/search/KH.No.+23%2F2,1st+Floor,Gali+No.5,+Block-A,+Himgiri+Enclave,+Village+Mukandpur,+Delhi,+North+%09%09%09%09%09%09East,+Delhi,+India,+110084/@28.6915721,77.2055784,21z?hl=en&authuser=0"
						target="_blank"
						rel="noopener noreferrer"
						className="font-primary font-semibold dark:text-[#afafaf]"
					>
						<br />
						{company_name}
						<br />
						KH.No. 23/2,1st Floor,Gali No.5, Block-A, Himgiri Enclave, Village Mukandpur, Delhi, North
						<br />
						East, Delhi, India, 110084
						<br />
					</a>
					<br />
					Email Address:
					<br />
					<a href={`mailto:` + contact_email} target="_blank" rel="noopener noreferrer" className="font-primary font-semibold dark:text-[#afafaf]">
						{contact_email}
					</a>
				</div>

				<div className="mt-6 text-gradient-primary-tr">©2023 {company_name} All rights reserved.</div>
			</div>
		</div>
	);
}
