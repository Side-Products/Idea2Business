import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModalContext from "@/store/authModal-context";
import logoBlack from "../../../../public/site_logo.png";
import { useSession, signOut } from "next-auth/react";

export default function HamburgerMenu({ avatarUrl, truncatedName }) {
	const { data: session, status } = useSession();
	const [, setAuthModalOpen] = useContext(AuthModalContext);

	const closeNavbar = () => {
		document.getElementById("hamburgerToggler").click();
	};

	return (
		<div className="flex flex-wrap list-reset pl-0 mb-0 ml-2 lg:hidden">
			<div id="menuToggle">
				<input type="checkbox" className="toggler" id="hamburgerToggler" />
				<div className="hamburger">
					<div></div>
				</div>

				<div id="menu">
					<div className="hamburger_container">
						<div className="menu_box">
							<div className="flex flex-col">
								<div className="md:mx-1/6 md:w-1/5 px-4 offset-0 w-full flex justify-center sm:block logo_div_anim">
									<Link href={"/"} passHref={true}>
										<span href="#" onClick={closeNavbar} className="flex">
											<Image src={logoBlack} alt="MXV Logo" width="60" className="rounded-md" />
										</span>
									</Link>
								</div>
								<div className="w-full xs:w-2/3 md:w-2/5 sm:w-3/5 px-4 mt-4 create_left_anim self-center sm:self-end flex items-center justify-between space-x-6">
									<div className="quick_hamburger_nav_div w-full">
										{status === "authenticated" ? (
											<>
												<div className="quick_hamburger_nav flex items-center justify-center px-4 py-2 text-sm rounded-full text-white bg-search-200">
													<span className="mr-4">{truncatedName}</span>
													{avatarUrl ? <Image src={avatarUrl} alt="avatar" width="24" height="24" className="rounded-full" /> : null}
												</div>
												<button
													className="w-full mt-2 px-4 py-2 font-medium transition-all cursor-pointer rounded-full bg-error-600/30"
													onClick={() => signOut()}
												>
													Sign out
												</button>
											</>
										) : (
											<div
												onClick={() => {
													closeNavbar();
													setAuthModalOpen(true);
												}}
												className="quick_hamburger_nav flex items-center justify-center px-6 py-2 text-base font-semibold rounded-full text-white bg-search-200"
											>
												Sign up / Login
											</div>
										)}
									</div>
								</div>
							</div>

							{/* <div className="hamburger_menu justify-center">
								<div className="flex flex-wrap justify-center">
									<div className="lg:w-full md:w-4/5 px-4 offset-0 w-full md:mt-0">
										<div className="flex flex-wrap justify-center">
											<div className="md:w-1/4 px-2 w-1/2 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0  justify-center">Quick Links</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row md:mt-8 mt-4 justify-center">
													<Link href={"/"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															Home
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link
														href={"/mxcatalog/new-releases"}
														className="ham_menu_link ham_menu_hover_effect text-center"
														passHref={true}
													>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															New Releases
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link
														href={"/mxcatalog/explore"}
														className="ham_menu_link ham_menu_hover_effect text-center"
														passHref={true}
													>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															Explore
														</span>
													</Link>
												</div>

												{status === "authenticated" && (
													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link href={"/create-nft"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
															<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
																Create
															</span>
														</Link>
													</div>
												)}
											</div>

											<div className="md:w-1/4 px-4 w-1/2 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">Account</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row md:mt-8 mt-4 justify-center">
													{status === "authenticated" ? (
														<Link href={`/profile`} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
															<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
																Profile
															</span>
														</Link>
													) : (
														<span
															className="ham_menu_link ham_menu_hover_effect text-center"
															onClick={() => {
																closeNavbar();
																setAuthModalOpen(true);
															}}
														>
															Profile
														</span>
													)}
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													{status === "authenticated" ? (
														<Link
															href={`/settings/profile-settings`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
																Settings
															</span>
														</Link>
													) : (
														<span
															className="ham_menu_link ham_menu_hover_effect text-center"
															onClick={() => {
																closeNavbar();
																setAuthModalOpen(true);
															}}
														>
															Settings
														</span>
													)}
												</div>
											</div>

											<div className="md:w-1/4 px-4 w-1/2 mt-4 md:mt-0 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">Support</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row md:mt-8 mt-4 justify-center">
													<Link href={"/help-center"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															Help Center
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/contact-us"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															Contact Us
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/faq"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															FAQ
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/report-a-bug"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															Report a Bug
														</span>
													</Link>
												</div>
											</div>

											<div className="md:w-1/4 px-4 w-1/2 mt-4 md:mt-0 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">General</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row md:mt-8 mt-4 justify-center">
													<Link href={"/#section_4"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															About Us
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/cfh/cfb"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-500" onClick={closeNavbar}>
															Community
														</span>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-wrap ">
								<div className="md:mx-1/5 px-4 w-full mt-8 mb-4 horizontal_line_to_right"></div>
							</div>

							<div className="flex flex-wrap justify-center mb-5 harmburger_menu_connect">
								<div className="ham_menu_connect_links_md px-4 offset-0 w-full md:mt-0 mt-5">
									<div className="flex flex-wrap justify-center">
										<div className="ham_menu_heading ham_menu_connect_heading text-center">Connect with us</div>
									</div>
									<div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:justify-center mt-5">
										<a
											href="https://t.me/+7e4mG5yhutswNWVl"
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link cursor_ptr text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-telegram fa-lg"></i>
										</a>
										<a
											href="https://www.linkedin.com/company/musixverse"
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link cursor_ptr text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-linkedin fa-lg"></i>
										</a>
										<a
											href="https://discord.com/invite/rXKb7rCqjG"
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link cursor_ptr text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-discord fa-lg"></i>
										</a>
										<a
											href="https://www.facebook.com/musixverse"
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link cursor_ptr text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-meta fa-lg"></i>
										</a>
										<a
											href="https://twitter.com/musixverse"
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link cursor_ptr text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-twitter fa-lg"></i>
										</a>
										<a
											href="https://www.instagram.com/musixverse"
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link cursor_ptr text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-instagram fa-lg"></i>
										</a>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
