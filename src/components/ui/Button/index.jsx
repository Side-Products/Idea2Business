export default function Button({ variant = "primary", outline = false, type, disabled, onClick, children, classes, rounded, isLoading = false }) {
	return (
		<button
			type={type ? type : "submit"}
			disabled={disabled ? disabled : false}
			onClick={() => (onClick ? onClick() : {})}
			className={
				`w-full flex items-center justify-center ` +
				(isLoading ? `cursor-default ` : `cursor-pointer `) +
				(variant == "primary"
					? (outline
							? isLoading
								? `border-2 border-transparent bg-primary-200 `
								: `border-2 border-primary-500 bg-dark-600 hover:bg-primary-600 hover:text-light-100 text-primary-500 `
							: (isLoading
									? `bg-dark-200 `
									: `bg-gradient-to-r from-rose-500 to-orange-500 animate-bg hover:bg-gradient-to-r hover:animate-bg hover:from-rose-600 hover:to-orange-600 `) +
							  `text-light-100 `) + `font-primary font-semibold transition duration-300 `
					: (variant = "secondary"
							? (outline
									? isLoading
										? `border-2 border-transparent bg-secondary-200 `
										: ` `
									: (isLoading ? `bg-secondary-300 ` : `bg-light-300/70 hover:bg-primary-500 text-dark-600 `) + `text-light-100 `) +
							  `font-primary font-semibold transition duration-300 `
							: ` `)) +
				(rounded ? `rounded-full ` : `rounded-lg `) +
				(classes ? classes : `text-lg px-8 py-2`)
			}
		>
			{isLoading ? <span className="loader"></span> : children}
		</button>
	);
}
