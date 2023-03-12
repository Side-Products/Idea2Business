import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthModalContext from "@/store/authModal-context";
import Button from "@/components/ui/Button";

export default function WhyWeBuiltThis() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [, setAuthModalOpen] = useContext(AuthModalContext);

	return (
		<div className="w-full flex flex-col items-center bg-light-200 dark:bg-dark-1000">
			<div className="w-full max-w-[1920px] py-40 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<div className="flex flex-col items-center justify-center text-center bg-gradient-primary-r py-16 px-32 rounded-3xl">
					<span className="text-6xl font-bold tracking-[-2.5px]">Why we built this?</span>
					<p className="mt-10 text-light-300 text-3xl tracking-[-0.5px]">
						We spent weeks to research and draft all these for our previous product, so we built a tool that does the job within minutes!
					</p>

					<div className="w-2/3 sm:w-1/4 md:w-1/5 xl:w-1/6 mt-16">
						<Button
							type="button"
							variant={"secondary"}
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
