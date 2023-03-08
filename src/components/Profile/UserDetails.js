import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { updateUserProfile, clearErrors } from "@/redux/actions/userActions";
import { UPDATE_PROFILE_RESET } from "@/redux/constants/userConstants";
import StatusContext from "@/store/status-context";
import Loader from "@/components/ui/Loader";
import UpdateUserProfileModal from "./UpdateUserProfileModal";

export default function UserDetails() {
	const { data: session } = useSession();
	const [, , , setError] = useContext(StatusContext);
	const avatarUrl = session && session.user && session.user.image;
	const { projectsCount } = useSelector((state) => state.allProjects);

	const dispatch = useDispatch();
	const router = useRouter();

	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const { name, email, password } = user;

	const { user: loadedUser, loading } = useSelector((state) => state.auth);
	const { error, isUpdated, loading: updateLoading } = useSelector((state) => state.user);

	const [isUpdateUserProfileModalOpen, setUpdateUserProfileModalOpen] = useState(false);

	useEffect(() => {
		if (loadedUser) {
			setUser({
				name: loadedUser.name,
				email: loadedUser.email,
			});
		}
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (isUpdated) {
			router.push("/profile");
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [dispatch, isUpdated, error, loadedUser]);

	const submitHandler = () => {
		const userData = {
			name,
			email,
			password,
		};
		dispatch(updateUserProfile(userData));
		setUpdateUserProfileModalOpen(false);
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<div className="w-full grid grid-flow-col auto-cols-auto gap-4 mb-20">
				<div
					onClick={() => setUpdateUserProfileModalOpen(true)}
					className="group w-full flex justify-between items-start bg-dark-800 px-8 pt-6 pb-8 rounded-lg cursor-pointer"
				>
					<div className="flex gap-x-8">
						<div className="mt-2">
							{avatarUrl ? (
								<Image src={avatarUrl} alt="avatar" width="64" height="64" className="rounded-full" />
							) : (
								<Image src={"/avatar.jpg"} alt="avatar" width="64" height="64" className="rounded-full" objectFit="cover" />
							)}
						</div>
						<div className="flex flex-col items-start justify-start text-start">
							<div className="text-[40px] font-semibold text-light-300">{session && session.user && session.user.name}</div>
							<div className="-mt-1 text-sm text-dark-100">{session && session.user && session.user.email}</div>
						</div>
					</div>
					<i className="fa-regular fa-pen-to-square text-xl text-light-400 transition duration-300 text-gradient-primary-tr-group"></i>
				</div>

				<div className="w-full flex flex-col items-end bg-dark-800 px-8 pt-6 pb-8 rounded-lg">
					<p className="text-3xl font-semibold text-light-300">Total searches</p>
					<div className="mt-1 text-4xl font-bold text-gradient-primary-tr">{projectsCount}</div>
				</div>
			</div>

			<UpdateUserProfileModal
				isOpen={isUpdateUserProfileModalOpen}
				setOpen={setUpdateUserProfileModalOpen}
				submitHandler={submitHandler}
				avatarUrl={avatarUrl}
				user={user}
				setUser={setUser}
			/>
		</>
	);
}
