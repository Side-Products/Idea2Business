import { useEffect } from "react";
import { animate, stagger } from "motion";

const Loader = () => {
	useEffect(() => {
		const numSegments = document.querySelectorAll(".segment").length;
		const elem = document.getElementsByClassName("segment");

		/**
		 * Stagger offset (in seconds)
		 * Decrease this to speed the animation up or increase
		 * to slow it down.
		 */
		if (numSegments) {
			const offset = 0.09;

			setTimeout(() => {
				if (elem[0])
					animate(
						".segment",
						{ opacity: [0, 1, 0] },
						{
							offset: [0, 0.1, 1],
							duration: numSegments * offset,
							delay: stagger(offset),
							repeat: Infinity,
						}
					);
			}, 1000);
		}
	}, []);

	return (
		<div className="w-full py-16 flex justify-center items-center">
			<svg align="center" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-100 -100 400 400">
				<g className="segment">
					<path
						id="loading-path"
						d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
					></path>
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(45deg)", transformOrigin: "100px 100px" }} />
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(90deg)", transformOrigin: "100px 100px" }} />
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(135deg)", transformOrigin: "100px 100px" }} />
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(180deg)", transformOrigin: "100px 100px" }} />
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(225deg)", transformOrigin: "100px 100px" }} />
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(270deg)", transformOrigin: "100px 100px" }} />
				</g>
				<g className="segment">
					<use href="#loading-path" style={{ transform: "rotate(315deg)", transformOrigin: "100px 100px" }} />
				</g>
			</svg>
		</div>
	);
};

export default Loader;
