import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { updateUserProfile, clearErrors } from "@/redux/actions/userActions";
import { UPDATE_PROFILE_RESET } from "@/redux/constants/userConstants";
import { StatusContext } from "@/store/StatusContextProvider";
import { LoadingContext } from "@/store/LoadingContextProvider";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import MySubscription from "./MySubscription";

export default function UserDetails({ ideasCount }) {
	const { data: session } = useSession();
	const { setError } = useContext(StatusContext);
	const { setLoading } = useContext(LoadingContext);
	const avatarUrl = session && session.user && session.user.image;

	const dispatch = useDispatch();
	const router = useRouter();

	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const { name, email, password } = user;

	const { user: loadedUser } = useSelector((state) => state.loadedUser);
	const { error, isUpdated } = useSelector((state) => state.user);

	const [isUpdateUserProfileModalOpen, setUpdateUserProfileModalOpen] = useState(false);

	useEffect(() => {
		if (loadedUser || session) {
			setUser({
				name: (loadedUser && loadedUser.name) || (session && session.user && session.user.name),
				email: (loadedUser && loadedUser.email) || (session && session.user && session.user.email),
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
			router.reload();
			setLoading({ status: false });
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
		if (router.query && "paymentsuccess" in router.query) {
			router.replace("/profile", undefined, { shallow: true });
		}
	}, [dispatch, isUpdated, error, loadedUser, session]);

	const submitHandler = () => {
		const userData = {
			name,
			email,
			password,
		};
		setLoading({ status: true });
		dispatch(updateUserProfile(userData));
		setUpdateUserProfileModalOpen(false);
	};

	return (
		<>
			<div className="w-full grid lg:grid-flow-col lg:auto-cols-auto grid-cols-1 gap-4 mb-20">
				<div
					onClick={() => setUpdateUserProfileModalOpen(true)}
					className="group w-full flex justify-between items-start bg-dark-800 px-8 pt-6 pb-8 rounded-2xl cursor-pointer"
				>
					<div className="flex sm:flex-row flex-col gap-x-8">
						<div className="mt-2">
							{avatarUrl ? (
								<Image src={avatarUrl} alt="avatar" width="64" height="64" className="rounded-full" />
							) : (
								<Image src={"/default_avatar.jpg"} alt="avatar" width="64" height="64" className="rounded-full object-cover" />
							)}
						</div>
						<div className="flex flex-col items-start justify-start text-start sm:mt-0 mt-4">
							<div className="text-[40px] font-semibold text-light-300">{session && session.user && session.user.name}</div>
							<div className="-mt-1 text-sm text-dark-100">{session && session.user && session.user.email}</div>
						</div>
					</div>
					<i className="fa-regular fa-pen-to-square text-xl text-light-400 transition duration-300 text-gradient-primary-tr-group"></i>
				</div>

				<div className="w-full grid sm:grid-cols-2 gap-x-8 bg-dark-800 px-8 pt-6 pb-8 rounded-2xl">
					<div className="flex flex-col items-end">
						<p className="text-3xl font-semibold text-light-300">Total searches</p>
						<p className="mt-[2px] text-3xl font-bold text-gradient-primary-tr">{ideasCount}</p>
						<p className="mt-[6px] font-semibold text-gradient-primary-tr">
							{session && session.user && session.user.credits} {session && session.user && session.user.credits == 1 ? "credit" : "credits"}{" "}
							remaining
						</p>
					</div>
					<div className="flex flex-col items-end sm:mt-0 mt-8">
						<MySubscription />
					</div>
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
