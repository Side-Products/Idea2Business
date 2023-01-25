import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/site_logo.png";
// import Socials from "../Socials";

const Footer = () => {
	return (
		<div className="flex justify-center w-full dark:bg-dark-900">
			<div className="footer dark:bg-dark-900">
				<div className="w-full flex justify-between items-center">
					<Image src={logo} alt="P~P logo" width="60" className="rounded-md" />
					<p className="font-primary sm:text-lg text-base text-primary-500">Project~Product</p>
				</div>

				<div className="grid grid-cols-2 gap-y-10 md:gap-y-0 md:flex flex-wrap font-primary justify-between border-t-2 border-light-300 dark:border-light-900 w-full py-8 mt-5">
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Quick Links</p>
						<ul className="space-y-2">
							<li className="hover:text-primary-500">
								<Link href="/" className="links">
									Home
								</Link>
							</li>
							<li className="hover:text-primary-500">
								<Link href="/mxcatalog/new-releases">New Releases</Link>
							</li>
							<li className="hover:text-primary-500">
								<Link href="/mxcatalog/explore">Explore</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Account</p>
						<ul className="space-y-2"></ul>
					</div>
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Support</p>
						<ul className="space-y-2">
							<li className="hover:text-primary-500">
								<Link href="/contact-us">Contact Us</Link>
							</li>
							<li className="hover:text-primary-500">
								<Link href="/faq">FAQ</Link>
							</li>
							<li className="hover:text-primary-500">
								<Link href="/report-a-bug">Report a Bug</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Resources</p>
						<ul className="space-y-2">
							<li className="hover:text-primary-500">
								<Link href="/help-center">Help Center</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">General</p>
						<ul className="space-y-2">
							<li className="hover:text-primary-500">
								<Link href="/">About Us</Link>
							</li>
							<li className="hover:text-primary-500">
								<Link href="/cfh/cfb">Community</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center space-y-5 mb-4 sm:flex-row sm:justify-between sm:items-center w-full mt-3 sm:space-y-2 sm:mb-0">
					{/* <div className="space-y-2">
						<p className="font-semibold text-lg text-center sm:text-left">Follow us on</p>
						<Socials />
					</div> */}
					<div className="grid grid-cols-2 gap-2 gap-x-10 md:gap-x-8 md:pt-6 lg:gap-0 lg:flex justify-between lg:space-x-6 xl:space-x-28 font-primary">
						<li className="text-xs text-neutral-400 list-none">
							<Link href="https://drive.google.com/file/d/1cbK9O_fKX4eaIQgIU9Lc2JADUg5P3Qz8/view?usp=sharing">
								<span target="_blank" rel="noopener noreferrer">
									Privacy Policy
								</span>
							</Link>
						</li>
						<li className="text-xs text-neutral-400 list-none">
							<Link href="https://drive.google.com/file/d/1Av96OC67-zCfmFuQrAeGT7ruAPcft4Yl/view?usp=sharing">
								<span target="_blank" rel="noopener noreferrer">
									Terms of Services
								</span>
							</Link>
						</li>
						<li className="text-xs text-neutral-400 list-none">
							<Link href="https://medium.com/@musixverse">
								<span target="_blank" rel="noopener noreferrer">
									Blogs
								</span>
							</Link>
						</li>
						<li className="text-xs text-neutral-400 list-none">
							<Link href="/contact-us">Contact Us</Link>
						</li>
					</div>
				</div>
				<p className="font-primary text-xs max-w-sm text-center sm:text-left mx-auto sm:mx-0">©2022 All Rights Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
