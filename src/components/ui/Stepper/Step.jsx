export default function Step({ text, isActive, onClick, isComplete, lastStep }) {
	return (
		<li
			onClick={() => onClick()}
			className={
				"flex h-full items-center cursor-pointer " +
				(lastStep
					? ""
					: "after:content-[''] after:absolute after:ml-[17px] after:mt-[68px] after:h-8 after:border after:inline-block " +
					  (isActive || isComplete ? "after:border-primary-600" : "after:border-[#E5E7EB]"))
			}
		>
			<div
				className={
					"relative p-4 rounded-full " +
					(isComplete
						? "bg-primary-500 border-2 border-primary-600"
						: isActive
						? "border-2 border-primary-600 bg-light-100"
						: "border-2 border-gray-300 bg-light-100")
				}
			>
				{isComplete ? (
					<i className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md text-light-100 fas fa-check"></i>
				) : (
					isActive && (
						<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-[5px] bg-primary-600"></span>
					)
				)}
			</div>
			<p className={"ml-4 font-semibold text-xs " + (isActive ? "text-primary-600" : "text-dark-300")}>{text}</p>
		</li>
	);
}
