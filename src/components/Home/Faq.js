import { useState } from "react";
import { Faqs } from "@/config/constants";

export default function Faq() {
	const [currentlyExpanded, setCurrentlyExpanded] = useState(0);

	const FaqAccordion = Faqs.map((elem, idx) => {
		return (
			<div
				key={idx}
				className={
					(idx == 0 ? "rounded-t-xl border" : idx == Faqs.length - 1 ? "rounded-b-xl border border-t-0" : "border border-t-0") +
					" p-4 border-neutral-600 bg-dark-800"
				}
			>
				{/* FAQ Item Heading */}
				<h2 className="mb-0" id={elem.content_heading}>
					<button
						type="button"
						className="group relative flex w-full items-center rounded-t-[15px] bg-dark-800 py-4 px-5 text-left text-xl font-medium text-light-400 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary-400 [&:not([data-te-collapse-collapsed])]:bg-dark-800 [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
						onClick={() => {
							setCurrentlyExpanded(idx);
						}}
						data-te-collapse-init
						data-te-collapse-collapsed={idx == 0 ? "false" : "true"}
						data-te-target={"#" + elem.content_id}
						// aria-expanded={currentlyExpanded === idx ? "true" : "false"}
						aria-controls={elem.content_id}
					>
						{elem.heading}
						<span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 motion-reduce:transition-none fill-blue-300 group-[[data-te-collapse-collapsed]]:fill-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
							</svg>
						</span>
					</button>
				</h2>
				{/* FAQ Item Content */}
				<div
					id={elem.content_id}
					// className={(currentlyExpanded == idx ? "" : "hidden") + " !visible"}
					className={"hidden !visible"}
					data-te-collapse-item
					// data-te-collapse-show={currentlyExpanded == idx ? "true" : "false"}
					aria-labelledby={elem.content_heading}
					data-te-parent="#accordionExample"
				>
					<div className="py-4 px-5">{elem.body}</div>
				</div>
			</div>
		);
	});

	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] pt-10 pb-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<h3 className="text-center font-bold text-[80px] text-gradient-primary-tr">FAQs</h3>
				<div id="accordionExample" className="mt-10">
					{FaqAccordion}
				</div>
			</div>
		</div>
	);
}
