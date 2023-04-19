import { useEffect } from "react";
import CardHeading from "@/components/Example/CardHeading";

const ExampleCard = ({ sectionStyle, heading, body }) => {
	// Radial gradient effect and tilt on prompt card
	useEffect(() => {
		const constrain = 2600;

		function transforms(x, y, el) {
			let box = el.getBoundingClientRect();
			let calcX = (y - box.y - box.height / 2) / constrain;
			let calcY = -(x - box.x - box.width / 2) / constrain;

			return "perspective(200px) " + "   rotateX(" + calcX + "deg) " + "   rotateY(" + calcY + "deg) ";
		}

		function transformElement(el, x, y) {
			el.style.transform = transforms(x, y, el);
		}

		function transformElementReset(el) {
			el.style.transform = "";
		}

		const cards = document.getElementsByClassName("prompt-card");
		for (let i = 0; i < cards.length; i++) {
			cards[i].addEventListener("mousemove", (e) => {
				const rect = e.target.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				e.target.style.setProperty("--mouse-x", `${x}px`);
				e.target.style.setProperty("--mouse-y", `${y}px`);

				// Tilt effect
				window.requestAnimationFrame(function () {
					transformElement(cards[i], e.clientX, e.clientY);
				});
			});

			cards[i].addEventListener("mouseout", (e) => {
				window.requestAnimationFrame(function () {
					transformElementReset(cards[i]);
				});
			});
		}
	}, []);

	return (
		<div
			className={
				"p-8 w-full min-h-fit h-full relative flex flex-col group rounded-2xl overflow-hidden transition-all duration-400 " +
				"border border-[#30363d] bg-[#111317] " +
				"before:content-[''] before:absolute before:top-0 before:opacity-0 before:left-0 before:rounded-[inherit] before:h-full before:w-full before:z-[2] before:transition-opacity before:duration-200 hover:before:opacity-100 " +
				"prompt-card " +
				(sectionStyle == 1
					? "prompt-card-1"
					: sectionStyle == 2
					? "prompt-card-2"
					: sectionStyle == 3
					? "prompt-card-3"
					: sectionStyle == 4
					? "prompt-card-4"
					: sectionStyle == 5
					? "prompt-card-5"
					: sectionStyle == 6
					? "prompt-card-6"
					: sectionStyle == 7
					? "prompt-card-7"
					: sectionStyle == 8
					? "prompt-card-8"
					: "prompt-card-default")
			}
		>
			<CardHeading sectionStyle={sectionStyle}>{heading}</CardHeading>
			<div className="mt-4 text-sm sm:text-base whitespace-pre-line">{body}</div>
		</div>
	);
};

export default ExampleCard;
