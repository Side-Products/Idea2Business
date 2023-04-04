import Modal from "@/components/ui/Modal";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { adminDeleteUser, clearErrors } from "@/redux/actions/userActions";
import { ADMIN_DELETE_USER_RESET } from "@/redux/constants/userConstants";
import { StatusContext } from "@/store/StatusContextProvider";
import Loader from "@/components/ui/Loader";
import { sleep } from "@/utils/sleep";

const DeleteUserConfirmModal = ({ isOpen, setOpen, userToDelete }) => {
	const { setSuccess, setError } = useContext(StatusContext);

	const dispatch = useDispatch();
	const router = useRouter();

	const { error, isDeleted, loading } = useSelector((state) => state.user);

	useEffect(() => {
		if (isDeleted) {
			setSuccess({
				title: "User deleted successfully",
				message: "The selected user was deleted",
				showSuccessBox: true,
			});

			dispatch({ type: ADMIN_DELETE_USER_RESET });
			sleep(1000).then(() => {
				router.reload();
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
	}, [dispatch, userToDelete, error, isDeleted]);

	const deleteUserHandler = () => {
		dispatch(adminDeleteUser(userToDelete._id));
		setOpen(false);
	};

	return loading ? (
		<Loader />
	) : (
		<Modal
			isOpen={isOpen}
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-trash"></i>
				</div>
			}
			title={"Delete User"}
			content={
				<div>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							deleteUserHandler();
						}}
					>
						<div className="flex flex-col justify-center">
							<div className="flex justify-center items-center gap-x-4">
								<p className="text-3xl font-semibold text-light-300">{userToDelete.name}</p>
							</div>
							<p className="text-sm text-light-600 mt-2">{userToDelete.email}</p>

							<p className="text-light-500 text-sm mt-4">
								<span className="font-medium">Role:</span>&nbsp;
								{userToDelete.role}
							</p>
						</div>

						<p className="text-sm font-semibold text-center mt-10">Are you sure you want to delete this user?</p>

						<div className="flex justify-end">
							<button
								type="submit"
								className="flex items-center mt-10 -mb-6 px-6 py-2 text-sm font-primary font-bold rounded-md bg-error-600 hover:bg-error-700 text-light-100"
							>
								Delete
								<span className="ml-6 text-lg">
									<i className="fa-solid fa-arrow-right-long"></i>
								</span>
							</button>
						</div>
					</form>
				</div>
			}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default DeleteUserConfirmModal;
