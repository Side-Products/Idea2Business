export default function Dropdown({ label, id, options }) {
	return (
		<div className="w-full flex flex-col justify-end">
			<p className="text-dark-400 text-sm font-medium mb-1">{label}</p>
			<select
				id={id}
				className="w-full focus:ring-primary-500 focus:border-primary-500 transition duration-300 text-dark-300 border-gray-300 text-sm rounded-md cursor-pointer"
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
