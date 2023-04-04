import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import Button from "@/components/ui/Button";

export default function WhyWeBuiltThis() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const { setAuthModalOpen } = useContext(AuthModalContext);

	return (
		<div className="w-full flex flex-col items-center bg-dark-1000">
			<div className="w-full max-w-[1920px] pt-20 pb-40 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<div className="flex flex-col items-center justify-center text-center bg-gradient-tertiary-r sm:py-16 sm:px-16 lg:px-32 px-6 py-8 rounded-3xl">
					<span className="text-4xl sm:text-6xl font-bold tracking-[-2px] sm:tracking-[-2.5px]">Why we built this?</span>
					<p className="mt-10 text-light-300 text-xl sm:text-3xl tracking-[-0.5px]">
						We spent weeks to research and draft all these for our previous product, so we built a tool that does the job within minutes!
					</p>

					<p className="mt-10 text-light-300 text-md sm:text-3xl tracking-[-0.5px]">Save hours of time getting started 🕔⚡️</p>

					<div className="w-2/3 sm:w-1/3 md:w-1/3 xl:w-1/4 mt-16">
						<Button
							type="button"
							variant={"primary"}
							rounded={true}
							onClick={() => {
								if (session && session.user && status === "authenticated") {
									router.push("/generate");
								} else {
									setAuthModalOpen(true);
								}
							}}
							classes="text-lg px-8 py-3 shadow-2xl"
						>
							Try it out now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
