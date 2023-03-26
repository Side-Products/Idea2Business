import Head from "next/head";
import { title_main_page, contactus_meta_description } from "@/config/constants";
import Contactus from "@/components/ContactUs";

export default function ContactUs() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={contactus_meta_description} />
			</Head>

			<div className="w-full flex flex-col items-center min-h-screen bg-dark-1000">
				<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<h1 className="text-[40px] sm:text-[60px] font-bold text-center tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">Contact Us</h1>
					<Contactus />
				</div>
			</div>
		</>
	);
}
