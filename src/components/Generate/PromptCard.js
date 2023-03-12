import Button from "@/components/ui/Button";

export default function PromptCard({ cardsAvailable, handleCardClick, cardText, promptEnterProjectInfo }) {
	return (
		<div
			className="w-full relative flex flex-col group cursor-pointer aspect-square rounded-2xl h-fit sm:h-full bg-gradient-to-r from-[#161616] to-[#202020] shadow hover:shadow-primary-500 overflow-hidden transition-all duration-500"
			onClick={() => {
				if (!cardsAvailable) {
					promptEnterProjectInfo();
				}
			}}
		>
			<>
				<div
					className={
						"relative w-full h-full flex flex-col justify-center items-center p-4 transition-all " +
						(!cardsAvailable && "duration-500 group-hover:opacity-0")
					}
				>
					<h3 className="font-secondary font-medium text-md text-center">{cardText}</h3>
					{!cardsAvailable && (
						<span className="absolute bottom-3 right-4">
							<i className="fa-solid fa-lock"></i>
						</span>
					)}
				</div>

				{cardsAvailable ? (
					<div className="w-full absolute bottom-4 flex space-x-2 px-4 py-1 justify-center items-center">
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								handleCardClick("view", cardText);
							}}
							rounded={true}
							classes="text-xs px-1 py-1 gap-x-1"
						>
							<i className="fa-solid fa-eye"></i>&nbsp;View
						</Button>
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								handleCardClick("download", cardText);
							}}
							rounded={true}
							classes="text-xs px-3 py-1 gap-x-1"
						>
							<i className="fa-solid fa-download"></i>&nbsp;Download
						</Button>
					</div>
				) : (
					<div className="absolute flex flex-col w-full h-full justify-center items-center transition-all duration-700 opacity-0 group-hover:opacity-100">
						<i className="fa-solid fa-lock text-4xl"></i>
						<p className="px-8 mt-2 text-xs text-center">Please enter project details first</p>
					</div>
				)}
			</>
		</div>
	);
}
