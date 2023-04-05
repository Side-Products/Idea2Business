import { useContext } from "react";
import styles from "@/styles/Loading/Loading.module.css";
import { LoadingContext } from "@/store/LoadingContextProvider";
import Loader from "@/components/ui/Loader";

export default function Loading() {
	const { loading } = useContext(LoadingContext);

	return (
		loading.status && (
			<div className={loading.section ? styles["loading_section_container"] : styles["loading_container"]}>
				<div className={styles["loading_container_box"]}>
					{/* <div className={styles["loadingSpinner"]}></div> */}
					<Loader width="150" height="150" viewBox="-100 -100 400 400" classes="pb-0 -mb-4" />
				</div>
				{loading.title && <p>{loading.title}</p>}

				{loading.showProgressBar && (
					<div className="w-11/12 sm:1/2 md:1/4 lg:w-1/5 mt-2 rounded-full bg-gray-700">
						<div
							className={"relative min-w-fit bg-primary-500 text-xs font-medium text-blue-100 text-end p-0.5 leading-none rounded-full"}
							style={{ width: `${loading.progress}%` }}
						>
							<div className="relative text-white text-xs inline-block bg-primary-500 px-2 h-full rounded-full">{loading.progress}%</div>
						</div>
					</div>
				)}

				{loading.message && (
					<p className={styles["message"]}>
						<span>{loading.message}</span>
					</p>
				)}

				{loading.waitMessage && (
					<p className={styles["waitMessage"]}>
						<span>{loading.waitMessage}</span>
					</p>
				)}
			</div>
		)
	);
}
