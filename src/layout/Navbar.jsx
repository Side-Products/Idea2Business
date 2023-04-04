import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo.png";
import HamburgerMenu from "./HamburgerMenu";
import { useSession, signOut } from "next-auth/react";

const Navbar = ({ setAuthModalOpen }) => {
	const { data: session, status } = useSession();

	let truncatedName;
	if (session && session.user && session.user.name) {
		truncatedName = session.user.name ?? "";
		if (session.user.name && session.user.name.length > 10) {
			truncatedName = truncatedName.substring(0, 8) + "...";
		}
	}

	let avatarUrl = session && session.user && session.user.image;

	let truncatedEmail;
	if (session && session.user && session.user.email) {
		truncatedEmail = session.user.email.substring(0, 16) + "...";
	}

	const [clientWindowHeight, setClientWindowHeight] = useState("");
	var customStyles = "lg:top-0 lg:rounded-b-[50px]";
	const handleScroll = () => {
		setClientWindowHeight(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
	if (clientWindowHeight > 50) {
		customStyles = "lg:rounded-full lg:mt-2 lg:shadow-lg";
	}

	const router = useRouter();

	const [showCreditsStrip, setShowCreditsStrip] = useState(true);

	return (
		<div className="absolute flex justify-center w-screen">
			<div className="w-full fixed z-40 max-w-[1920px]">
				{showCreditsStrip && session && session.user && session.user.credits > 0 && (
					<div
						onClick={() => router.push("/generate")}
						className="p-1 w-full flex items-center justify-center cursor-pointer text-center text-sm text-light-400 bg-gradient-tertiary-r"
					>
						You have {session && session.user && session.user.credits} free{" "}
						{session && session.user && (session.user.credits == 1 ? "credit" : "credits")}. Use{" "}
						{session && session.user && (session.user.credits == 1 ? "it" : "them")} now!
						<span className="absolute right-4 cursor-pointer" onClick={() => setShowCreditsStrip(false)}>
							<i className="fa-solid fa-xmark text-sm"></i>
						</span>
					</div>
				)}
				<div className="w-full lg:px-16 xl:px-20 2xl:px-36">
					<nav className={"navbar duration-500 ease-in mx-auto border-[0.5px] border-gray-600 " + customStyles}>
						<div className="flex flex-wrap items-center justify-start w-full pl-7 sm:pl-9 pr-16 lg:px-16 py-2">
							<Link href="/">
								<span className="flex">
									<Image src={logo} alt="MXV Logo" width="50" className="rounded-full" />
								</span>
							</Link>

							{/* Internal links */}
							<div className="hidden ml-10 lg:block">
								<ul className="flex flex-row items-center font-medium md:text-base md:space-x-3 xl:space-x-10 md:mt-0 sm:text-sm">
									<li
										className={
											"font-semibold block py-2 pl-2 pr-3 text-gray-400 hover:text-light-200 transition duration-300 " +
											(router.pathname == "/generate" ? "text-gradient-primary-tr" : "")
										}
									>
										<Link href="/generate">Generate</Link>
									</li>
									<li
										className={
											"font-semibold block py-2 pl-2 pr-3 text-gray-400 hover:text-light-200 transition duration-300 " +
											(router.pathname == "/pricing" ? "text-gradient-primary-tr" : "")
										}
									>
										<Link href="/pricing">Pricing</Link>
									</li>
								</ul>
							</div>

							<div className="ml-auto hidden md:block">
								<ul className="flex flex-row items-center text-sm font-medium md:space-x-8 lg:space-x-3 xl:space-x-6 md:mt-0 sm:text-sm">
									{/* Dropdown Menu */}
									<li className="hidden md:block">
										<ul className="relative group dropdown">
											<a
												className="flex items-center dropdown-toggle hidden-arrow"
												id="dropdownMenuButton2"
												role="button"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												{status === "authenticated" ? (
													<div className="flex items-center justify-center px-4 py-2 text-sm rounded-full bg-search-200">
														<span className="mr-3">{truncatedName}</span>
														{avatarUrl ? (
															<Image src={avatarUrl} alt="avatar" width="24" height="24" className="rounded-full" />
														) : (
															<Image src={"/default_avatar.jpg"} alt="avatar" width="24" height="24" className="rounded-full" />
														)}
													</div>
												) : (
													<div
														onClick={() => setAuthModalOpen(true)}
														className="flex items-center justify-center px-10 py-2 text-base font-semibold rounded-full bg-dark-500 hover:bg-dark-700 transition duration-300"
													>
														Sign In
													</div>
												)}
											</a>

											{status === "authenticated" && (
												<ul
													className="absolute right-0 left-auto z-10 hidden text-sm font-medium float-left m-0 text-left list-none border-none rounded-xl shadow-lg dropdown-menu min-w-[250px] bg-[rgba(19,19,19)] backdrop-blur-[24px] backdrop-brightness-105
											bg-clip-padding group-hover:block"
													aria-labelledby="dropdownMenuButton2"
												>
													<li>
														{status === "authenticated" && (
															<div className="flex flex-col px-4 py-3 rounded-t-xl">
																<div className="flex items-center justify-between w-full bg-transparent rounded-t-xl dropdown-item whitespace-nowrap active:bg-transparent active:text-light-100">
																	<div>
																		<p>Email</p>
																		<p>{truncatedEmail}</p>
																	</div>
																	{avatarUrl ? (
																		<Image src={avatarUrl} alt={"avatar"} width={40} height={40} className="rounded-lg" />
																	) : (
																		<Image
																			src={"/default_avatar.jpg"}
																			alt="avatar"
																			width="40"
																			height="40"
																			className="rounded-lg"
																		/>
																	)}
																</div>
															</div>
														)}
													</li>
													{status === "authenticated" && (
														<li>
															<Link href={`/profile`} passHref={true}>
																<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																	Profile
																</div>
															</Link>
														</li>
													)}

													{status === "authenticated" && session.user && session.user.role == "admin" && (
														<>
															<li>
																<div className="block w-full text-center px-4 pb-2 pt-3 border-t border-zinc-700 bg-transparent dropdown-item whitespace-nowrap text-light-700">
																	Admin Routes
																</div>
															</li>

															<li>
																<Link href={`/admin/subscriptions`} passHref={true}>
																	<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																		All Subscriptions
																	</div>
																</Link>
															</li>

															<li>
																<Link href={`/admin/users`} passHref={true}>
																	<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																		All Users
																	</div>
																</Link>
															</li>

															<li>
																<Link href={`/admin/searches`} passHref={true}>
																	<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																		All Searches
																	</div>
																</Link>
															</li>

															<li>
																<Link href={`/admin/bug-reports`} passHref={true}>
																	<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																		All Bug Reports
																	</div>
																</Link>
															</li>

															<li>
																<Link href={`/admin/feature-requests`} passHref={true}>
																	<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																		All Feature Requests
																	</div>
																</Link>
															</li>

															<li>
																<Link href={`/admin/contact-us-messages`} passHref={true}>
																	<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-dark-600">
																		All Contact Us Messages
																	</div>
																</Link>
															</li>
														</>
													)}

													{/* Logout Button */}
													<li>
														{status === "authenticated" ? (
															<button
																className="w-full px-4 pt-2 pb-3 font-medium transition-all bg-transparent cursor-pointer rounded-b-xl border-light-300 hover:bg-error-600/30"
																onClick={() => signOut()}
															>
																Sign out
															</button>
														) : (
															<span></span>
														)}
													</li>
												</ul>
											)}
										</ul>
									</li>
								</ul>
							</div>

							{/* Hamburger Menu */}
							<HamburgerMenu
								avatarUrl={session && session.user && session.user.image}
								truncatedName={session && session.user && session.user.name}
							/>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
