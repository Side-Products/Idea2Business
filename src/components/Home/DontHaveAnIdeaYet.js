import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function DontHaveAnIdeaYet() {
	const router = useRouter();

	const card = {
		name: "Idea2Business",
		emoji: "🚀",
		description: "Idea2Business is a platform that helps you to turn your idea into a business.",
		votes: 64,
		vote: 0,
		timeDifference: "2 weeks ago",
	};

	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] py-28 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<div className="w-full flex flex-col items-center justify-center lg:text-center bg-gradient-tertiary-r sm:py-16 sm:px-14 md:px-16 lg:px-24 xl:px-32 py-8 px-8 rounded-3xl">
					<p className="text-4xl sm:text-5xl lg:text-[54px] xl:text-6xl font-bold sm:tracking-[-2.5px] tracking-[-1.5px]">
						Don&apos;t have an idea yet?
					</p>

					<div className="grid sm:grid-cols-2 grid-cols-1 sm:mt-20 mt-10">
						<div className="text-start text-3xl sm:text-[40px] lg:text-[44px] xl:text-5xl font-bold sm:tracking-[-1px] md:tracking-[-2.5px] tracking-[-1.5px]">
							<p>No worries.</p>
							<p className="sm:mt-10">Check out new ideas on Idea Swipe!</p>

							<div className="md:w-full sm:w-4/5 w-full sm:mt-20 mt-8">
								<Button
									type="button"
									variant={"primary"}
									rounded={true}
									onClick={() => router.push("/idea-swipe")}
									classes="text-lg px-8 py-3 shadow-2xl"
								>
									Swipe Now
								</Button>
							</div>
						</div>

						<div className="relative flex items-end sm:justify-end justify-center sm:mt-0 mt-16">
							<motion.div
								drag={true}
								dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
								dragElastic={0.9}
								whileTap={{ scale: 1.1 }}
								initial={{
									scale: 1,
								}}
								animate={{
									scale: 1.05,
									rotate: `2deg`,
								}}
								exit={{
									opacity: 0,
									scale: 0.5,
									transition: { duration: 0.3 },
								}}
								className={`h-[380px] w-[300px] bg-[#FFFDEE] px-6 shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`}
								data-testid="active-card"
							>
								<Emoji label={card?.name} emoji={card?.emoji} />
								<Title title={card?.name} />
								<Description text={card?.description} />

								{card?.name && (
									<div className="w-full flex justify-between items-center px-8 mt-8 mb-6">
										<label
											onClick={() => router.push("/idea-swipe")}
											className={
												"flex group justify-center items-center w-14 h-14 rounded-full border-2 border-dark-900 hover:bg-dark-900 transition duration-300 cursor-pointer hover:opacity-100" +
												(card.vote == -1 ? " bg-dark-900" : card.vote == 1 ? " opacity-30" : "")
											}
										>
											<i
												className={
													"fa-solid fa-xmark text-2xl text-dark-900 group-hover:text-[#FFFDEE] " +
													(card.vote == -1 && "text-[#FFFDEE]")
												}
											></i>
										</label>
										<span className="text-dark-900 font-bold">{card?.votes}</span>
										<label
											onClick={() => router.push("/idea-swipe")}
											className={
												"flex group justify-center items-center w-14 h-14 rounded-full border-2 border-rose-500 hover:bg-rose-500 transition duration-300 cursor-pointer hover:opacity-100" +
												(card.vote == 1 ? " bg-rose-500" : card.vote == -1 ? " opacity-30" : "")
											}
										>
											<i
												className={
													"fa-solid fa-heart text-2xl text-rose-500 group-hover:text-[#FFFDEE] " +
													(card.vote == 1 && "text-[#FFFDEE]")
												}
											></i>
										</label>
									</div>
								)}

								<span className={"right-3 bottom-2 absolute text-[10px] text-light-600"}>{card?.timeDifference}</span>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const Emoji = ({ emoji, label }) => {
	return (
		<span role="img" aria-label={label} className="text-[60px]">
			{emoji}
		</span>
	);
};

const Title = ({ title }) => {
	return <span className="text-[28px] text-center -mt-2 font-bold text-dark-900">{title}</span>;
};

const Description = ({ text }) => {
	return <span className="mt-6 text-lg text-center font-semibold text-dark-900">{text}</span>;
};
