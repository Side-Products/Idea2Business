import PageLayout from "@/layout/PageLayout";
import { reportabug_meta_description } from "@/config/constants";
import ReportBug from "@/components/ReportABug";

export default function ReportABug() {
	return (
		<PageLayout description={reportabug_meta_description}>
			<h1 className="text-[40px] sm:text-[60px] font-bold text-center tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">Report a Bug</h1>
			<ReportBug />
		</PageLayout>
	);
}
