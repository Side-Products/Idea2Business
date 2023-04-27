export default function Pill({ variant = "primary", outline = false, rounded, children, classes, innerClasses }) {
	return (
		<span
			className={
				(variant == "primary"
					? (outline ? `bg-gradient-primary-tr-outline ` : `bg-gradient-primary-tr text-light-100 `) +
					  `font-primary font-semibold transition duration-300 `
					: variant == "secondary"
					? (outline ? `bg-gradient-secondary-tr-outline ` : `bg-gradient-secondary-tr text-light-100 `) +
					  `font-primary font-semibold transition duration-300 `
					: variant == "tertiary"
					? (outline ? `bg-gradient-tertiary-r-outline ` : `bg-gradient-tertiary-r text-light-100 `) +
					  `font-primary font-semibold transition duration-300 `
					: ` `) +
				(rounded ? `rounded-full ` : `rounded-lg `) +
				((outline ? `px-1 py-1 ` : `py-1 px-4 `) + (classes ? classes : ` text-xs`))
			}
		>
			{outline ? (
				<span
					className={
						`w-full flex items-center justify-center bg-dark-1000 hover:bg-transparent transition duration-300 ` +
						(rounded ? `rounded-full ` : `rounded-lg `) +
						(innerClasses ? innerClasses : `py-2 `)
					}
				>
					{children}
				</span>
			) : (
				children
			)}
		</span>
	);
}
