export default function ShinyLoader({ rounded, classes }) {
	return <div className={`bg-gray-300 dark:bg-[#363636] animate-pulse ${classes ? classes : " w-full h-full"} ${rounded ? " rounded-full" : ""}`}></div>;
}
