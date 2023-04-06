const BlogSubHeading = ({ useMargin = true, children }) => {
	return <div className={"font-bold text-gray-100 text-[28px] pb-6 " + (useMargin ? "pt-16" : "pt-4")}>{children}</div>;
};

export default BlogSubHeading;
