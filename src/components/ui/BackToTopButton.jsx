import { useEffect } from "react";

const BackToTopButton = () => {
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function toggleTopButton() {
		if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			document.getElementById("back-to-up").classList.remove("hidden");
		} else {
			document.getElementById("back-to-up").classList.add("hidden");
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", toggleTopButton);
		return () => window.removeEventListener("scroll", toggleTopButton);
	});

	return (
		<button
			className={
				"bg-dark-800 border border-[#30363d] p-4 rounded-full w-[48px] h-[48px] flex items-center justify-center fixed bottom-6 end-6 " + "hidden"
			}
			onClick={() => scrollToTop()}
			id="back-to-up"
		>
			<i className="fa fa-chevron-up" aria-hidden="true"></i>
		</button>
	);
};

export default BackToTopButton;
