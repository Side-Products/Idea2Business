import Image from "next/image";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
	return (
		<div className="w-full flex flex-col items-center bg-light-200 dark:bg-dark-1000">
			<div className="w-full max-w-[1920px] py-32 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<div className="container mx-auto flex flex-col gap-[50px] sm:gap-[55px] md:gap-[60px] lg:gap-[70px] xl:gap-[75px]">
					<div className="flex flex-col gap-[20px] text-center">
						<h1 className="px-24 text-3xl lg:text-[70px] tracking-[-2.5px] leading-[5.5rem] font-bold text-gradient-secondary-tr">
							Don't just take our word for it
						</h1>
						<p className="text-lg md:text-xl text-light-300">See what other people are saying</p>

						<section>
							<div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-10 lg:px-6">
								<figure class="max-w-screen-md mx-auto">
									<svg
										class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
										viewBox="0 0 24 27"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
											fill="currentColor"
										/>
									</svg>
									<blockquote>
										<p class="text-2xl font-medium text-gray-900 dark:text-white">
											"Project2Product was a game-changer for me! I had a passion project that I thought would never see the light of day,
											but with their help, I turned it into a successful business.
											<br /> I'm forever grateful!"
										</p>
									</blockquote>
									<figcaption class="flex items-center justify-center mt-6 space-x-3">
										<Image className="rounded-full" width={24} height={24} src="/testimonials/sparsh.jpg" alt="profile picture" />
										<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
											<div class="pr-3 font-medium text-gray-900 dark:text-white">Sparsh Sharma</div>
											<div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">TechLead</div>
										</div>
									</figcaption>
								</figure>
							</div>
						</section>

						<section class="relative overflow-hidden">
							<div class="relative z-10 container px-4 mx-auto">
								<div class="flex flex-wrap -m-3">
									<TestimonialCard
										name={"Shivansh"}
										position={"Serial Entrepreneur"}
										username={"@Shivansh3121"}
										avatar={"/testimonials/shivansh.jpg"}
										text={`Project2Product is just awesome. It helped me to take my project to the next level. Perfect choice to convert your
											next project into a real world product 🤙🏻`}
										daysAgo={"1 day ago"}
									/>

									<TestimonialCard
										name={"Melvin"}
										position={"Software Engineer"}
										username={"@itsmelvinmathew"}
										avatar={"/testimonials/melvin.jpg"}
										text={`Project2Product is a must-have tool for anyone looking to monetize their side-projects. They make it so easy to bring your ideas to life!`}
										daysAgo={"3 days ago"}
									/>

									<TestimonialCard
										name={"Shivam"}
										position={"Designer"}
										username={"@Shivamc504"}
										avatar={"/testimonials/shivam.jpg"}
										text={`I was skeptical at first, but Project2Product delivered on their promise. They helped me turn my hackathon project into a profitable product in no time!`}
										daysAgo={"3 days ago"}
									/>

									<TestimonialCard
										name={"Rakshit"}
										position={"Blockchain Developer"}
										username={"@rakshit087"}
										avatar={"/testimonials/rakshit.jpg"}
										text={`I was dumbfounded when I received the final result. What an insanely powerful tool! I now have a brilliant foundation for my product expansion. This is a no-brainer for startups.`}
										daysAgo={"1 day ago"}
									/>

									<TestimonialCard
										name={"Aayushi"}
										position={"Designer"}
										username={"@Aayushi7765"}
										avatar={"/testimonials/aayushi.jpg"}
										text={`I was impressed with how quickly Project2Product was able to help me turn my side-project into a profitable business. Their AI is literally so good!`}
										daysAgo={"6 days ago"}
									/>

									<TestimonialCard
										name={"Akshit"}
										position={"Marketer"}
										username={"@aksh_eth"}
										avatar={"/testimonials/akshit.jpg"}
										text={`Project2Product is a game-changer for anyone looking to turn their ideas into successful ventures. I would highly recommend it to anyone!`}
										daysAgo={"4 days ago"}
									/>

									<TestimonialCard
										name={"Rishabh"}
										position={"Software Developer"}
										username={"@theRishabhSh"}
										avatar={"/testimonials/rishabh.jpg"}
										text={`Project2Product is the real deal! They helped me turn my hackathon project into a thriving business. I would recommend them to anyone looking to do the same!`}
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
										name={"Raghav"}
										position={"Product Lead"}
										username={"@RaghavSaraf17"}
										avatar={"/testimonials/raghav.jpg"}
										text={`I was blown away by the quality of services that Project2Product provided me. It was so easy to use and the results were amazing!`}
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
