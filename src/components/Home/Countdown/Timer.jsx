import { useEffect, useState } from "react";
import styles from "@/styles/HomePage/Countdown/Countdown.module.css";
import CountdownCard from "./CountdownCard";

export default function Timer() {
	const [timeLeft, setTimeLeft] = useState({
		days: "",
		hours: "",
		minutes: "",
		seconds: "",
	});

	useEffect(() => {
		// const countDownDate = new Date("Nov 20, 2022 00:00:00").getTime();
		const countDownDate = new Date(new Date().getTime() + 10 * 86400000);
		const counterTimeout = setInterval(function () {
			// Get today's date and time
			const now = new Date().getTime();

			// Find the interval between now and the count down date
			const distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			setTimeLeft({
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			});
			// If the count down is finished, Clear the timeout
			if (distance < 0) clearInterval(counterTimeout);
		}, 1000);
	}, []);

	return (
		<div className={styles["countdown-container"]}>
			{/* Counter */}
			<div className={styles["countdown-container__timer-wrapper"]}>
				<CountdownCard number={timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days} text={timeLeft.days > 1 ? "Days" : "Day"} />
				<CountdownCard number={timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours} text={timeLeft.hours > 1 ? "Hours" : "Hour"} />
				<CountdownCard number={timeLeft.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes} text={timeLeft.minutes > 1 ? "Minutes" : "Minute"} />
				<CountdownCard number={timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds} text={timeLeft.seconds > 1 ? "Seconds" : "Second"} />
			</div>
			{/* Intro text */}
			<div className={styles["countdown-container__intro-text"]}>
				<h5 className={styles["countdown-container__intro-text--heading"]}>Musixverse Beta Program is full</h5>
				<p className={styles["countdown-container__intro-text--body-text"]}>We thank you for the overwhelming interest and support</p>
			</div>
		</div>
	);
}
