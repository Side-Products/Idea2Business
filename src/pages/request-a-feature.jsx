import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import FeatureRequest from "@/components/RequestAFeature";

export default function RequestAFeature() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<h1 className="text-[40px] sm:text-[60px] font-bold text-center tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">
						Request a Feature
					</h1>
					<FeatureRequest />
				</div>
			</div>
		</>
	);
}
