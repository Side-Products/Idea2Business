import Image from "next/image";
import DatePicker from "react-datepicker";

export default function DateSelector({ label, startDate, setStartDate }) {
	return (
		<div className="w-full flex flex-col justify-end">
			<p className="text-dark-400 text-sm font-medium mb-1">{label}</p>
			<div className="relative rounded-md">
				<div className="absolute inset-y-0 left-4 flex items-center z-[20]">
					<Image src="/calendar.png" width={14} height={14} alt="calendar" />
				</div>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					minDate={new Date()}
					dateFormat="dd/MM/yyyy"
					fixedHeight
					showDisabledMonthNavigation
					disabledKeyboardNavigation
					showPopperArrow={false}
				/>
			</div>
		</div>
	);
}
