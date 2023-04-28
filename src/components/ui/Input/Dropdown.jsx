export default function Dropdown({ label = "", id, options = [], setChoice }) {
	return (
		<div className="flex-col items-start justify-start inline-block">
			{label && <p className="text-dark-400 text-sm font-medium mb-1">{label}</p>}
			<select
				id={id}
				className="focus:ring-primary-500 transition duration-300 text-dark-300 border-gray-300 text-sm rounded-md cursor-pointer p-[2px] px-2 border-transparent border-r-[6px]"
				onChange={(e) => setChoice(e.target.value)}
			>
				{options.map((option) => {
					return (
						<option key={option} name={id} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
}
