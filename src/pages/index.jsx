import PageWrapper from "@/layout/PageWrapper";
import HeroSection from "@/components/Home/HeroSection";
import DontHaveAnIdeaYet from "@/components/Home/DontHaveAnIdeaYet";
import GuidedByAI from "@/components/Home/GuidedByAI";
import OurOfferings from "@/components/Home/OurOfferings";
import Testimonials from "@/components/Home/Testimonials";
import WhyWeBuiltThis from "@/components/Home/WhyWeBuiltThis";
import Faq from "@/components/Home/Faq";
import AdBanner from "@/components/AdBanner";

export default function HomePage() {
	return (
		<PageWrapper useDefaultContainer={false}>
			<HeroSection />
			<DontHaveAnIdeaYet />
			<GuidedByAI />
			<OurOfferings />
			<AdBanner />
			<Testimonials />
			<WhyWeBuiltThis />
			<Faq />
		</PageWrapper>
	);
}
