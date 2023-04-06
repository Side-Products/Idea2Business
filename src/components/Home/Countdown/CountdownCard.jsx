import styles from "@/styles/HomePage/Countdown/CountdownCard.module.css";

export default function CountdownCard({ number, text }) {
	return (
		<div className={styles["timer-wrapper"]}>
			<h3 className={styles["timer-wrapper__number"]}>{number}</h3>
			<p className={styles["timer-wrapper__unit"]}>{text}</p>
		</div>
	);
}
