import Image from "next/image";

const BlogImage = ({ src, alt, width, height }) => {
	return (
		<div className="flex relative justify-center py-8">
			<Image src={src} alt={alt} width={width} height={height} className="rounded-lg" priority />
		</div>
	);
};

export default BlogImage;
