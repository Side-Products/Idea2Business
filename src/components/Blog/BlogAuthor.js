import Image from "next/image";
import Link from "next/link";

const BlogAuthor = ({ name, username, avatar, lastUpdated }) => {
	return (
		<Link href={`https://twitter.com/${username}`} target="_blank" rel="noopener noreferrer">
			<div className="flex justify-between cursor-pointer w-fit">
				<div className="flex">
					<div className="relative w-16 h-16 rounded-full overflow-hidden">
						<Image src={avatar} alt={"artist avatar"} layout="fill" />
					</div>
					<div className="flex flex-col justify-center ml-3">
						<div className="font-primary font-bold text-lg">{name}</div>
						<div className="font-primary mt-2 text-sm text-gray-400">{lastUpdated}</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default BlogAuthor;
