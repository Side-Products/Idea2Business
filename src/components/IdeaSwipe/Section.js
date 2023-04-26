import { getTimeDifference } from "@/utils/Helpers";

export default function Section({ heading, cards, handleVote }) {
	return (
		cards &&
		cards.length > 0 && (
			<div className="pt-40 flex flex-col justify-center items-center">
				<h2 className="font-semibold text-gradient-primary-tr leading-[40px] text-[28px] sm:text-[36px]">{heading}</h2>

				<div className="grid grid-cols-4 gap-10 justify-center items-start mt-20">
					{cards.map((card, index) => (
						<div key={card._id} className={`relative bg-[#FFFDEE] px-6 py-4 shadow-xl rounded-2xl flex flex-col justify-center items-center`}>
							<Emoji label={card?.name} emoji={card?.emoji} />
							<Title title={card?.name} />
							<Description text={card?.description} />

							{card?.name && (
								<div className="w-full flex justify-between items-center px-8 mt-8 mb-6">
									<label
										onClick={() => handleVote(card, "downvote")}
										className={
											"flex group justify-center items-center w-14 h-14 rounded-full border-2 border-dark-900 hover:bg-dark-900 transition duration-300 cursor-pointer hover:opacity-100" +
											(card.vote == -1 ? " bg-dark-900" : card.vote == 1 ? " opacity-30" : "")
										}
									>
										<i
											className={
												"fa-solid fa-xmark text-2xl text-dark-900 group-hover:text-[#FFFDEE]" +
												(card.vote == -1 ? " text-[#FFFDEE]" : "")
											}
										></i>
									</label>
									<span className="text-dark-900 font-bold">{card?.votes}</span>
									<label
										onClick={() => handleVote(card, "upvote")}
										className={
											"flex group justify-center items-center w-14 h-14 rounded-full border-2 border-rose-500 hover:bg-rose-500 transition duration-300 cursor-pointer hover:opacity-100" +
											(card.vote == 1 ? " bg-rose-500" : card.vote == -1 ? " opacity-30" : "")
										}
									>
										<i
											className={
												"fa-solid fa-heart text-2xl text-rose-500 group-hover:text-[#FFFDEE]" +
												(card.vote == 1 ? " text-[#FFFDEE]" : "")
											}
										></i>
									</label>
								</div>
							)}

							<span className={"right-3 bottom-2 absolute text-[10px] text-light-600"}>{getTimeDifference(0, 0, card.timeDifference)}</span>
						</div>
					))}
				</div>
			</div>
		)
	);
}

const Emoji = ({ emoji, label }) => {
	return (
		<span role="img" aria-label={label} className="text-[40px]">
			{emoji}
		</span>
	);
};

const Title = ({ title }) => {
	return <span className="text-[24px] text-center font-bold text-dark-900">{title}</span>;
};

const Description = ({ text }) => {
	return <span className="mt-6 text-base text-center font-semibold text-dark-900">{text}</span>;
};
