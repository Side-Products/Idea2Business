import { useRouter } from "next/router";

export default function Error404() {
	const router = useRouter();

	return (
		<div className="w-full flex flex-col items-center justify-center bg-dark-1000">
			<div id="error-404" className="w-full max-w-[1920px]">
				<div className="noise"></div>
				<div className="overlay"></div>
				<div className="terminal py-40 px-10 md:p-40">
					<h1>
						Error <span className="errorcode">404</span>
					</h1>
					<p className="output mt-8">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
					<p className="output mt-4">
						Please try to{" "}
						<span className="link-404" onClick={() => router.back()}>
							go back
						</span>{" "}
						or{" "}
						<span className="link-404" onClick={() => router.push("/")}>
							return to the homepage
						</span>
						.
					</p>
					<p className="output mt-4">Good luck.</p>
				</div>
			</div>
		</div>
	);
}
