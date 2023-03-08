import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "@/redux/actions/userActions";
import StatusContext from "@/store/status-context";
import Button from "@/components/ui/Button";
import { sleep } from "@/utils/Sleep";

const NewPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [, , setSuccess, setError] = useContext(StatusContext);
	const router = useRouter();

	const dispatch = useDispatch();
	const { error, loading, success } = useSelector((state) => state.forgotPassword);

	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (success) {
			setSuccess({
				title: "Password reset successfully",
				message: success,
				showSuccessBox: true,
			});
			sleep(2000).then(() => {
				router.push("/?login");
			});
		}
	}, [dispatch, success, error]);

	const submitHandler = () => {
		const passwords = {
			password,
			confirmPassword,
		};
		dispatch(resetPassword(router.query.token, passwords));
	};

	return (
		<div className="w-1/3 p-8 bg-dark-500 rounded-lg mt-10">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitHandler();
				}}
			>
				<div className="flex flex-col mt-2">
					<label htmlFor="password_field" className="text-sm text-light-500">
						Password
					</label>
					<input
						type="password"
						id="password_field"
						className="mt-1 w-full bg-dark-700 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
						value={password}
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<div className="flex flex-col mt-2">
					<label htmlFor="password_field" className="text-sm text-light-500">
						Confirm Password
					</label>
					<input
						type="password"
						id="password_field"
						className="mt-1 w-full bg-dark-700 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
						value={confirmPassword}
						name="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>

				<div className="mt-6">
					<Button variant={"primary"} rounded={true} isLoading={loading} classes="text-md px-8 py-3">
						Reset Password
					</Button>
				</div>
			</form>
		</div>
	);
};

export default NewPassword;
