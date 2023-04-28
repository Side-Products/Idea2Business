import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo_removedbg.png";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { twitter_url, linkedin_url } from "@/config/constants";

export default function HamburgerMenu({ avatarUrl, truncatedName }) {
	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);
	const router = useRouter();

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
											<Image src={logo} alt="logo" width="60" className="rounded-full" />
										</span>
									</Link>
								</div>
								<div className="w-full xs:w-2/3 md:w-2/5 sm:w-3/5 px-4 mt-4 create_left_anim self-center sm:self-end flex items-center justify-between space-x-6">
									<div className="quick_hamburger_nav_div w-full">
										{status === "authenticated" ? (
											<>
												<div
													onClick={() => {
														router.push("/profile");
														closeNavbar();
													}}
													className="quick_hamburger_nav flex items-center justify-center px-4 py-2 text-sm rounded-full text-white bg-search-200 cursor-pointer"
												>
													<span className="mr-4">{truncatedName}</span>
													{avatarUrl ? <Image src={avatarUrl} alt="avatar" width="24" height="24" className="rounded-full" /> : null}
												</div>
												<button
													className="w-full mt-2 px-4 py-2 font-medium transition-all cursor-pointer rounded-full bg-error-600/30 hover:bg-error-600/50 duration-300"
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

							<div className="hamburger_menu justify-center">
								<div className="flex flex-wrap justify-center">
									<div className="lg:w-full md:w-4/5 px-2 offset-0 w-full md:mt-0">
										<div className="flex flex-wrap justify-center">
											<div className="md:w-1/4 px-2 w-1/2 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0  justify-center">Quick Links</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row md:mt-8 mt-4 justify-center">
													<Link href={"/generate"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Generate
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/idea-swipe"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Idea Swipe
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/pricing"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Pricing
														</span>
													</Link>
												</div>
											</div>

											<div className="md:w-1/4 px-4 w-1/2 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">Account</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row md:mt-8 mt-4 justify-center">
													{status === "authenticated" ? (
														<Link href={`/profile`} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
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
														<Link href={`/profile`} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																Past Searches
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
															Past Searches
														</span>
													)}
												</div>
											</div>

											<div className="md:w-1/4 px-1 w-1/2 mt-4 md:mt-0 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">Support</div>

												<div className="md:mt-8 mt-4 flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/contact-us"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Contact Us
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/report-a-bug"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Report a Bug
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link
														href={"/request-a-feature"}
														className="ham_menu_link ham_menu_hover_effect text-center"
														passHref={true}
													>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Request Feature
														</span>
													</Link>
												</div>
											</div>

											<div className="md:w-1/4 px-2 w-1/2 mt-4 md:mt-0 text-center">
												<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">General</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center md:mt-8 mt-4">
													<Link href={"/#faq"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															FAQ
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/example"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Example
														</span>
													</Link>
												</div>
												<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
													<Link href={"/notes"} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
														<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
															Notes
														</span>
													</Link>
												</div>
											</div>

											{status === "authenticated" && session.user && session.user.role == "admin" && (
												<div className="md:w-1/2 px-4 w-10/12 mt-4 md:mt-8 text-center">
													<div className="flex flex-wrap ham_menu_heading mt-5 sm:mt-0 justify-center">Admin Routes</div>

													<div className="md:mt-8 mt-4 flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/subscriptions`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Subscriptions
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link href={`/admin/users`} className="ham_menu_link ham_menu_hover_effect text-center" passHref={true}>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Users
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/searches`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Searches
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/generated-response`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Generated Responses
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/bug-reports`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Bug Reports
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/feature-requests`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Feature Requests
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/contact-us-messages`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Contact Us Messages
															</span>
														</Link>
													</div>

													<div className="flex flex-wrap ham_menu_hover_effect_row justify-center">
														<Link
															href={`/admin/newsletters`}
															className="ham_menu_link ham_menu_hover_effect text-center"
															passHref={true}
														>
															<span className="text-white hover:text-primary-400" onClick={closeNavbar}>
																All Newsletter Entries
															</span>
														</Link>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-wrap ">
								<div className="md:mx-1/5 px-4 w-full mt-8 mb-4 horizontal_line_to_right"></div>
							</div>

							<div className="flex flex-wrap justify-center mb-5 harmburger_menu_connect pb-10">
								<div className="ham_menu_connect_links_md px-4 offset-0 w-full md:mt-0 mt-5">
									<div className="flex flex-wrap justify-center">
										<div className="ham_menu_heading ham_menu_connect_heading text-center">See what&apos;s new on</div>
									</div>
									<div className="grid grid-cols-2 gap-0 px-10 sm:flex sm:flex-wrap sm:justify-center mt-5">
										<a
											href={twitter_url}
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-twitter fa-lg"></i>
										</a>
										<a
											href={linkedin_url}
											target="_blank"
											rel="noopener noreferrer"
											className="connect_link text-center relative flex-grow max-w-full flex-1 px-4 p-0"
										>
											<i className="fab fa-linkedin fa-lg"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
