const SectionHeading = ({ sectionStyle, children }) => {
	return (
		<h2
			className={
				"text-center text-[25px] sm:text-[40px] tracking-[-1.5px] font-semibold leading-[1.2em] mt-20 mb-10 " +
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
					: "section-heading-default")
			}
		>
			{children}
		</h2>
	);
};

export default SectionHeading;
