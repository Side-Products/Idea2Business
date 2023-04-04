import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { useSession } from "next-auth/react";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { twitter_url, linkedin_url } from "@/config/constants";

const Footer = () => {
	const { data: session } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);

	return (
		<div className="flex justify-center w-full">
			<div className="w-full max-w-[1920px] pt-12 pb-12 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36 bg-dark-900">
				<div className="w-full flex justify-between items-center">
					<Image src={logo} alt="P~P logo" width="60" className="rounded-md" />
					<p className="font-primary sm:text-lg text-base font-medium text-gradient-primary-tr">Idea~Business</p>
				</div>

				<div className="grid grid-cols-2 gap-y-10 md:gap-y-0 md:flex flex-wrap font-primary justify-between border-t-2 border-dark-600  w-full py-8 mt-5">
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Quick Links</p>
						<ul className="space-y-2">
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/">Home</Link>
							</li>
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/generate">Generate</Link>
							</li>
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/pricing">Pricing</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Account</p>
						<ul className="space-y-2">
							<li className="text-light-500 hover:text-primary-400 cursor-pointer">
								{session && session.user ? <Link href="/profile">Profile</Link> : <span onClick={() => setAuthModalOpen(true)}>Profile</span>}
							</li>
							<li className="text-light-500 hover:text-primary-400 cursor-pointer">
								{session && session.user ? (
									<Link href="/profile">Past Searches</Link>
								) : (
									<span onClick={() => setAuthModalOpen(true)}>Past Searches</span>
								)}
							</li>
						</ul>
					</div>

					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">Support</p>
						<ul className="space-y-2">
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/contact-us">Contact Us</Link>
							</li>
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/report-a-bug">Report a Bug</Link>
							</li>
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/request-a-feature">Request Feature</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col space-y-2">
						<p className="font-semibold text">General</p>
						<ul className="space-y-2">
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/#faq">FAQ</Link>
							</li>
							<li className="text-light-500 hover:text-primary-400">
								<Link href="/example">Example</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center space-y-5 mb-4 sm:flex-row sm:justify-between sm:items-center w-full mt-3 sm:space-y-2 sm:mb-0">
					<div className="space-y-2">
						<p className="font-semibold text-lg text-center sm:text-left">Follow us on</p>
						<div className="flex justify-center sm:justify-start gap-x-6">
							<a href={twitter_url} target="_blank" rel="noopener noreferrer" className="connect_link text-center relative">
								<i className="fab fa-twitter fa-lg"></i>
							</a>
							<a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="connect_link text-center relative">
								<i className="fab fa-linkedin fa-lg"></i>
							</a>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-2 gap-x-10 md:gap-x-8 md:pt-6 lg:gap-0 lg:flex justify-between lg:space-x-6 xl:space-x-28 font-primary">
						<li className="text-xs text-neutral-400 list-none">
							<Link href="/privacy-policy">Privacy Policy</Link>
						</li>
						<li className="text-xs text-neutral-400 list-none">
							<Link href="/contact-us">Contact Us</Link>
						</li>
					</div>
				</div>
				<p className="font-primary text-xs max-w-sm text-center sm:text-left mx-auto sm:mx-0 mt-4">©2023 All Rights Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
