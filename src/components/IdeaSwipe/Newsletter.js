import { useState, useEffect, useRef, useContext } from "react";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { newNewsletter, clearErrors } from "@/redux/actions/newsletterActions";
import ReCaptcha from "@/components/ui/ReCaptcha";
import { validateReCaptcha } from "@/components/ui/ReCaptcha";
import Dropdown from "@/components/ui/Input/Dropdown";

export default function Newsletter() {
	const { setSuccess, setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);
	const dispatch = useDispatch();

	const frequencyOptions = ["weekly", "daily"];
	const [frequency, setFrequency] = useState(frequencyOptions[0]);

	const emailRef = useRef("");
	// ReCaptcha
	const recaptchaRef = useRef(null);

	const formSubmit = async () => {
		const email = emailRef.current.value;

		// Add to db
		dispatch(newNewsletter({ email: email, frequency: frequency }));
		return;
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading({ status: true });

		try {
			await validateReCaptcha(recaptchaRef, formSubmit);
		} catch (err) {
			setError({
				title: "ReCAPTCHA failed",
				message: `Please click "I'm not a robot" before submitting the form`,
				showErrorBox: true,
			});
		}
		setLoading({ status: false });
		recaptchaRef.current.reset();
	};

	const { error, success } = useSelector((state) => state.newNewsletter);
	useEffect(() => {
		if (success) {
			// Execute any logic that should take place after the object is saved.
			emailRef.current.value = "";
			recaptchaRef.current.reset();
			setLoading({ status: false });
			setSuccess((prevState) => ({
				...prevState,
				title: "Success",
				message: "You have successfully subscribed to our newsletter",
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
		<div className="relative mt-28 w-full flex flex-col items-center justify-center lg:text-center bg-gradient-tertiary-r sm:py-16 sm:px-14 md:px-16 lg:px-24 xl:px-32 py-8 px-8 rounded-3xl">
			<p className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[56px] font-bold sm:tracking-[-2.5px] tracking-[-1.5px]">
				Get the best ideas directly in your inbox
			</p>

			<div className="flex flex-col justify-center items-center mt-8">
				<div className="text-lg font-medium max-w-xl">
					Receive a <Dropdown id="frequency" options={frequencyOptions} setChoice={setFrequency} /> email of the top-notch most voted for and popular
					product ideas delivered straight to your inbox
				</div>

				<form onSubmit={handleFormSubmit} className="w-full mt-10 flex flex-col self-center justify-center items-center md:flex-row">
					<input
						type="email"
						name="email"
						ref={emailRef}
						autoCapitalize="off"
						autoCorrect="off"
						className="py-3 px-4 text-sm rounded-lg outline-none w-11/12 sm:w-[267px] md:w-[283px] 2xl:w-[315px] font-primary bg-dark-700 text-light-100"
						placeholder="Your email address"
						required
					></input>

					<button
						type="submit"
						className="max-w-[137px] py-2 mt-3 font-semibold rounded-md md:mt-0 md:ml-3 px-7 bg-light-100 hover:bg-light-200 text-dark-600"
					>
						Subscribe
					</button>
				</form>
			</div>

			<div className="xl:absolute xl:right-4 xl:bottom-3 xl:mt-0 mt-8">
				<ReCaptcha recaptchaRef={recaptchaRef} />
			</div>
		</div>
	);
}
