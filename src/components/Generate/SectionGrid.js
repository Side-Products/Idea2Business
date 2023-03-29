const SectionGrid = ({ children }) => {
	return (
		<div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-6 gap-x-10 md:gap-x-4 lg:gap-x-26 xl:gap-x-8">
			{children}
		</div>
	);
};

export default SectionGrid;
