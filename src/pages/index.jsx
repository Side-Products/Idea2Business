import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { title_main_page, meta_description } from "@/config/constants";
import CustomButton from "@/layout/CustomButton";
import AuthModalContext from "@/store/authModal-context";

export default function HomePage() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [, setAuthModalOpen] = useContext(AuthModalContext);

	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="flex flex-col justify-center items-center bg-[url('/hero-3.jpg')] bg-cover bg-no-repeat h-screen">
				<h1 className="px-2 sm:px-8 md:px-16 text-[40px] sm:text-[50px] md:text-[80px] text-center font-semibold tracking-[-2.5px]">
					Transforming Your Projects Into Profitable Products!
				</h1>
				<p className="mt-8 text-center">Just provide your project details, Project2Product will help you turn it into a successful venture</p>
				<div className="w-2/3 sm:w-1/4 md:w-1/5 xl:w-1/6 mt-32">
					<CustomButton
						type="button"
						onClick={() => {
							if (session && session.user && status === "authenticated") {
								router.push("/generate");
							} else {
								setAuthModalOpen(true);
							}
						}}
						primary={true}
						rounded={true}
						classes="text-lg px-8 py-3"
					>
						Get Started
					</CustomButton>
				</div>
			</div>

			<main className="min-h-screen grid grid-cols-12 container mx-auto px-10 py-14 gap-x-5 place-content-center">
				<h1 className="col-span-12 lg:col-span-7 font-bold text-3xl md:text-5xl lg:text-6xl self-center leading-7">
					Get Your Side-Project Guided by AI!
				</h1>
				<p className="col-span-12 mt-5 lg:mt-0 lg:col-span-5 self-center text-white-700 text-lg">
					Project2Product provides personalized guide to accelerate the growth and success of your project. One tool could change everything and that
					too in<span className="text-red-700 font-bold"> under a minute</span>.
				</p>

				<article className="col-span-12 grid grid-cols-12 gap-x-5 md:mt-16 xl:mt-10 2xl:mt-5 items-center">
					<div className="order-2 md:order-1 col-span-12 lg:col-span-7 grid sm:grid-cols-2 gap-7 lg:gap-x-0 md:gap-y-16">
						<div className="lg:max-w-[80%]">
							<p className="number flex items-end text-5xl font-bold">
								1<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 mb-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold my-4">Turn your ideas into reality, faster!</h2>
							<p className="text-white-700 text-lg">You don't need to spend so much time & money to ship projects.</p>
						</div>
						<div className="lg:max-w-[80%]">
							<p className="number flex items-end text-5xl font-bold">
								2<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 mb-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Leverage AI's wisdom</h2>
							<p className="text-white-700 text-lg">AI is already here. Leverage it's wisdom to accelerate the growth your product. </p>
						</div>
						<div className="lg:max-w-[80%]">
							<p className=" number flex items-end text-5xl font-bold">
								3<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 "></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Get everything you need to succeed</h2>
							<p className="text-white-700 text-lg">
								Just provide your project details. From getting the <span className="text-red-700 font-bold">first initial users</span> to{" "}
								<span className="text-red-700 font-bold">drafting email pitch to a VC</span>, our platform will handle everything for you.
							</p>
						</div>
						<div className="lg:max-w-[80%]">
							<p className="number flex items-end text-5xl font-bold">
								4<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 -mb-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Receive instant guidance</h2>
							<p className="text-white-700 text-lg">
								Avoid weeks of research time and get valuable guidance in <span className="text-red-700 font-bold">&lt;1 minute</span>.
							</p>
						</div>
					</div>
					<img
						src="https://user-images.githubusercontent.com/53931942/215045536-27cad731-d419-4323-8148-e2cbf4c569ce.jpg"
						alt=""
						className="max-w-full aspect-[3/2] lg:aspect-square object-cover col-span-12 my-10 md:mb-0 md:mt-14 lg:my-0 lg:col-span-5 rounded-xl shadow-lg lg:h-full order-1"
					/>
				</article>
			</main>

			<div className="container mx-auto flex flex-col gap-[50px] sm:gap-[55px] md:gap-[60px] lg:gap-[70px] xl:gap-[75px] py-[30px] sm:py-[35px] md:py-[40px] lg:py-[45px] xl:py-[50px] px-[15px] sm:px-[30px] md:px-[45px] lg:px-[60px] xl:px-[75px]">
				<div className="top-bar flex flex-col gap-[30px] text-center">
				<span className="text-3xl md:text-4xl">How will Project2Product unlock your project's potential?</span>
				<p className="text-lg md:text-xl text-gray-200">
					Get all these for your project using our tool
				</p>
				</div>

				<div className="cards flex flex-col sm:flex-row flex-wrap justify-center gap-y-[35px] sm:gap-y-[40px] md:gap-y-[45px] lg:gap-y-[50px] gap-x-[35px]">
				<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
					<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
						<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
						<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
					</svg>
					</div>
					<div className="title text-lg md:text-xl text-center">Professional Pitch Deck</div>
					<div className="description text-gray-200 text-center">
					Get a polished and professional pitch deck to showcase your project and secure funding or partnerships.
					</div>
				</div>
				<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
					<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
						<path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z"/>
						<path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/>
					</svg>
					</div>
					<div className="title text-lg md:text-xl text-center">Pitches</div>
					<div className="description text-gray-200 text-center">
					Get personalized guidance on how to craft effective pitches for VCs, co-founders, advisors, and mentors.
					</div>
				</div>
				<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
					<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
						<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
						<path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
					</svg>
					</div>
					<div className="title text-lg md:text-xl text-center">Understanding Potential Users</div>
					<div className="description text-gray-200 text-center">
					Learn how to identify your target audience and understand their pain points to create a product that meets their needs.
					</div>
				</div>
				<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
					<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
						<path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
					</svg>
					</div>
					<div className="title text-lg md:text-xl text-center">Social Media Strategy</div>
					<div className="description text-gray-200 text-center">
					Get a comprehensive social media strategy to promote your project and reach a wider audience.
					</div>
				</div>
				<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
					<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-check" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
						<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
						<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
					</svg>
					</div>
					<div className="title text-lg md:text-xl text-center">Advice from Books</div>
					<div className="description text-gray-200 text-center">
					Get insight and guidance from top startup and business books, including The Lean Startup, Hooked, and The Startup Owner’s Manual.
					</div>
				</div>
				<div className="card w-full h-full sm:w-[calc(50%-18px)] lg:w-[calc(33%-21px)] flex items-center flex-col gap-[15px]">
					<div className="icon w-11 h-11 lg:w-12 lg:h-12 bg-black-600 rounded-full flex items-center justify-center border-[6px] border-gray-700 border-solid">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
						<path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
					</svg>
					</div>
					<div className="title text-lg md:text-xl text-center">Bonus</div>
					<div className="description text-gray-200 text-center">
					Get access to additional resources such as an MVP launch checklist, grant proposal, legal advice, and a SPME marketing strategy for solopreneurs
					</div>
				</div>
				</div>

				<div className="bottom-bar bg-slate-800 py-8 px-7 rounded-2xl flex flex-col gap-[20px] text-center items-center justify-center">
				<span className="text-4xl">Why we built this?</span>
				<p className="text-gray-200 text-2xl">
					We spent weeks to research and draft all these for our previous product, so we built a tool that does the job within minutes!
				</p>
				{/* <button className="py-3 px-7 w-fit border border-solid border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition">
					Get in touch
				</button> */}
				<div className="w-2/3 sm:w-1/4 md:w-1/5 xl:w-1/6 mt-8">
					<CustomButton
						type="button"
						onClick={() => {
							if (session && session.user && status === "authenticated") {
								router.push("/generate");
							} else {
								setAuthModalOpen(true);
							}
						}}
						primary={true}
						rounded={true}
						classes="text-lg px-8 py-3"
					>
						Get Started
					</CustomButton>
				</div>
				</div>
			</div>
		</>
	);
}
