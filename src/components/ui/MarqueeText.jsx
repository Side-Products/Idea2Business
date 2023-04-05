/**
 * @param {*} (text, classes, marqueeWidth for >= md & smaller devices)
 * @returns Marquee Text component
 */

export default function MarqueeText({ text, classes = "", marqueeWidth = "" }) {
	return (
		<div className={"relative flex overflow-x-hidden " + (marqueeWidth ? marqueeWidth : "w-[104px] md:w-[115px]")}>
			<div className="animate-marquee whitespace-nowrap">
				<h6 className={"mr-4 " + classes}>{text}</h6>
			</div>
			<div className="absolute top-0 animate-marquee2 whitespace-nowrap">
				<h6 className={"mr-4 " + classes}>{text}</h6>
			</div>
		</div>
	);
}
