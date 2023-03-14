import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import AuthModalContext from "@/store/authModal-context";
import StatusContext from "@/store/status-context";
import Button from "@/components/ui/Button";
import { sleep } from "@/utils/Sleep";
import { newProjectSearch, clearErrors } from "@/redux/actions/projectActions";

const EnterProjectInfo = ({ projectInfo, onFieldChange, isGenerating, promptEnterProjectInfo, setCardsAvailable, setIsGenerating }) => {
	const { projectName, projectDescription } = projectInfo;

	const { data: session, status } = useSession();
	const [, setAuthModalOpen] = useContext(AuthModalContext);
	const [, , , setError] = useContext(StatusContext);

	const dispatch = useDispatch();
	const submitHandler = () => {
		if (status === "authenticated" && session && session.user) {
			if (projectName.length > 0 && projectDescription.length > 0) {
				if (isGenerating !== "generating") {
					setCardsAvailable(false);
					setIsGenerating("generating");

					const projectInfo = {
						name: projectName,
						description: projectDescription,
					};
					// Add to db
					dispatch(newProjectSearch(projectInfo));

					sleep(1000).then(() => {
						setIsGenerating(false);
						setCardsAvailable(true);
					});
				}
			} else {
				promptEnterProjectInfo();
			}
		} else {
			setAuthModalOpen(true);
		}
	};

	const { error, loading } = useSelector((state) => state.newProjectSearch);
	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="flex flex-col">
				<h1 className="text-center text-[44px] sm:text-[100px] tracking-[-2.5px] font-bold text-gradient-primary-tr leading-[1.2em]">
					Project~Product
				</h1>
				<h3 className="mt-4 px-4 text-center text-sm sm:text-lg leading-[1.4em] text-light-500">
					Transform your side-projects and hackathon-projects into profitable products. <br />
					Just enter your project name and project description, Project2Product will help you turn it into a successful venture.
				</h3>
			</div>

			<form className="w-full p-4 sm:p-0 sm:w-6/12 h-min flex flex-col items-center justify-center mt-4 sm:mt-14">
				<input
					className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-12 p-4 normal-case"
					placeholder="Project Name"
					name="projectName"
					value={projectName}
					onChange={onFieldChange}
					required
				/>
				<br />
				<textarea
					className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-60 p-4 normal-case resize-none"
					placeholder="Project Description"
					name="projectDescription"
					value={projectDescription}
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
						classes="text-lg px-8 py-3"
					>
						Generate
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EnterProjectInfo;
