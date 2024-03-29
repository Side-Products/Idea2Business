export default function GuidedByAI() {
	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] py-36 px-8 md:px-8 lg:px-16 xl:px-20 2xl:px-48 grid grid-cols-12 container mx-auto gap-x-5 place-content-center">
				<h1 className="lg:col-span-6 col-span-12 font-bold text-[42px] sm:leading-[80px] leading-[50px] lg:text-[70px] self-center tracking-[-2px] sm:tracking-[-2.5px] text-gradient-primary-tr">
					Get your idea guided by AI
				</h1>

				<p className="lg:col-start-8 lg:col-span-5 col-span-12 lg:mt-0 mt-5 self-center text-light-300 text-lg">
					Idea2Business provides a personalized guide to accelerate the growth and success of your idea. Use these tools to take your idea to the next
					level and that too in<span className="text-gradient-primary-tr font-bold"> under a minute</span>!
				</p>

				<article className="col-span-12 grid grid-cols-12 gap-x-5 md:mt-16 xl:mt-10 2xl:mt-6 items-center">
					<div className="lg:col-span-7 col-span-12 order-2 md:order-1 grid sm:grid-cols-2 gap-7 lg:gap-x-0 md:gap-y-16">
						<div className="lg:max-w-[80%]">
							<p className="number flex items-end text-4xl sm:text-5xl font-bold">
								1<span className="inline-block bg-gradient-secondary-tr h-1.5 rounded-full w-1.5 mb-1 ml-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold my-4">Turn your ideas into reality, faster!</h2>
							<p className="text-white-700 text-md text-light-400">You don&apos;t need to spend so much time & money to ship ideas.</p>
						</div>
						<div className="lg:max-w-[80%]">
							<p className="number flex items-end text-4xl sm:text-5xl font-bold">
								2<span className="inline-block bg-gradient-secondary-tr h-1.5 rounded-full w-1.5 mb-1 ml-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Leverage AI&apos;s wisdom</h2>
							<p className="text-white-700 text-md text-light-400">
								AI is already here. Leverage it&apos;s wisdom to accelerate the growth of your business.{" "}
							</p>
						</div>
						<div className="lg:max-w-[80%]">
							<p className=" number flex items-end text-4xl sm:text-5xl font-bold">
								3<span className="inline-block bg-gradient-secondary-tr h-1.5 rounded-full w-1.5 mb-1 ml-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Get everything you need to succeed</h2>
							<p className="text-white-700 text-md text-light-400">
								Just provide some details about your idea. From getting the{" "}
								<span className="text-gradient-primary-tr font-bold">first initial users</span> to{" "}
								<span className="text-gradient-primary-tr font-bold">drafting email pitch to a VC</span>, our platform will handle everything
								for you.
							</p>
						</div>
						<div className="lg:max-w-[80%]">
							<p className="number flex items-end text-4xl sm:text-5xl font-bold">
								4<span className="inline-block bg-gradient-secondary-tr h-1.5 rounded-full w-1.5 mb-1 ml-1"></span>
							</p>

							<h2 className="text-xl lg:text-2xl font-bold mt-4 mb-3">Receive instant guidance</h2>
							<p className="text-white-700 text-md text-light-400">
								Avoid weeks of research time and get valuable guidance in{" "}
								<span className="text-gradient-primary-tr font-bold">&lt;1 minute</span>.
							</p>
						</div>
					</div>
					<img
						src="https://user-images.githubusercontent.com/53931942/215262507-3dc80479-3f2d-43dc-b412-df2686f10d5e.jpg"
						alt=""
						className="lg:col-span-5 col-span-12 max-w-full aspect-[3/2] lg:aspect-square object-cover my-10 md:mb-0 md:mt-14 lg:my-0 rounded-2xl shadow-lg order-1"
					/>
				</article>

				<p className="col-span-12 mt-20 text-center text-sm self-center text-light-500">Tailored for you. Powered by AI 🪄</p>
			</div>
		</div>
	);
}
