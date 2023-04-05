export default async function handler(req, res) {
	const reqBody = JSON.parse(req.body);
	const secret_key = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reqBody.recaptchaValue}`;

	const validateCaptcha = await fetch(url, {
		method: "post",
	})
		.then((response) => response.json())
		.then((google_response) => {
			return google_response;
		})
		.catch((err) => {
			console.log(err);
			return { success: false };
		});

	delete req.body["g-recaptcha-response"];
	return res.json(validateCaptcha);
}
