const CardHeading = ({ sectionStyle, children }) => {
	return (
		<div
			className={
				"relative text-[25px] sm:text-[30px] tracking-[-1.5px] font-semibold leading-[1.2em] " +
				(sectionStyle == 1
					? "section-heading-1"
					: sectionStyle == 2
					? "section-heading-2"
					: sectionStyle == 3
					? "section-heading-3"
					: sectionStyle == 4
					? "section-heading-4"
					: sectionStyle == 5
					? "section-heading-5"
					: sectionStyle == 6
					? "section-heading-6"
					: sectionStyle == 7
					? "section-heading-7"
					: sectionStyle == 8
					? "section-heading-8"
					: "section-heading-default")
			}
		>
			{children}
		</div>
	);
};

export default CardHeading;
