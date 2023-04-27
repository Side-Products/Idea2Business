import { useRouter } from "next/router";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function SubscriptionRequiredModal({ isOpen, setOpen }) {
	const router = useRouter();

	return (
		<Modal
			isOpen={isOpen.isOpen}
			classes="max-w-[36rem]"
			title={
				<div className="w-full flex justify-center text-4xl font-semibold tracking-[-1.5px] text-gradient-primary-tr">
					{isOpen.subscriptionPlanRequired} Plan required
				</div>
			}
			titleClasses="justify-start text-start"
			content={
				<>
					<i className="fa-solid fa-sack-dollar text-6xl text-gradient-primary-tr"></i>
					<div className="mt-4 text-center whitespace-pre-wrap max-h-[400px] overflow-y-scroll text-md">
						Invest a couple of dollars to make 1000s in profit
					</div>
					<div className="mt-6 w-full flex items-center justify-center">
						<Button
							type="button"
							variant={"primary"}
							onClick={() => {
								router.push("/pricing");
							}}
							classes="w-2/3 text-md px-4 py-2 mt-8"
						>
							Check out our affordable pricing
							<span className="ml-6 text-lg">
								<i className="fa-solid fa-arrow-right-long"></i>
							</span>
						</Button>
					</div>
				</>
			}
			onClose={() => {
				setOpen({ ...isOpen, isOpen: false });
			}}
		></Modal>
	);
}
