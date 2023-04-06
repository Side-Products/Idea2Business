import { useContext } from "react";
import { StatusContext } from "@/store/StatusContextProvider";
import ReCAPTCHA from "react-google-recaptcha";

export const validateReCaptcha = async (recaptchaRef, formSubmit) => {
	// Validate ReCaptcha
	const recaptchaValue = recaptchaRef.current.getValue();
	const res = await fetch(`/api/validate-captcha`, { method: "POST", body: JSON.stringify({ recaptchaValue: recaptchaValue }) });
	const status = await res.json();

	if (status.success === true) {
		await formSubmit();
	} else {
		throw new Error("ReCAPTCHA failed");
	}
};

export default function ReCaptcha({ recaptchaRef }) {
	const { setError } = useContext(StatusContext);

	return (
		<ReCAPTCHA
			ref={recaptchaRef}
			size="normal"
			badge="inline"
			theme={"dark"}
			sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
			onExpired={() => {
				setError({
					title: "ReCAPTCHA Expired",
					message: `Please click "I'm not a robot" again`,
					showErrorBox: true,
				});
			}}
			onErrored={() => {
				setError({
					title: "Something went wrong",
					message: `Please click "I'm not a robot" again`,
					showErrorBox: true,
				});
			}}
		/>
	);
}
