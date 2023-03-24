import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";

export default function ContactUs() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<div className="w-full flex flex-col items-center justify-center">
						<h1 className="mb-10 text-[40px] sm:text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">Contact Us</h1>
					</div>
				</div>
			</div>
		</>
	);
}
