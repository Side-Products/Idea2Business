export default function CustomButton({
	primary = false,
	outline = false,
	light = false,
	error = false,
	onClick,
	children,
	classes,
	rounded,
	type,
	disabled,
	isLoading = false,
}) {
	return (
		<button
			type={type ? type : "submit"}
			onClick={() => (onClick ? onClick() : {})}
			className={
				`w-full flex items-center justify-center ` +
				(primary
					? (isLoading ? `bg-primary-800` : `bg-primary-500 hover:bg-primary-600`) +
					  (rounded ? ` rounded-full` : ` rounded-lg`) +
					  ` font-primary font-semibold text-light-100 transition duration-300 cursor-pointer ${classes ? classes : "text-lg px-8 py-2"}`
					: outline
					? (rounded ? ` rounded-full` : ` rounded-lg`) +
					  ` bg-dark-600 hover:bg-primary-600 border-2 border-primary-500 font-primary font-semibold transition duration-300 cursor-pointer  ${
							classes ? classes : "text-lg px-8 py-2"
					  }`
					: error
					? (rounded ? ` rounded-full` : ` rounded-lg`) +
					  ` bg-error-400 hover:bg-error-500 font-primary font-semibold text-light-100 transition duration-300 cursor-pointer ${
							classes ? classes : "text-lg px-8 py-2"
					  }`
					: light
					? (rounded ? ` rounded-full` : ` rounded-lg`) +
					  ` bg-light-300/70 hover:bg-primary-500 font-primary font-semibold text-dark-600 hover:text-light-100 transition duration-200 cursor-pointer ${
							classes ? classes : "text-lg px-8 py-2"
					  }`
					: (rounded ? ` rounded-full` : ` rounded-lg`) +
					  ` bg-light-100 hover:bg-light-200 font-primary font-semibold text-dark-600 transition duration-300 cursor-pointer ${
							classes ? classes : "text-lg px-8 py-2"
					  }`)
			}
			disabled={disabled ? disabled : false}
		>
			{isLoading ? <span className="loader"></span> : children}
		</button>
	);
}
