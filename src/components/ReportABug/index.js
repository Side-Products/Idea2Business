import { useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { isEmailValid } from "@/utils/validate";
import { product_name, contact_email } from "@/config/constants";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { newBugReport, clearErrors } from "@/redux/actions/bugReportActions";

export default function ReportABug() {
	const { setSuccess, setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);

	const nameRef = useRef("");
	const emailRef = useRef("");
	const bugDescriptionRef = useRef("");

	const dispatch = useDispatch();

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		setLoading({ status: true });

		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const bugDescription = bugDescriptionRef.current.value;

		// EMAIL CHECK
		if (email.length != 0) {
			const emailCheck = await isEmailValid(email);
			if (emailCheck.status === false) {
				setError({
					title: emailCheck.title || "Invalid input!",
					message: emailCheck.message,
					showErrorBox: true,
				});
				emailRef.current.focus();
				return;
			}
		}

		// NAME CHECK
		if (name.length != 0) {
			if (name.length < 2) {
				setError({
					title: "Invalid input!",
					message: "Please enter a valid name",
					showErrorBox: true,
				});
				nameRef.current.focus();
				return;
			}
		}

		// Bug description Check
		if (bugDescription.length < 5) {
			setError({
				title: "Invalid input!",
				message: "Please enter a valid bug description with at least 5 characters",
				showErrorBox: true,
			});
			bugDescriptionRef.current.focus();
			return;
		}

		const bugReportInfo = {
			name: name,
			email: email,
			bugDescription: bugDescription,
		};
		// Add to db
		dispatch(newBugReport(bugReportInfo));
		return;
	};

	const { error, success } = useSelector((state) => state.newBugReport);
	useEffect(() => {
		if (success) {
			// Execute any logic that should take place after the object is saved.
			nameRef.current.value = "";
			emailRef.current.value = "";
			bugDescriptionRef.current.value = "";
			setLoading({ status: false });
			setSuccess((prevState) => ({
				...prevState,
				title: "Bug description sent",
				message: "Your message has been recorded successfully",
				showSuccessBox: true,
			}));
			return;
		}
		if (error) {
			setLoading({ status: false });
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [dispatch, error, success]);

	return (
		<div className="w-full flex flex-col justify-center items-center mt-10">
			<div className="w-full">
				<div className="mt-4">
					<div className="font-secondary text-base">
						Thank you for reporting bugs! Identifying, reproducing, and documenting bugs is important to improve {product_name}. Feedback is vital
						to make our services even better. With bug reporting forms, email, and discord server, it&apos;s easy to report issues you encounter and
						request enhancements to any services or functionalities on our platform. You&apos;ll directly influence the platform&apos;s development
						and building of the future of the Music Industry. We at{" "}
						<Link href={"/"} className="text-gradient-primary-tr">
							{product_name}
						</Link>
						, honestly appreciate your help.
					</div>
				</div>

				<div className="mt-10 font-primary font-semibold tracking-[-1px] text-gradient-primary-tr text-2xl">What&apos;s a Bug?</div>

				<div className="mt-4">
					<div className="font-secondary text-base">
						Not all issues are as clear-cut as a platform crash (But we definitely want to know about those, too!). As you use the platform,
						anything that strikes you as <span className="text-gradient-primary-tr">weird</span>,{" "}
						<span className="text-gradient-primary-tr">unexpected</span>, or <span className="text-gradient-primary-tr">broken</span> can be termed
						as a bug and is important to let us know about.
						<br />
						<br />
						<span className="text-gradient-primary-tr">Report everything</span> that you find. An issue might be glaringly obvious to you, but we
						may not even know about it if you don&apos;t report it.
					</div>
				</div>

				<div className="mt-10 font-primary font-semibold tracking-[-1px] text-gradient-primary-tr text-2xl">What does a good bug report look like?</div>

				<div className="mt-4">
					<div className="font-secondary text-base">
						No matter what the bug is, we will <span className="text-gradient-primary-tr">always</span> want to know this information:
						<br />
						<br />
						<ul className="list-disc pl-4">
							<li>What did you try to do?</li>
							<li>What steps were involved? (So that we can replicate)</li>
							<li>What did you expect to happen?</li>
							<li>What happened instead?</li>
						</ul>
						One or more of those may seem stupid or self-explanatory to you, but it&apos;s{" "}
						<span className="text-gradient-primary-tr">extremely helpful</span> to us if you take the time to write it all out.{" "}
						<span className="text-gradient-primary-tr">Please don&apos;t assume we know everything! </span> Perhaps you learned how to do something
						in another application, and we have a totally different way to accomplish the same thing. Simply saying that something “doesn&apos;t
						work” isn&apos;t very helpful; explain it to us as simply and clearly as possible.
						<br />
						<br />
						Any supporting information you can think of adding will be appreciated.
						<br />
						<br />
						Eg. A screenshot or screen recording may be the clearest way to explain your bug.
						<br />
					</div>
				</div>

				<div className="mt-10 font-primary font-semibold tracking-[-1px] text-gradient-primary-tr text-2xl">How do I report bugs?</div>

				<div className="mt-4 font-primary text-[#afafaf]">
					The fastest and most convenient way to report a bug is by sending us an email at:&nbsp;
					<a href={`mailto:` + contact_email + `?subject=Bug Report`} target="_blank" rel="noopener noreferrer" className="text-gradient-primary-tr">
						{contact_email}
					</a>
					<br />
					<br />
					Or submit your comments anonymously using the form below.
					<br />
					<br />
					Please ensure to include as much detailed information about the issue as possible.
				</div>

				<div className="mt-16">
					<div className="backdrop-blur-2xl backdrop-brightness-200 max-h-max md:h-[400px] p-8 md:p-12 border-2 border-dark-300 rounded-xl shadow">
						<form onSubmit={handleFormSubmit}>
							<div className="flex flex-col md:flex-row md:space-x-8 xl:space-x-14">
								<div className="w-full md:w-1/3">
									<div className="">
										<label className="opacity-50 p-2 text-sm font-secondary">Name&nbsp; (Optional)</label>
										<input
											className="bg-dark-600 mt-1 border-transparent w-full p-2 text-sm border-[2px] focus:border-primary-500 rounded-md outline-none text-left"
											type="text"
											ref={nameRef}
											name="name"
											autoComplete="off"
										/>
									</div>

									<div className="mt-4">
										<label className="opacity-50 p-2 text-sm font-secondary">Email Address&nbsp; (Optional)</label>
										<input
											className="bg-dark-600 mt-1 border-transparent w-full p-2 text-sm border-[2px] focus:border-primary-500 rounded-md outline-none text-left"
											type="email"
											ref={emailRef}
											name="email"
											autoComplete="off"
										/>
									</div>

									<div className="mt-5">
										<div className="font-primary text-gradient-primary-tr text-sm">
											If you don&apos;t provide an email, we will not be able to respond to your query!
										</div>
									</div>
								</div>

								<div className="w-full mt-5 md:w-2/3 md:mt-0">
									<div>
										<label className="text-sm font-primary opacity-50">Bug Description</label>
										<textarea
											className="bg-dark-600 mt-1 border-transparent resize-none w-full p-2 border-[2px] focus:border-primary-500 rounded-lg focus:outline-none focus:shadow-none focus:text-gradient-primary-tr"
											ref={bugDescriptionRef}
											name="message"
											rows="8"
											required
										></textarea>
									</div>

									<Button variant={"primary"} classes="text-md px-4 py-3 group mt-4">
										<span className="transition-all duration-500 group-hover:pr-6">
											Send
											<i className="fas fa-angle-double-right absolute opacity-0 font-bold mt-1 pl-2 transition-all duration-500 group-hover:opacity-100"></i>
										</span>
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
