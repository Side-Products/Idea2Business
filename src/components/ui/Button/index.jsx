export default function Button({ variant = "primary", outline = false, rounded, type, disabled, onClick, children, classes, innerClasses, isLoading = false }) {
	return (
		<button
			type={type ? type : "submit"}
			disabled={disabled || isLoading ? disabled : false}
			onClick={() => (!isLoading && !disabled && onClick ? onClick() : {})}
			className={
				`w-full flex items-center justify-center ` +
				(isLoading ? `cursor-default ` : `cursor-pointer `) +
				(variant == "primary"
					? (outline
							? isLoading
								? `bg-gradient-primary-tr-outline `
								: `bg-gradient-primary-tr-outline `
							: (isLoading ? `bg-gradient-primary-tr-loading ` : `bg-gradient-primary-tr `) + `text-light-100 `) +
					  `font-primary font-semibold transition duration-300 `
					: variant == "secondary"
					? (outline
							? isLoading
								? `bg-gradient-secondary-tr-outline `
								: `bg-gradient-secondary-tr-outline `
							: (isLoading ? `bg-gradient-secondary-tr-loading ` : `bg-gradient-secondary-tr `) + `text-light-100 `) +
					  `font-primary font-semibold transition duration-300 `
					: variant == "default"
					? (outline
							? isLoading
								? `bg-gradient-default-tr-outline `
								: `bg-gradient-default-tr-outline `
							: (isLoading ? `bg-gradient-default-tr-loading ` : `bg-gradient-default-tr `) + `text-light-100 `) +
					  `font-primary font-semibold transition duration-300 `
					: ` `) +
				(rounded ? `rounded-full ` : `rounded-lg `) +
				(classes ? classes : `text-lg ` + (outline ? `px-1 py-1` : `px-8 py-2`))
			}
		>
			{outline ? (
				isLoading ? (
					<span
						className={
							`w-full flex items-center justify-center bg-dark-1000 ` +
							(rounded ? `rounded-full ` : `rounded-lg `) +
							(innerClasses ? innerClasses : `py-2 `)
						}
					>
						<span className="loader"></span>
					</span>
				) : (
					<span
						className={
							`w-full flex items-center justify-center bg-dark-1000 hover:bg-transparent transition duration-300 ` +
							(rounded ? `rounded-full ` : `rounded-lg `) +
							(innerClasses ? innerClasses : `py-2 `)
						}
					>
						{children}
					</span>
				)
			) : isLoading ? (
				<span className="loader"></span>
			) : (
				children
			)}
		</button>
	);
}
