import PageLayout from "@/layout/PageLayout";
import HeroSection from "@/components/Home/HeroSection";
import GuidedByAI from "@/components/Home/GuidedByAI";
import OurOfferings from "@/components/Home/OurOfferings";
import Testimonials from "@/components/Home/Testimonials";
import WhyWeBuiltThis from "@/components/Home/WhyWeBuiltThis";
import Faq from "@/components/Home/Faq";

export default function HomePage() {
	return (
		<PageLayout useDefaultContainer={false}>
			<HeroSection />
			<GuidedByAI />
			<OurOfferings />
			<Testimonials />
			<WhyWeBuiltThis />
			<Faq />
		</PageLayout>
	);
}
