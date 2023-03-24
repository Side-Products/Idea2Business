const { Fragment, useState, useEffect, useContext } = require("react");
const { Transition } = require("@headlessui/react");
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "@/redux/actions/userActions";
import logoBlack from "/public/site_logo.png";
import LoadingContext from "@/store/loading-context";
import StatusContext from "@/store/status-context";
import Button from "@/components/ui/Button";
import ForgotPassword from "@/components/Profile/ForgotPassword";

export default function AuthModal({ isOpen = "", onClose = "" }) {
	const router = useRouter();

	const [, setLoading] = useContext(LoadingContext);
	const [, , , setError] = useContext(StatusContext);
	const [isModalOpen, setIsModalOpen] = useState(isOpen);

	const [authState, setAuthState] = useState("signup");
	const [forgotPassword, setForgotPassword] = useState(false);

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
		if (forgotPassword) {
			setForgotPassword(false);
			return;
		}
		handleChange();
		onClose();
	};

	// Register
	const dispatch = useDispatch();

	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const { name, email, password } = user;

	const { success, error } = useSelector((state) => state.auth);
	const { data: session } = useSession();
	useEffect(() => {
		if (success) {
			if (session && session.user) {
				router.push("/generate");
				closeModal();
			} else setAuthState("login");
		}
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			setLoading({ status: false });
			dispatch(clearErrors());
		}
	}, [dispatch, success, error]);

	const registerHandler = () => {
		const userData = {
			name,
			email,
			password,
		};
		dispatch(registerUser(userData));
	};

	// Login
	const loginCredentialsSubmitHandler = async () => {
		setLoading({ status: true });

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result.error) {
			setError({
				title: "Something went wrong",
				message: result.error,
				showErrorBox: true,
			});
			setLoading({ status: false });
		} else {
			router.push("/generate");
			setLoading({ status: false });
		}
	};

	const onFieldChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
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
									{!forgotPassword && (
										<div className="w-full flex justify-between px-12 mb-8">
											<button
												onClick={() => setAuthState("signup")}
												className={
													"py-2 px-8 hover:bg-dark-600 rounded text-sm font-semibold " +
													(authState === "signup" && "border-2 border-transparent border-b-primary-500")
												}
											>
												Sign Up
											</button>
											<button
												onClick={() => setAuthState("login")}
												className={
													"py-2 px-8 hover:bg-dark-600 rounded text-sm font-semibold " +
													(authState === "login" && "border-2 border-transparent border-b-primary-500")
												}
											>
												Log In
											</button>
										</div>
									)}
									<Image src={logoBlack} alt="MXV Logo" width="60" height="60" className="rounded-md" />
								</div>
								<div
									onClick={() => closeModal()}
									className="w-8 h-8 flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-500/20 "
								>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							{forgotPassword ? (
								<div className="w-full flex flex-col mt-4 pr-4">
									<div className="text-center">
										<div className="text-xl font-semibold font-primary">Forgot Password&nbsp;&nbsp;&nbsp;</div>
										<p className="text-sm mt-4">Please enter your email address to get the password reset link</p>
									</div>
									<div className="mt-8">
										<div className="w-full space-y-4">
											<ForgotPassword email={email} onFieldChange={onFieldChange} />
										</div>
									</div>
								</div>
							) : (
								<div className="w-full flex flex-col mt-4 pr-4">
									<div className="text-center">
										<div className="text-xl font-semibold font-primary">
											{authState === "signup" ? "Get Started" : "Welcome Back"}&nbsp;&nbsp;&nbsp;
										</div>
										<p className="text-sm mt-4">Let us help you make your dream of creating a profitable product a reality!</p>
									</div>
									<div className="mt-8">
										<div className="w-full space-y-4">
											<form
												onSubmit={(e) => {
													e.preventDefault();
													if (authState === "signup") registerHandler();
													else loginCredentialsSubmitHandler();
												}}
											>
												{authState === "signup" && (
													<div className="flex flex-col">
														<label htmlFor="email_field" className="text-sm text-light-500">
															Name
														</label>
														<input
															type="text"
															id="name_field"
															className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
															value={name}
															name="name"
															onChange={onFieldChange}
															required
														/>
													</div>
												)}

												<div className="flex flex-col mt-2">
													<label htmlFor="email_field" className="text-sm text-light-500">
														Email
													</label>
													<input
														type="email"
														id="email_field"
														className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
														value={email}
														name="email"
														onChange={onFieldChange}
														required
													/>
												</div>

												<div className="flex flex-col mt-2">
													<label htmlFor="password_field" className="text-sm text-light-500">
														Password
													</label>
													<input
														type="password"
														id="password_field"
														className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
														value={password}
														name="password"
														onChange={onFieldChange}
														required
													/>
												</div>

												{authState === "login" && (
													<span
														onClick={() => setForgotPassword(true)}
														className="float-right mt-2 mb-4 text-xs text-light-500 hover:text-light-300 cursor-pointer"
													>
														Forgot Password?
													</span>
												)}

												<div className="mt-6">
													<Button variant={"secondary"} rounded={true} classes="text-md px-8 py-3">
														{authState === "login" ? "Log In" : "Sign Up"}
													</Button>
												</div>
											</form>

											<p className="my-4 text-center text-sm text-light-500">or</p>

											<div className="w-full flex gap-x-4 justify-center items-center">
												<button
													onClick={() => {
														setLoading({ status: true });
														signIn("google");
													}}
													className=" flex justify-center items-center bg-dark-800 hover:bg-[#000] rounded-full p-4 text-sm"
												>
													<Image src="/google.png" alt="Metamask Logo" width="28" height="28" />
												</button>
												<button
													onClick={() => {
														setLoading({ status: true });
														signIn("github");
													}}
													className=" flex justify-center items-center bg-dark-800 hover:bg-[#000] rounded-full p-4 text-sm"
												>
													<Image src="/github.png" alt="Metamask Logo" width="28" height="28" />
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</Transition.Child>
			</Transition>
		</>
	);
}
