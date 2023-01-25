import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { title_main_page, meta_description } from "@/config/constants";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="w-screen h-screen flex flex-col relative items-center justify-center">
				<div className="absolute w-full h-full">
					<Image src={"/bg-4.jpg"} alt="bg env" priority fill style={{ objectFit: "cover" }}></Image>
				</div>
				<div className="z-10 flex flex-col items-center justify-center space-y-12 w-full h-full backdrop-blur-[2px] backdrop-brightness-75">
					<h1 className="-mt-28 font-primary tracking-wide font-bold text-[140px] text-white">Project~Product</h1>
					<Link href={"/generate"} passHref>
						<button className="rounded-3xl px-8 py-2 bg-transparent border border-white text-center font-primary text-white ">
							Enter the magical portal
						</button>
					</Link>
				</div>
			</div>
		</>
	);
}
