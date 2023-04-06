const BlogHeader = ({ tags, children }) => {
	return (
		<div className="sm:text-5xl text-5xl text-gradient-primary-tr font-bold pt-12 pb-4">
			{children}
			<div className="grid flex-wrap justify-between w-full grid-cols-12 gap-2">
				<div className="col-span-full">
					{tags.map((tag, index) => {
						return (
							<button
								key={index}
								type="button"
								className="px-6 py-2 mr-3 text-sm font-normal rounded-full cursor-default text-light-300 bg-dark-600"
							>
								{tag}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default BlogHeader;
