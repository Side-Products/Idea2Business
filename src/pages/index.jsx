/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { title_main_page, meta_description } from "@/config/constants";
import styles from "../../styles/Hero/Hero.module.css";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />
			</Head>

			{/* <div className="w-screen h-screen flex flex-col relative items-center justify-center">
				<div className="absolute w-full h-full">
					<Image src={"/bg-4.jpg"} alt="bg env" priority fill style={{ objectFit: "cover" }}></Image>
				</div>
				<div className="z-10 flex flex-col items-center justify-center space-y-12 w-full h-full backdrop-blur-[2px] backdrop-brightness-75">
					<h1 className="-mt-28 font-primary tracking-wide font-bold text-[140px] text-white">Project~Product</h1>
					<Link href={"/generate"} passHref>
						<button className="rounded-3xl px-8 py-2 bg-transparent border border-white text-center font-primary text-white ">
							Enter the magical portal
						</button>
					</Link>
				</div>
			</div> */}
			<div className={styles.heroSection}>
				<div className={styles.heroText}>
					<h1 className={styles.heroTitle}>Transforming Your Projects Into Profitable Products!</h1>
					<p className={styles.heroSubTitle}>Just provide your project details, Project2Product will help you turn it into a successful venture.</p>
					<br />
					<Link href={"/generate"} passHref>
						<button className={styles.joinNow}>Take your project to moon!</button>
					</Link>
				</div>
    		</div>

			<main className="min-h-screen grid grid-cols-12 container mx-auto px-10 py-14 gap-x-5 place-content-center">
				<h1 className="col-span-12 lg:col-span-7 font-bold text-3xl md:text-5xl lg:text-6xl self-center leading-7">Get Your Side-Project Guided by AI!</h1>
				<p className="col-span-12 mt-5 lg:mt-0 lg:col-span-5 self-center text-white-700 text-lg">Project2Product provides personalized guide to accelerate the growth and success of your project. One tool could change everything and that too in<span className="text-red-700 font-bold"> under a minute</span>.</p>

				<article className="col-span-12 grid grid-cols-12 gap-x-5 md:mt-16 xl:mt-10 2xl:mt-5 items-center">
					<div className="order-2 md:order-1 col-span-12 lg:col-span-7 grid sm:grid-cols-2 gap-7 lg:gap-x-0 md:gap-y-16">
					<div className="lg:max-w-[80%]">
						<p className="number flex items-end text-5xl font-bold">1<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 mb-1"></span></p>

						<h2 className="text-xl lg:text-2xl font-bold my-4">Turn your ideas into reality, faster!</h2>
						<p className="text-white-700 text-lg">You don't need to spend so much time & money to ship projects.</p>
					</div>
					<div className="lg:max-w-[80%]">
						<p className="number flex items-end text-5xl font-bold">2<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 mb-1"></span></p>

						<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Leverage AI's wisdom</h2>
						<p className="text-white-700 text-lg">AI is already here. Leverage it's wisdom to accelerate the growth your product. </p>
					</div>
					<div className="lg:max-w-[80%]">
						<p className=" number flex items-end text-5xl font-bold">3<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 "></span></p>

						<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Get everything you need to succeed</h2>
						<p className="text-white-700 text-lg">Just provide your project details. From getting the <span className="text-red-700 font-bold">first initial users</span> to <span className="text-red-700 font-bold">drafting email pitch to a VC</span>, our platform will handle everything for you.</p>
					</div>
					<div className="lg:max-w-[80%]">
						<p className="number flex items-end text-5xl font-bold">4<span className="inline-block bg-red-400 h-1.5 rounded-full w-1.5 -mb-1"></span></p>

						<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Receive instant guidance</h2>
						<p className="text-white-700 text-lg">Avoid weeks of research time and get valuable guidance in <span className="text-red-700 font-bold">&lt;1 minute</span>.</p>
					</div>
					</div>
					<img src="https://user-images.githubusercontent.com/53931942/215045536-27cad731-d419-4323-8148-e2cbf4c569ce.jpg" alt="" className="max-w-full aspect-[3/2] lg:aspect-square object-cover col-span-12 my-10 md:mb-0 md:mt-14 lg:my-0 lg:col-span-5 rounded-xl shadow-lg lg:h-full order-1" />
				</article>

			</main>
			
		</>
	);
}
