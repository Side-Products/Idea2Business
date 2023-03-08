import { useContext } from "react";
import LoadingContext from "@/store/loading-context";
import styles from "@/styles/Loading/LoadingDark.module.css";
import Loader from "@/components/ui/Loader";

export default function Loading() {
	const [isLoading] = useContext(LoadingContext);

	return (
		isLoading &&
		isLoading.status && (
			<div className={styles["loading_container"]}>
				<div className={styles["loading_container_box"]}>
					{/* <div className={styles["loadingSpinner"]}></div> */}
					<Loader width="150" height="150" viewBox="-100 -100 400 400" />
				</div>
				{isLoading.title && <p>{isLoading.title}</p>}

				{isLoading.showProgressBar && (
					<div className="w-11/12 sm:1/2 md:1/4 lg:w-1/5 mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
						<div
							className={"relative min-w-fit bg-primary-500 text-xs font-medium text-blue-100 text-end p-0.5 leading-none rounded-full"}
							style={{ width: `${isLoading.progress}%` }}
						>
							<div className="relative text-white text-xs inline-block bg-primary-500 px-2 h-full rounded-full">{isLoading.progress}%</div>
						</div>
					</div>
				)}

				{isLoading.message && (
					<p>
						<span>{isLoading.message}</span>
					</p>
				)}

				{isLoading.waitMessage && (
					<p>
						<span>{isLoading.waitMessage}</span>
					</p>
				)}
			</div>
		)
	);
}
