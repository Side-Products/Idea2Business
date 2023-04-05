export default function Tooltip({ labelText, message, tooltipLocation, theme }) {
	return (
		<button
			type="button"
			className={"tooltip-button"}
			data-tooltip={message}
			data-tooltip-location={tooltipLocation ? tooltipLocation : "top"}
			data-tooltip-theme={theme ? "glass" : ""}
		>
			{labelText}
		</button>
	);
}
