import PageLayout from "@/layout/PageLayout";
import NewPassword from "@/components/Profile/NewPassword";

export default function Profile() {
	return (
		<PageLayout>
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">Update Password</h1>
				<NewPassword />
			</div>
		</PageLayout>
	);
}
