export default function RadioButtons({ radioState, setRadioState, radioType, radioId1, radioLabel1, radioId2, radioLabel2 }) {
	return (
		<div className="flex items-center my-2 gap-x-10">
			<div className="flex items-center">
				<input
					id={radioId1}
					type="radio"
					name={radioType}
					className="hidden"
					onClick={() => {
						setRadioState(radioId1);
					}}
					checked={radioState === radioId1}
					onChange={(e) => {}}
				/>
				<label htmlFor={radioId1} className="flex items-center text-sm font-normal cursor-pointer font-secondary">
					<span className="inline-block w-6 h-6 mr-2 border-2 rounded-full border-[#363636] flex-no-shrink"></span>
					{radioLabel1}
				</label>
			</div>

			<div className="flex items-center">
				<input
					id={radioId2}
					type="radio"
					name={radioType}
					className="hidden"
					onClick={() => {
						setRadioState(radioId2);
					}}
					checked={radioState === radioId2}
					onChange={(e) => {}}
				/>
				<label htmlFor={radioId2} className="flex items-center text-sm font-normal cursor-pointer font-secondary">
					<span className="inline-block w-6 h-6 mr-2 border-2 rounded-full border-[#363636] flex-no-shrink"></span>
					{radioLabel2}
				</label>
			</div>
		</div>
	);
}
