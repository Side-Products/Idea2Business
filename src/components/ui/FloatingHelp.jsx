import Link from "next/link";

export default function FloatingHelp() {
	return (
		<div className="hidden sm:block fixed right-0 bottom-0 z-30 pr-4 pb-4">
			<div className="relative group">
				<ul className="absolute hidden w-full pb-10 group-hover:block -top-36">
					<ul className="flex flex-col w-full bg-dark-500 rounded-xl">
						<li className="w-full px-4 py-3 text-sm bg-transparent cursor-pointer font-secondary rounded-t-xl whitespace-nowrap hover:bg-dark-800">
							<Link href="https://discord.com/invite/rXKb7rCqjG" className="flex items-center" passHref>
								<i className="text-lg fa-brands fa-discord"></i>
								<span className="ml-2">Discord</span>
							</Link>
						</li>
						<li className="w-full px-4 py-3 text-sm bg-transparent cursor-pointer font-secondary whitespace-nowrap hover:bg-dark-800">
							<Link href="https://chat.whatsapp.com/KNT3YkJubsV7VagUeGMDr7" className="flex items-center" passHref>
								<i className="text-lg fa-brands fa-whatsapp"></i>
								<span className="ml-2">WhatsApp</span>
							</Link>
						</li>
						<li className="w-full px-4 py-3 text-sm bg-transparent cursor-pointer font-secondary rounded-b-xl whitespace-nowrap hover:bg-dark-800">
							<Link href="/contact-us" className="flex items-center" passHref>
								<i className="fa-solid fa-comment-dots"></i>
								<span className="ml-2">Contact Us</span>
							</Link>
						</li>
					</ul>
				</ul>
				<p className="flex items-center px-6 py-3 mt-5 text-sm font-medium md:text-base rounded-lg shadow-2xl font-primary bg-dark-600">
					<span className="mr-3 material-symbols-outlined">headset_mic</span>
					Get in Touch
				</p>
			</div>
		</div>
	);
}
