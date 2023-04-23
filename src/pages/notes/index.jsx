import PageWrapper from "@/layout/PageWrapper";
import Link from "next/link";
import Image from "next/image";
import { notes } from "@/config/constants";

export default function ContactUs() {
	return (
		<PageWrapper>
			<h1 className="text-[40px] sm:text-[60px] font-bold text-center tracking-[-1px] text-gradient-primary-tr leading-[1.2em]">Notes</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-16 mt-16">
				{notes &&
					notes.map((note, index) => (
						<Link href={note.link} key={index} className="flex justify-center items-center">
							<div className="w-full h-full group max-w-sm overflow-hidden rounded-2xl cursor-pointer bg-dark-800 border border-[#30363d] shadow hover:shadow-lg transition-all duration-500">
								<div className="relative overflow-hidden w-full h-[240px]">
									<Image
										src={note.image}
										alt="blog cover"
										fill
										priority
										className={
											"object-cover rounded-t-lg brightness-75 group-hover:brightness-90 group-hover:scale-105 group-hover:duration-500 duration-500"
										}
									/>
								</div>

								<div className="p-5 text-lg font-primary text-white w-full">
									<h5 className="mb-2">{note.name}</h5>
								</div>
							</div>
						</Link>
					))}
			</div>
		</PageWrapper>
	);
}
