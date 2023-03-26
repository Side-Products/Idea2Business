import Head from "next/head";
import { title_main_page, privacy_meta_description } from "@/config/constants";
import PrivacyComponent from "@/components/PrivacyPolicy";

export default function PrivacyPolicy() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={privacy_meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
				<div className="w-full max-w-[768px] px-6 md:px-8 lg:px-0 py-40">
					<h1 className="text-[40px] sm:text-[60px] font-bold text-start tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">Privacy Policy</h1>
					<PrivacyComponent />
				</div>
			</div>
		</>
	);
}
