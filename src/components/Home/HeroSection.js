import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import Button from "@/components/ui/Button";
import ParallaxText from "@/components/ui/ParallaxText";

export default function HeroSection() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);

	return (
		<div className="flex flex-col justify-center items-center bg-dark-1000 min-h-screen pt-44 pb-32">
			<h1 className="px-2 sm:px-8 md:px-16 text-[48px] sm:text-[50px] md:text-[80px] lg:text-[100px] sm:leading-[100px] text-center font-extrabold tracking-[-2.5px] text-gradient-primary-tr">
				Transform Your Idea
			</h1>
			<h1 className="px-2 sm:px-8 md:px-16 text-[48px] sm:text-[50px] md:text-[70px] lg:text-[90px] sm:leading-[100px] text-center font-extrabold tracking-[-2.5px] text-gradient-primary-bl">
				Into a Profitable Business
			</h1>

			<p className="px-8 mt-16 sm:mt-24 text-center text-sm font-medium text-dark-100">
				Just enter your idea, and we will help you turn it into a successful venture
			</p>

			<div className="w-2/3 sm:w-1/4 md:w-1/5 xl:w-1/6 mt-8">
				<Button
					type="button"
					variant={"secondary"}
					onClick={() => {
						if (session && session.user && status === "authenticated") {
							router.push("/generate");
						} else {
							setAuthModalOpen(true);
						}
					}}
					rounded={true}
					classes="text-lg px-8 py-3"
				>
					{session && session.user && status === "authenticated" ? "Try Now" : "Get Started"}
				</Button>
			</div>

			<div className="w-full flex flex-col justify-center items-center mt-24">
				<div className="text-center font-secondary font-bold text-dark-200 mb-2">Trusted By</div>
				<ParallaxText />
			</div>
		</div>
	);
}
