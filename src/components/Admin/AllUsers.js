import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "@/redux/actions/userActions";
import StatusContext from "@/store/status-context";
import Loader from "@/components/ui/Loader";
import NoDataTableRow from "@/components/ui/Table/NoDataTableRow";
import { getTimestamp } from "@/utils/Helpers";
import UpdateUserModal from "./Modals/UpdateUserModal";
import DeleteUserConfirmModal from "./Modals/DeleteUserConfirmModal";

export default function AllUsers() {
	const dispatch = useDispatch();
	const { users, admins, error, loading } = useSelector((state) => state.allUsers);

	const [, , setSuccess, setError] = useContext(StatusContext);

	const [activeTable, setActiveTable] = useState("allUsersTable");
	const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
	const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
	const [userToUpdate, setUserToUpdate] = useState("");
	const [userToDelete, setUserToDelete] = useState("");

	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
	}, [error]);

	const copyToClipboard = async (event) => {
		const reqStr = event.target.parentNode.querySelector("span").dataset.info;
		await navigator.clipboard.writeText(reqStr);
		setSuccess((prevState) => ({
			...prevState,
			title: "Text copied",
			message: "Text has been copied to clipboard",
			showSuccessBox: true,
		}));
	};

	return loading ? (
		<Loader />
	) : users && users.length > 0 ? (
		<div className="grid w-full mt-10">
			<ul className="items-start nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tables" role="tablist">
				<li className="nav-item" role="presentation" onClick={() => setActiveTable("allUsersTable")}>
					<span
						className={
							"cursor-pointer nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 parent hover:bg-dark-600 transition duration-300 rounded-t " +
							(activeTable == "allUsersTable" && "border-primary-400 text-primary-400")
						}
						id="tabs-artist-verification-table-details"
						data-bs-toggle="pill"
						data-bs-target="#tabs-artist-verification-table"
						role="tab"
						aria-controls="tabs-artist-verification-table"
						aria-selected="true"
					>
						All Users
					</span>
				</li>
				<li className="nav-item" role="presentation" onClick={() => setActiveTable("adminsTable")}>
					<span
						className={
							"cursor-pointer nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-dark-600 transition duration-300 rounded-t " +
							(activeTable == "adminsTable" && "border-primary-400 text-primary-400")
						}
						id="tabs-verification-in-progress-table"
						data-bs-toggle="pill"
						data-bs-target="#tabs-verification-in-progress"
						role="tab"
						aria-controls="tabs-verification-in-progress"
						aria-selected="false"
					>
						Admins
					</span>
				</li>
			</ul>

			<div className="tab-content" id="tabs-tabContent3">
				{/* All Users Table */}
				{activeTable == "allUsersTable" && (
					<div
						className="tab-pane fade show active"
						id="tabs-artist-verification-table"
						role="tabpanel"
						aria-labelledby="tabs-artist-verification-table-details"
					>
						{users.length !== 0 ? (
							<table className="w-full table allusers-table table-auto text-gray-400 border-separate space-y-6 text-sm">
								<thead className="bg-dark-800">
									<tr>
										<th className="p-3 text-left pl-6 text-gradient-secondary-tr">Created At (UTC)</th>
										<th className="p-3 text-left text-gradient-secondary-tr">User ID</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Name</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Email</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Role</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Edit User</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Delete User</th>
									</tr>
								</thead>

								<tbody className="text-gray-900">
									{users.map((user, index) => (
										<tr className="bg-dark-600 text-light-200 " key={index}>
											<td className="p-3">
												<span className="flex align-items-center">
													<span className="ml-3">
														<span className="">{getTimestamp(user.createdAt).slice(0, 19)}</span>
													</span>
												</span>
											</td>
											<td className="p-3">
												<span data-info={user._id}>{user._id}</span>{" "}
												<i className="far fa-copy ml-1 cursor-pointer" onClick={copyToClipboard}></i>
											</td>
											<td className="p-3">{user.name}</td>
											<td className="p-3">
												<span data-info={user.email}>{user.email}</span>{" "}
												<i className="far fa-copy ml-1 cursor-pointer" onClick={copyToClipboard}></i>
											</td>
											<td className="p-3">{user.role}</td>
											<td
												className="p-3 bg-primary-600 hover:bg-primary-800 transition duration-300 text-light-100 cursor-pointer text-center"
												onClick={(e) => {
													e.preventDefault();
													setUserToUpdate(user);
													setUpdateUserModalOpen(true);
												}}
											>
												Edit
											</td>
											<td
												className="p-3 bg-error-600 hover:bg-error-700 transition duration-300 text-light-100 cursor-pointer text-center"
												onClick={(e) => {
													e.preventDefault();
													setUserToDelete(user);
													setDeleteUserModalOpen(true);
												}}
											>
												Delete
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<>
								<table className="w-full table allusers-table table-auto text-gray-400 border-separate space-y-6 text-sm">
									<thead className="bg-zinc-900 text-zinc-50">
										<tr>
											<th className="p-3">Created At (UTC)</th>
											<th className="p-3 text-left">User ID</th>
											<th className="p-3 text-left">Name</th>
											<th className="p-3 text-left">Email</th>
											<th className="p-3 text-left">Role</th>
											<th className="p-3 text-left">Edit User</th>
											<th className="p-3 text-left">Delete User</th>
										</tr>
									</thead>
								</table>

								<NoDataTableRow />
							</>
						)}
					</div>
				)}

				{/* Admins Table */}
				{activeTable == "adminsTable" && (
					<div className="tab-pane fade" id="tabs-verification-in-progress" role="tabpanel" aria-labelledby="tabs-verification-in-progress-table">
						{admins.length !== 0 ? (
							<table className="w-full table allusers-table table-auto text-gray-400 border-separate space-y-6 text-sm">
								<thead className="bg-dark-800">
									<tr>
										<th className="p-3 text-left pl-6 text-gradient-secondary-tr">Created At (UTC)</th>
										<th className="p-3 text-left text-gradient-secondary-tr">User ID</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Name</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Email</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Role</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Edit User</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Delete User</th>
									</tr>
								</thead>

								<tbody className="text-gray-900">
									{admins.map((admin, index) => (
										<tr className="bg-dark-600 text-light-200 " key={index}>
											<td className="p-3">
												<span className="flex align-items-center">
													<span className="ml-3">
														<span className="">{getTimestamp(admin.createdAt).slice(0, 19)}</span>
													</span>
												</span>
											</td>
											<td className="p-3">
												<span data-info={admin._id}>{admin._id}</span>{" "}
												<i className="far fa-copy ml-1 cursor-pointer" onClick={copyToClipboard}></i>
											</td>
											<td className="p-3">{admin.name}</td>
											<td className="p-3">
												<span data-info={admin.email}>{admin.email}</span>{" "}
												<i className="far fa-copy ml-1 cursor-pointer" onClick={copyToClipboard}></i>
											</td>
											<td className="p-3">{admin.role}</td>
											<td
												className="p-3 bg-primary-600 hover:bg-primary-800 transition duration-300 text-light-100 cursor-pointer text-center"
												onClick={(e) => {
													e.preventDefault();
													setUserToUpdate(admin);
													setUpdateUserModalOpen(true);
												}}
											>
												Edit
											</td>
											<td
												className="p-3 bg-error-600 hover:bg-error-700 transition duration-300 text-light-100 cursor-pointer text-center"
												onClick={(e) => {
													e.preventDefault();
													setUserToDelete(admin);
													setDeleteUserModalOpen(true);
												}}
											>
												Delete
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<>
								<table className="w-full table allusers-table table-auto text-gray-400 border-separate space-y-6 text-sm">
									<thead className="bg-zinc-900 text-zinc-50">
										<tr>
											<th className="p-3">Created At (UTC)</th>
											<th className="p-3 text-left">User ID</th>
											<th className="p-3 text-left">Name</th>
											<th className="p-3 text-left">Email</th>
											<th className="p-3 text-left">Role</th>
											<th className="p-3 text-left">Edit User</th>
											<th className="p-3 text-left">Delete User</th>
										</tr>
									</thead>
								</table>

								<NoDataTableRow />
							</>
						)}
					</div>
				)}
			</div>

			<UpdateUserModal isOpen={isUpdateUserModalOpen} setOpen={setUpdateUserModalOpen} userToUpdate={userToUpdate} />
			<DeleteUserConfirmModal isOpen={isDeleteUserModalOpen} setOpen={setDeleteUserModalOpen} userToDelete={userToDelete} />
		</div>
	) : (
		<div className="mt-20 text-light-500">No users yet</div>
	);
}
