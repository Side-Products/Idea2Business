import Link from "next/link";

const BlogLink = ({ children, link }) => {
	return (
		<div className="text-base inline-block underline font-primary tracking-[0.4px] leading-[26px]">
			<Link href={link} target="_blank" rel="noopener noreferrer">
				{children}
			</Link>
		</div>
	);
};

export default BlogLink;
