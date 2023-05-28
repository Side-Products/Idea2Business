import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

export default function DevHubCollab() {
	const card = {
		name: "DevHub",
		emoji: "🚀",
		description: "Your one-stop solution for all dev needs.",
		votes: 64,
		vote: 0,
		timeDifference: "28 May 2023",
	};

	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] pb-28 pt-20 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<div className="w-full relative flex flex-col items-center justify-center lg:text-center bg-gradient-quad-tr sm:py-16 sm:px-14 md:px-16 lg:px-24 xl:px-32 py-8 px-8 rounded-3xl">
					<Pill variant={"tertiary"} classes={"absolute top-3 right-4 text-xs"} rounded={true}>
						Advertisement
					</Pill>

					<p className="text-4xl sm:text-5xl lg:text-[54px] xl:text-6xl font-bold sm:tracking-[-2px] tracking-[-1.5px]">
						DevHub: Streamlining Dev Workflows!
					</p>

					<div className="grid sm:grid-cols-2 grid-cols-1 sm:mt-20 mt-10">
						<div className="text-start text-3xl sm:text-[40px] lg:text-[44px] xl:text-5xl font-bold sm:tracking-[-1px] md:tracking-[-2px] tracking-[-1.5px]">
							<p>No extra work.</p>
							<p className="sm:mt-10">Your dev tools simplified. All the dev essentials at one place!</p>

							<div className="md:w-full sm:w-4/5 w-full sm:mt-20 mt-8">
								<a target="_blank" href="https://devhubhq.me" rel="noopener noreferrer">
									<Button type="button" variant={"primary"} rounded={true} classes="text-lg px-8 py-3 shadow-2xl">
										Enter the world of DevHub
									</Button>
								</a>
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
								<img
									src={`https://pbs.twimg.com/profile_images/1650367957535473665/wNnxlK-8_400x400.jpg`}
									width="60"
									className="rounded-full mb-6"
								/>
								<Title title={card?.name} />
								<Description text={card?.description} />

								<span className={"right-3 bottom-2 absolute text-[10px] text-light-600"}>{card?.timeDifference}</span>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const Title = ({ title }) => {
	return <span className="text-[28px] text-center -mt-2 font-bold text-dark-900">{title}</span>;
};

const Description = ({ text }) => {
	return <span className="mt-6 text-lg text-center font-semibold text-dark-900 mb-8">{text}</span>;
};
