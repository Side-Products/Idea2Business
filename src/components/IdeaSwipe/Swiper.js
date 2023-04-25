// import { getTimestamp } from "@/utils/Helpers";

// const Card = ({ ideaName, ideaDescription, voteCurrentIdea }) => {
// 	return (
// 		<div className="relative max-w-[400px] bg-[#FFF8C9] text-lg text-dark-900 font-semibold rounded-xl pt-6 pb-9 px-6 mt-20 shadow-xl cursor-pointer">
// 			<div className="w-full flex justify-center text-center font-bold text-[22px]">{ideaName}</div>
// 			<div className="mt-6 text-center">{ideaDescription}</div>
// 			<div className="flex justify-between items-center px-16 mt-10">
// 				<label
// 					onClick={() => voteCurrentIdea("downvote")}
// 					className="flex group justify-center items-center w-14 h-14 rounded-full border-2 border-dark-900 hover:bg-dark-900 transition duration-300 cursor-pointer"
// 				>
// 					<i className="fa-solid fa-xmark text-2xl text-dark-900 group-hover:text-[#FFF8C9]"></i>
// 				</label>
// 				<span className="text-dark-900 font-bold">32</span>
// 				<label
// 					onClick={() => voteCurrentIdea("upvote")}
// 					className="flex group justify-center items-center w-14 h-14 rounded-full border-2 border-rose-500 hover:bg-rose-500 transition duration-300 cursor-pointer"
// 				>
// 					<i className="fa-solid fa-heart text-2xl text-rose-500 group-hover:text-[#FFF8C9]"></i>
// 				</label>
// 			</div>
// 			<span className={"right-3 bottom-2 absolute text-xs text-light-600"}>{getTimestamp(Date.now()).slice(0, 10)}</span>
// 		</div>
// 	);
// };

// export default Card;

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Counter from "./Counter";
import CARDS from "./cards";
import Card from "./Card";

const Swiper = () => {
	const [cards, setCards] = useState(CARDS);
	const [result, setResult] = useState({
		like: 0,
		nope: 0,
		superlike: 0,
	});
	const [history, setHistory] = useState([]);
	// index of last card
	const activeIndex = cards.length - 1;

	const removeCard = (oldCard, swipe) => {
		setHistory((current) => [...current, { ...oldCard, swipe }]);
		setCards((current) =>
			current.filter((card) => {
				return card.id !== oldCard.id;
			})
		);
		setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
	};

	const undoSwipe = () => {
		const newCard = history.pop();
		if (newCard) {
			const { swipe } = newCard;
			setHistory((current) =>
				current.filter((card) => {
					return card.id !== newCard.id;
				})
			);
			setResult((current) => ({ ...current, [swipe]: current[swipe] - 1 }));
			setCards((current) => [...current, newCard]);
		}
	};

	return (
		<div className="relative flex flex-col justify-center items-center w-full h-screen gradient">
			<AnimatePresence>
				{cards.map((card, index) => (
					<Card key={card.name} active={index === activeIndex} removeCard={removeCard} card={card} />
				))}
			</AnimatePresence>
			{cards.length === 0 ? <span className="text-white text-xl">End of Stack</span> : null}
			<footer className="absolute bottom-4 flex items-center space-x-4">
				<div className="flex flex-col items-center space-y-2">
					<button
						disabled={history.length === 0}
						className="w-14 h-14 rounded-full text-black bg-white inline-flex justify-center items-center disabled:cursor-not-allowed"
						onClick={undoSwipe}
						data-testid="undo-btn"
						aria-label="Undo Swipe"
					></button>
					<span className="text-xs text-white">Undo</span>
				</div>
				<Counter label="Likes" count={result.like} testid="like-count" />
				<Counter label="Nopes" count={result.nope} testid="nope-count" />
				<Counter label="Superlike" count={result.superlike} testid="superlike-count" />
			</footer>
		</div>
	);
};

export default Swiper;
