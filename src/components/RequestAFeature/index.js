import { useEffect, useRef, useContext } from "react";
import StatusContext from "@/store/status-context";
import LoadingContext from "@/store/loading-context";
import { isEmailValid } from "@/utils/Validate";
import { contact_email } from "@/config/constants";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { newFeatureRequest, clearErrors } from "@/redux/actions/featureRequestActions";

export default function FeatureRequest() {
	const [, , setSuccess, setError] = useContext(StatusContext);
	const [, setLoading] = useContext(LoadingContext);

	const nameRef = useRef("");
	const emailRef = useRef("");
	const featureNameRef = useRef("");
	const featureDescriptionRef = useRef("");

	const dispatch = useDispatch();

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		setLoading({ status: true });

		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const featureName = featureNameRef.current.value;
		const featureDescription = featureDescriptionRef.current.value;

		// EMAIL CHECK
		if (email) {
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
		if (name.length !== 0) {
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

		// Feature Name Check
		if (featureName.length < 5) {
			setError({
				title: "Invalid input!",
				message: "Please enter a valid feature name with at least 5 characters",
				showErrorBox: true,
			});
			featureNameRef.current.focus();
			return;
		}

		// Feature Description Check
		if (featureDescription.length < 5) {
			setError({
				title: "Invalid input!",
				message: "Please enter a valid feature description with at least 5 characters",
				showErrorBox: true,
			});
			featureDescriptionRef.current.focus();
			return;
		}

		const featureRequestInfo = {
			name: name,
			email: email,
			featureName: featureName,
			featureDescription: featureDescription,
		};
		// Add to db
		dispatch(newFeatureRequest(featureRequestInfo));
		return;
	};

	const { error, success } = useSelector((state) => state.newFeatureRequest);
	useEffect(() => {
		if (success) {
			// Execute any logic that should take place after the object is saved.
			nameRef.current.value = "";
			emailRef.current.value = "";
			featureNameRef.current.value = "";
			featureDescriptionRef.current.value = "";
			setLoading({ status: false });
			setSuccess((prevState) => ({
				...prevState,
				title: "Feature Request sent",
				message: "Your feature request has been sent successfully",
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
		<div className="w-full flex flex-col justify-center items-center mt-16">
			<div className="w-full">
				<div className="text-md text-light-400">
					In order to best assist you, please share as many details as you can about your query. If applicable, please include any troubleshooting
					steps that you have already taken.
				</div>

				<div className="mt-10 text-light-600">
					Email us at:
					<br />
					<a href={`mailto:` + contact_email} target="_blank" rel="noopener noreferrer" className="text-gradient-primary-tr">
						{contact_email}
					</a>
					<br />
					<br />
					Or submit your queries anonymously using the form below.
				</div>

				<div className="mt-16">
					<div className="backdrop-blur-2xl backdrop-brightness-200 max-h-max p-8 md:p-12 border-2 border-dark-300 rounded-xl shadow">
						<form onSubmit={handleFormSubmit}>
							<div className="flex flex-col md:flex-row md:space-x-8 xl:space-x-14">
								<div className="w-full md:w-1/3">
									<div className="">
										<label className="dark:opacity-50">Name&nbsp; (Optional)</label>
										<input
											className="bg-dark-600 mt-1 border-transparent w-full p-2 text-sm border-[2px] focus:border-primary-500 rounded-md outline-none text-left"
											type="text"
											ref={nameRef}
											name="name"
											autoComplete="off"
										/>
									</div>

									<div className="mt-4">
										<label className="dark:opacity-50">Email Address&nbsp; (Optional)</label>
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
											You can leave an anonymous note but if you do not provide your email, we will not be able to connect with you and
											respond to your query.
										</div>
									</div>
								</div>

								<div className="w-full mt-5 md:w-2/3 md:mt-0">
									<div className="">
										<label className="text-sm font-primary dark:opacity-50">Feature Name</label>
										<input
											className="bg-dark-600 mt-1 border-transparent w-full p-2 text-sm border-[2px] focus:border-primary-500 rounded-md outline-none text-left"
											type="text"
											ref={featureNameRef}
											name="featureName"
											autoComplete="off"
											required
										/>
									</div>

									<div className="mt-4">
										<label className="text-sm font-primary dark:opacity-50">Feature Description</label>
										<textarea
											className="bg-dark-600 mt-1 border-transparent resize-none w-full p-2 border-[2px] focus:border-primary-500 rounded-lg focus:outline-none focus:shadow-none focus:text-gradient-primary-tr"
											ref={featureDescriptionRef}
											name="featureDescription"
											rows="6"
											required
										></textarea>
									</div>

									<Button variant={"primary"} classes="text-md px-4 py-3 group mt-4">
										<span className="transition-all duration-500 group-hover:pr-6">
											Send Feature Request
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
