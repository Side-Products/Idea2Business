import Head from "next/head";
import { title_main_page, meta_description } from "@/config/constants";
import HeroSection from "@/components/Home/HeroSection";
import GuidedByAI from "@/components/Home/GuidedByAI";
import OurOfferings from "@/components/Home/OurOfferings";
import Testimonials from "@/components/Home/Testimonials";
import WhyWeBuiltThis from "@/components/Home/WhyWeBuiltThis";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<HeroSection />

			<GuidedByAI />

			<OurOfferings />

			<Testimonials />

			<WhyWeBuiltThis />
		</>
	);
}
