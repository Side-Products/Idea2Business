const SectionHeading = ({ sectionStyle, sectionId, children }) => {
	return (
		<div
			className={
				"relative text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10 " +
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
			<span id={sectionId} className="absolute -top-32"></span>
			{children}
		</div>
	);
};

export default SectionHeading;
