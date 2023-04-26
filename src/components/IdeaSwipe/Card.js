import { motion } from "framer-motion";
import { useState } from "react";

const Card = ({ card, handleVote, active, loading }) => {
	const [leaveX, setLeaveX] = useState(0);
	const [leaveY, setLeaveY] = useState(0);

	const upvote = () => {
		setLeaveX(1000);
		handleVote(card, "upvote");
	};

	const downvote = () => {
		setLeaveX(-1000);
		handleVote(card, "downvote");
	};

	const onDragEnd = (_e, info) => {
		if (info.offset.x > 100) {
			upvote();
		}
		if (info.offset.x < -100) {
			downvote();
		}
	};

	const classNames = `absolute h-[430px] w-[300px] bg-[#FFFDEE] px-6 shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`;

	return (
		<>
			{active ? (
				<motion.div
					drag={true}
					dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
					onDragEnd={onDragEnd}
					dragElastic={0.9}
					whileTap={{ scale: 1.1 }}
					initial={{
						scale: 1,
					}}
					animate={{
						scale: 1.05,
						rotate: `${card?.name?.length % 2 === 0 ? 2 : -2}deg`,
					}}
					exit={{
						x: leaveX,
						y: leaveY,
						opacity: 0,
						scale: 0.5,
						transition: { duration: 0.3 },
					}}
					className={classNames}
					data-testid="active-card"
				>
					<Emoji label={card?.name} emoji={card?.emoji} />
					<Title title={card?.name} />
					<Description text={card?.description} />

					{card?.name && (
						<div className="w-full flex justify-between items-center px-8 mt-8 mb-6">
							<label
								id="downvote"
								onClick={() => downvote()}
								className={
									"flex group justify-center items-center w-14 h-14 rounded-full border-2 border-dark-900 hover:bg-dark-900 transition duration-300 cursor-pointer hover:opacity-100" +
									(card.vote == -1 ? " bg-dark-900" : card.vote == 1 ? " opacity-30" : "")
								}
							>
								<i
									className={"fa-solid fa-xmark text-2xl text-dark-900 group-hover:text-[#FFFDEE] " + (card.vote == -1 && "text-[#FFFDEE]")}
								></i>
							</label>
							<span className="text-dark-900 font-bold">{card?.votes}</span>
							<label
								id="upvote"
								onClick={() => upvote()}
								className={
									"flex group justify-center items-center w-14 h-14 rounded-full border-2 border-rose-500 hover:bg-rose-500 transition duration-300 cursor-pointer hover:opacity-100" +
									(card.vote == 1 ? " bg-rose-500" : card.vote == -1 ? " opacity-30" : "")
								}
							>
								<i
									className={"fa-solid fa-heart text-2xl text-rose-500 group-hover:text-[#FFFDEE] " + (card.vote == 1 && "text-[#FFFDEE]")}
								></i>
							</label>
						</div>
					)}

					{(loading || !card.name) && <span className="ideaSwipe-loader"></span>}

					<span className={"right-3 bottom-2 absolute text-[10px] text-light-600"}>{card?.timeDifference}</span>
				</motion.div>
			) : (
				<div className={`${classNames} ${card?.name?.length % 2 === 0 ? "-rotate-[0deg]" : "rotate-[0deg]"}`}>
					<span className="ideaSwipe-loader"></span>
				</div>
			)}
		</>
	);
};

/**
 * a11y friendly component for emojis
 * @reference https://devyarns.com/accessible-emojis
 */
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

export default Card;
