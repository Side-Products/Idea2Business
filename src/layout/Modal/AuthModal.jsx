const { Fragment, useState, useEffect, useContext } = require("react");
import Image from "next/image";
const { Transition } = require("@headlessui/react");
import logoBlack from "/public/site_logo.png";
import LoadingContext from "@/store/loading-context";
import { signIn } from "next-auth/react";

export default function AuthModal({ isOpen = "", onClose = "" }) {
	const [, setLoading] = useContext(LoadingContext);
	const [isModalOpen, setIsModalOpen] = useState(isOpen);

	useEffect(() => {
		setIsModalOpen(isModalOpen);
		if (!isModalOpen) {
			document.documentElement.style.overflow = "auto";
		} else {
			document.documentElement.style.overflow = "hidden";
		}
	}, [isModalOpen]);

	useEffect(() => {
		setIsModalOpen(isOpen);
	}, [isOpen]);

	const handleChange = () => {
		setIsModalOpen(!isModalOpen);
	};

	const closeModal = () => {
		handleChange();
		onClose();
	};

	return (
		<>
			<Transition show={isModalOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-all duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-all duration-200"
					leaveTo="opacity-0"
					leaveFrom="opacity-100"
				>
					<div style={{ zIndex: "50" }} onClick={() => handleChange()} className="w-full h-full left-0 top-0 bg-black/80 backdrop-blur fixed" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition-all duration-200"
					enterFrom="opacity-0 scale-75"
					enterTo="opacity-100 scale-100"
					leave="transition-all duration-200"
					leaveTo="opacity-0 scale-75"
					leaveFrom="opacity-100 scale-100"
				>
					<div style={{ zIndex: "50" }} className="flex justify-center items-center h-full w-full fixed">
						<div className="max-w-[26rem] w-11/12 p-4 pl-10 pb-12 bg-dark-600 rounded-lg">
							<div className="w-full flex justify-start">
								<div className="w-full flex flex-col justify-center items-center mt-4">
									<Image src={logoBlack} alt="MXV Logo" width="60" height="60" className="rounded-md" />
								</div>
								<div
									onClick={() => closeModal()}
									className="w-8 h-8 flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-500/20 "
								>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							<div className="w-full flex flex-col mt-4 pr-4">
								<div className="text-center">
									<div className="text-xl font-semibold font-primary">Get Started!&nbsp;&nbsp;&nbsp;</div>
									<p className="text-sm mt-4">Let us help you make your dream of creating a profitable product a reality!</p>
								</div>
								<div className="mt-8">
									<div className="mt-6 w-full space-y-4">
										<button
											onClick={() => {
												setLoading({ status: true });
												signIn("google");
											}}
											className="w-full bg-light-200 hover:bg-light-300 dark:bg-dark-800 dark:hover:bg-[#000] rounded-lg flex items-center p-4 text-sm"
										>
											<Image src="/google.png" alt="Metamask Logo" width="40" height="40" />
											<div className="flex justify-between items-center w-full">
												<span className="ml-4">Sign in using Google</span>
												<span className="ml-2 text-xl">
													<i className="fa-solid fa-arrow-right-long"></i>
												</span>
											</div>
										</button>
										<button
											onClick={() => {
												setLoading({ status: true });
												signIn("github");
											}}
											className="w-full bg-light-200 hover:bg-light-300 dark:bg-dark-800 dark:hover:bg-[#000] rounded-lg flex items-center p-4 text-sm"
										>
											<Image src="/github.png" alt="Metamask Logo" width="40" height="40" />
											<div className="flex justify-between items-center w-full">
												<span className="ml-4">Sign in using GitHub</span>
												<span className="ml-2 text-xl">
													<i className="fa-solid fa-arrow-right-long"></i>
												</span>
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Transition.Child>
			</Transition>
		</>
	);
}
