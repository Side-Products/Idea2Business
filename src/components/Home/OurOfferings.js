import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthModalContext from "@/store/authModal-context";
import Button from "@/components/ui/Button";

export default function OurOfferings() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [, setAuthModalOpen] = useContext(AuthModalContext);

	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] py-20 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-40">
				<div className="w-full flex flex-col justify-center items-center m-0 p-0 gap-[50px] sm:gap-[55px] md:gap-[60px] lg:gap-[70px] xl:gap-[75px]">
					<div className="flex flex-col gap-[30px] text-center">
						<h1 className="md:px-24 text-3xl lg:text-[70px] tracking-[-2px] sm:tracking-[-2.5px] sm:leading-[5.5rem] font-bold text-gradient-primary-tr">
							How will Idea2Business unlock your idea's potential?
						</h1>
						<p className="text-md md:text-xl text-light-300">Get all these for your idea using our tool</p>
					</div>

					<div className="cards flex flex-col sm:flex-row flex-wrap justify-center gap-y-[35px] sm:gap-y-[40px] md:gap-y-[45px] lg:gap-y-[60px] gap-x-[35px]">
						<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
							<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-card-text"
									viewBox="0 0 16 16"
								>
									<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
									<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
								</svg>
							</div>
							<div className="title text-lg md:text-xl text-center lg:text-2xl font-bold">Professional Pitch Deck</div>
							<div className="description text-light-400 text-center px-8">
								Get a polished and professional pitch deck to showcase your project and secure funding or partnerships.
							</div>
						</div>
						<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
							<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-twitter"
									viewBox="0 0 16 16"
								>
									<path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
								</svg>
							</div>
							<div className="title text-lg md:text-xl text-center lg:text-2xl font-bold">Social Media Strategy</div>
							<div className="description text-light-400 text-center px-8">
								Get a comprehensive social media strategy to promote your project and reach a wider audience.
							</div>
						</div>
						<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
							<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-envelope-at-fill"
									viewBox="0 0 16 16"
								>
									<path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
									<path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
								</svg>
							</div>
							<div className="title text-lg md:text-xl text-center lg:text-2xl font-bold">Pitches</div>
							<div className="description text-light-400 text-center px-8">
								Get personalized guidance on how to craft effective pitches for VCs, co-founders, advisors, and mentors.
							</div>
						</div>
						<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
							<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-person-check"
									viewBox="0 0 16 16"
								>
									<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
									<path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
								</svg>
							</div>
							<div className="title text-lg md:text-xl text-center lg:text-2xl font-bold">Understanding Potential Users</div>
							<div className="description text-light-400 text-center px-8">
								Learn how to identify your target audience and understand their pain points to create a product that meets their needs.
							</div>
						</div>
						<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
							<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-journal-check"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
									/>
									<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
									<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
								</svg>
							</div>
							<div className="title text-lg md:text-xl text-center lg:text-2xl font-bold">Advice from Books</div>
							<div className="description text-light-400 text-center px-8">
								Get insight and guidance from top startup and business books, including The Lean Startup, Hooked, and The Startup Owner’s
								Manual.
							</div>
						</div>
						<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
							<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
									<path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
								</svg>
							</div>
							<div className="title text-lg md:text-xl text-center lg:text-2xl font-bold">Bonus</div>
							<div className="description text-light-400 text-center px-8">
								Get access to additional resources such as an MVP launch checklist, grant proposal, legal advice, and a SPME marketing strategy
								for solopreneurs.
							</div>
						</div>
					</div>

					<div className="w-full flex flex-col items-center justify-center lg:text-center bg-gradient-quad-tr sm:py-16 sm:px-14 md:px-16 lg:px-24 xl:px-32 py-8 px-8 rounded-3xl">
						<span className="text-4xl sm:text-5xl lg:text-[54px] xl:text-6xl font-bold sm:tracking-[-2.5px] tracking-[-1.5px]">
							Kickstart your funding with a custom pitch deck template for your project
						</span>

						<div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 sm:mt-16 mt-10">
							<Button
								type="button"
								variant={"primary"}
								rounded={true}
								onClick={() => {
									if (session && session.user && status === "authenticated") {
										router.push("/generate");
									} else {
										setAuthModalOpen(true);
									}
								}}
								classes="text-lg px-8 py-3 shadow-2xl"
							>
								Get your deck now
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
