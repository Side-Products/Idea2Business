import Modal from "@/layout/Modal/Modal";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { adminUpdateUserDetails, clearErrors } from "@/redux/actions/userActions";
import { ADMIN_UPDATE_USER_DETAILS_RESET } from "@/redux/constants/userConstants";
import StatusContext from "@/store/status-context";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import { sleep } from "@/utils/Sleep";

const UpdateUserModal = ({ isOpen, setOpen, userToUpdate }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const [, , setSuccess, setError] = useContext(StatusContext);

	const dispatch = useDispatch();
	const router = useRouter();

	const { error, isUpdated, loading } = useSelector((state) => state.user);

	useEffect(() => {
		if (isUpdated) {
			setSuccess({
				title: "User updated successfully",
				message: "User details were updated",
				showSuccessBox: true,
			});

			dispatch({ type: ADMIN_UPDATE_USER_DETAILS_RESET });
			sleep(1000).then(() => {
				router.reload();
			});
		}

		if (userToUpdate) {
			setName(userToUpdate.name);
			setEmail(userToUpdate.email);
			setRole(userToUpdate.role);
		}

		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [dispatch, userToUpdate, error, isUpdated]);

	const submitHandler = () => {
		const userData = {
			name,
			email,
			role,
		};
		dispatch(adminUpdateUserDetails(userToUpdate._id, userData));
		setOpen(false);
	};

	return loading ? (
		<Loader />
	) : (
		<Modal
			isOpen={isOpen}
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-pen-to-square"></i>
				</div>
			}
			title={"Update User Details"}
			content={
				<div>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							submitHandler();
						}}
					>
						<div className="flex flex-col">
							<label htmlFor="email_field" className="text-sm text-start font-semibold text-light-500">
								Name
							</label>
							<input
								type="text"
								id="name_field"
								className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
								value={name}
								name="name"
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						<div className="flex flex-col mt-2">
							<label htmlFor="email_field" className="text-sm text-start font-semibold text-light-500">
								Email
							</label>
							<input
								type="email"
								id="email_field"
								className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
								value={email}
								name="email"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="flex flex-col mt-2">
							<label htmlFor="role_field" className="text-sm text-start font-semibold text-light-500">
								Role
							</label>
							<select
								id="role_field"
								name="role"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
							>
								<option value="user">user</option>
								<option value="admin">admin</option>
							</select>
						</div>

						<div className="mt-10">
							<Button variant={"primary"} rounded={true} classes="text-md px-8 py-3">
								Update
							</Button>
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

export default UpdateUserModal;
