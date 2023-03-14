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
						<p className="text-lg md:text-xl text-light-300">See what other builders are saying</p>

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
											"Project2Product is just awesome. It helped me to take my project to the next level. Perfect choice to convert your
											next project into a real world product."
										</p>
									</blockquote>
									<figcaption class="flex items-center justify-center mt-6 space-x-3">
										<img
											class="w-6 h-6 rounded-full"
											src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
											alt="profile picture"
										/>
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
										name={"Jacob Jones"}
										username={"@brooklysim"}
										avatar={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
										text={`If you haven't tried out Flaro App yet, I would definitely recommend it for both designers and developers 🤙🏻`}
										daysAgo={"1 day ago"}
									/>

									<TestimonialCard
										name={"Wade Warren"}
										username={"@wade"}
										avatar={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
										text={`If you are thinking of a design partner to help you convert more customers, Flaro is a great choice.`}
										daysAgo={"3 days ago"}
									/>

									<TestimonialCard
										name={"Bessie Cooper"}
										username={"@bessiecoop"}
										avatar={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
										text={`We have built a few web apps using Flaro. It saves us a lot of time, because we don't have to build
														design features from scratch.`}
										daysAgo={"3 days ago"}
									/>

									<TestimonialCard
										name={"Esther Howard"}
										username={"@ehoward"}
										avatar={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
										text={`Wrike is great to make work visible and collaborative. People can pass tasks off as they complete their
														parts, allowing you to see the flow of work.`}
										daysAgo={"4 days ago"}
									/>

									<TestimonialCard
										name={"Albert Flores"}
										username={"@albert"}
										avatar={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
										text={`Ease of use and efficiency of design tools. The ability for the integrated marketing team to see all
														aspects of a project.`}
										daysAgo={"6 days ago"}
									/>

									<TestimonialCard
										name={"Jerome Bell"}
										username={"@belloj"}
										avatar={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"}
										text={`Very very easy for customer information to get secured if all orders are on one device.`}
										daysAgo={"1 week ago"}
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
