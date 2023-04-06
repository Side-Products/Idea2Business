import Step from "@/components/ui/Stepper/Step";

export default function VerticalStepper({ step, setStep }) {
	return (
		<ol className="flex flex-col items-start w-full space-y-8">
			<Step
				text="USER INFORMATION"
				isActive={step === 1}
				onClick={() => {
					setStep(1);
				}}
				isComplete={step > 1}
			/>
			<Step
				text="BUSINESS INFORMATION"
				isActive={step === 2}
				onClick={() => {
					setStep(2);
				}}
				isComplete={step > 2}
			/>
			<Step
				text="ADMIN AND OPERATIONS"
				isActive={step === 3}
				onClick={() => {
					setStep(3);
				}}
				isComplete={step > 3}
			/>
			<Step
				text="UPLOAD DOCUMENTS"
				isActive={step === 4}
				onClick={() => {
					setStep(4);
				}}
				isComplete={step > 4}
			/>
			<Step
				text="PREVIEW"
				isActive={step === 5}
				onClick={() => {
					setStep(5);
				}}
				isComplete={step > 5}
				lastStep={true}
			/>
		</ol>
	);
}
