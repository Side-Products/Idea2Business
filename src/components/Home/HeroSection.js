import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthModalContext from "@/store/authModal-context";
import CustomButton from "@/layout/CustomButton";

export const HeroSection = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [, setAuthModalOpen] = useContext(AuthModalContext);

	return (
		<div className="flex flex-col justify-center items-center bg-[url('/hero-3.jpg')] bg-cover bg-no-repeat h-screen">
			<h1 className="px-2 sm:px-8 md:px-16 text-[40px] sm:text-[50px] md:text-[100px] text-center font-extrabold tracking-[-2.5px]">
				Transform Your Projects
			</h1>
			<h1 className="px-2 sm:px-8 md:px-16 text-[40px] sm:text-[50px] md:text-[95px] text-center font-extrabold tracking-[-2.5px]">
				Into Profitable Products
			</h1>
			<p className="mt-8 text-center">Just provide your project details, Project2Product will help you turn it into a successful venture</p>
			<div className="w-2/3 sm:w-1/4 md:w-1/5 xl:w-1/6 mt-32">
				<CustomButton
					type="button"
					onClick={() => {
						if (session && session.user && status === "authenticated") {
							router.push("/generate");
						} else {
							setAuthModalOpen(true);
						}
					}}
					primary={true}
					rounded={true}
					classes="text-lg px-8 py-3"
				>
					{session && session.user && status === "authenticated" ? "Generate Now" : "Get Started"}
				</CustomButton>
			</div>
		</div>
	);
};
