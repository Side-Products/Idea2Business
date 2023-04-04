import PageLayout from "@/layout/PageLayout";
import FeatureRequest from "@/components/RequestAFeature";

export default function RequestAFeature() {
	return (
		<PageLayout>
			<h1 className="text-[40px] sm:text-[60px] font-bold text-center tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">Request a Feature</h1>
			<FeatureRequest />
		</PageLayout>
	);
}
