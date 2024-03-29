import Image from "next/image";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] py-32 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<div className="container mx-auto flex flex-col gap-[50px] sm:gap-[55px] md:gap-[60px] lg:gap-[70px] xl:gap-[75px]">
					<div className="w-full flex flex-col gap-[20px] text-center">
						<h1 className="md:px-24 text-5xl lg:text-[70px] tracking-[-2.5px] sm:leading-[5.5rem] font-bold text-gradient-secondary-tr">
							Don&apos;t just take our word for it
						</h1>
						<p className="text-lg md:text-xl text-light-300">See what other people are saying</p>

						<section>
							<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-10 lg:px-6">
								<figure className="max-w-screen-md mx-auto">
									<svg className="h-12 mx-auto mb-3 text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
											fill="currentColor"
										/>
									</svg>
									<blockquote>
										<p className="text-lg sm:text-2xl font-medium text-white">
											&quot;Idea2Business was a game-changer for me! I had a passion project that I thought would never see the light of
											day, but with their help, I turned it into a successful business.
											<br /> I&apos;m forever grateful!&quot;
										</p>
									</blockquote>
									<figcaption className="flex items-center justify-center mt-6 space-x-3">
										<Image className="rounded-full" width={24} height={24} src="/testimonials/sparsh.jpg" alt="profile picture" />
										<div className="flex items-center divide-x-2 divide-gray-700">
											<div className="pr-3 font-medium text-white">Sparsh Sharma</div>
											<div className="pl-3 text-sm font-light text-gray-400">TechLead</div>
										</div>
									</figcaption>
								</figure>
							</div>
						</section>

						<section className="relative overflow-hidden">
							<div className="relative z-10 container sm:px-4 mx-auto">
								<div className="flex flex-wrap -m-3">
									<TestimonialCard
										name={"Shivansh"}
										position={"Serial Entrepreneur"}
										username={"@Shivansh3121"}
										avatar={"/testimonials/shivansh.jpg"}
										text={`Idea2Business is just awesome. It helped me to take my idea to the next level. Perfect choice to convert your
											next idea into a real world product 🤙🏻`}
										daysAgo={"1 day ago"}
									/>

									<TestimonialCard
										name={"Melvin"}
										position={"Software Engineer"}
										username={"@itsmelvinmathew"}
										avatar={"/testimonials/melvin.jpg"}
										text={`Idea2Business is a must-have tool for anyone looking to monetize their side-projects. They make it so easy to bring your ideas to life!`}
										daysAgo={"3 days ago"}
									/>

									<TestimonialCard
										name={"Shivam"}
										position={"Designer"}
										username={"@Shivamc504"}
										avatar={"/testimonials/shivam.jpg"}
										text={`I was skeptical at first, but Idea2Business delivered on their promise. They helped me turn my hackathon project into a profitable product in no time!`}
										daysAgo={"3 days ago"}
									/>

									<TestimonialCard
										name={"Deepak"}
										position={"Blockchain Developer"}
										username={"@0xdeepak_eth"}
										avatar={"/testimonials/deepak.jpg"}
										text={`I was dumbfounded when I received the final result. What an insanely powerful tool! I now have a brilliant foundation for my product expansion. This is a no-brainer for startups.`}
										daysAgo={"1 day ago"}
									/>

									<TestimonialCard
										name={"Aayushi"}
										position={"Designer"}
										username={"@Aayushi7765"}
										avatar={"/testimonials/aayushi.jpg"}
										text={`I was impressed with how quickly Idea2Business was able to help me turn my idea into a profitable business. Their AI is literally so good!`}
										daysAgo={"6 days ago"}
									/>

									<TestimonialCard
										name={"Akshit"}
										position={"Marketer"}
										username={"@aksh_eth"}
										avatar={"/testimonials/akshit.jpg"}
										text={`Idea2Business is a game-changer for anyone looking to turn their ideas into successful ventures. I would highly recommend it to anyone!`}
										daysAgo={"4 days ago"}
									/>

									<TestimonialCard
										name={"Rishabh"}
										position={"Software Developer"}
										username={"@theRishabhSh"}
										avatar={"/testimonials/rishabh.jpg"}
										text={`Idea2Business is the real deal! They helped me turn my hackathon project into a thriving business. I would recommend them to anyone looking to do the same!`}
										daysAgo={"1 week ago"}
									/>

									<TestimonialCard
										name={"Yuvraj"}
										position={"Entrepreneur"}
										username={"@YuvrajChandra21"}
										avatar={"/testimonials/yuvraj.jpg"}
										text={`Happy I found this service while trying to build a pitch deck for my company! Great for inspiration in getting started and a huge time saver getting a deck off the ground.`}
										daysAgo={"1 day ago"}
									/>

									<TestimonialCard
										name={"Ayush"}
										position={"Product Manager"}
										username={"@ayushgupta0110"}
										avatar={"/testimonials/ayush.jpg"}
										text={`I was blown away by the quality of services that Idea2Business provided me. It was so easy to use and the results were amazing!`}
										daysAgo={"1 day ago"}
									/>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
