import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import { StatusContext } from "@/store/StatusContextProvider";
import Button from "@/components/ui/Button";
import { sleep } from "@/utils/Sleep";
import { newIdeaSearch, clearErrors } from "@/redux/actions/ideaActions";

const EnterIdeaInfo = ({ ideaInfo, onFieldChange, isGenerating, promptEnterIdeaInfo, setCardsAvailable, setIsGenerating }) => {
	const { ideaName, ideaDescription } = ideaInfo;

	const { data: session, status } = useSession();
	const { setAuthModalOpen } = useContext(AuthModalContext);
	const { setError } = useContext(StatusContext);

	const dispatch = useDispatch();
	const submitHandler = () => {
		if (status === "authenticated" && session && session.user) {
			if (ideaName.length > 0 && ideaDescription.length > 0) {
				if (isGenerating !== "generating") {
					setCardsAvailable(false);
					setIsGenerating("generating");

					const ideaInfo = {
						name: ideaName,
						description: ideaDescription,
					};
					// Add to db
					dispatch(newIdeaSearch(ideaInfo));
				}
			} else {
				promptEnterIdeaInfo();
			}
		} else {
			setAuthModalOpen(true);
		}
	};

	const { error, success, loading } = useSelector((state) => state.newIdeaSearch);
	useEffect(() => {
		if (success) {
			sleep(1000).then(() => {
				setIsGenerating(false);
				setCardsAvailable(true);
			});
		}
		if (error) {
			setIsGenerating(false);
			setCardsAvailable(false);
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [dispatch, error, success]);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="flex flex-col">
				<h1 className="mt-8 text-center text-[44px] sm:text-[80px] md:text-[110px] xl:text-[120px] tracking-[-2.5px] font-bold text-gradient-primary-tr leading-[1.2em]">
					Idea~Business
				</h1>
				<h3 className="mt-4 px-4 text-center text-sm sm:text-lg leading-[1.4em] text-light-500">
					Transform your idea into a profitable business. <br />
					Just enter your idea, and Idea2Business will help you turn it into a successful venture.
				</h3>
			</div>

			<form className="w-full p-4 sm:p-0 sm:w-6/12 h-min flex flex-col items-center justify-center mt-4 sm:mt-14">
				<input
					className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-12 p-4 normal-case"
					placeholder="Idea Name"
					name="ideaName"
					value={ideaName}
					onChange={onFieldChange}
					required
				/>
				<br />
				<textarea
					className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-60 p-4 normal-case resize-none"
					placeholder="Idea Description"
					name="ideaDescription"
					value={ideaDescription}
					onChange={onFieldChange}
					required
				/>
				<br />
				<div className="w-2/3 sm:w-1/3 flex items-center justify-center">
					<Button
						type="button"
						variant={"secondary"}
						onClick={() => {
							submitHandler();
						}}
						isLoading={isGenerating === "generating" || loading}
						rounded={true}
						classes="text-[17px] px-8 py-3"
					>
						Generate
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EnterIdeaInfo;
