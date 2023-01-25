import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToPageTop({ samePage, changingValue }) {
	const router = useRouter();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [samePage ? changingValue : router.pathname]);

	return null;
}
