import { useEffect } from "react";

const AdBanner = () => {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
			window.addEventListener("google_ad_request_done", () => {
				console.log("Ad request done");
			});
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<ins
			className="adsbygoogle adbanner-customize"
			style={{ display: "block" }}
			data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
			data-ad-slot="1836345093"
			data-ad-format="auto"
			data-full-width-responsive="true"
		></ins>
	);
};

export default AdBanner;
