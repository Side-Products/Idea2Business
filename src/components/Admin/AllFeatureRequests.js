import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "@/redux/actions/userActions";
import { StatusContext } from "@/store/StatusContextProvider";
import Loader from "@/components/ui/Loader";
import NoDataTableRow from "@/components/ui/Table/NoDataTableRow";
import { getTimestamp } from "@/utils/helpers";
import DeleteFeatureRequestModal from "./Modals/DeleteFeatureRequestModal";

export default function AllFeatureRequests() {
	const dispatch = useDispatch();
	const { featureRequests, error, loading } = useSelector((state) => state.adminGetFeatureRequests);

	const { setSuccess, setError } = useContext(StatusContext);

	const [activeTable, setActiveTable] = useState("allFeatureRequestsTable");
	const [isDeleteFeatureRequestModalOpen, setDeleteFeatureRequestModalOpen] = useState(false);
	const [featureRequestToDelete, setFeatureRequestToDelete] = useState("");

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
	) : featureRequests && featureRequests.length > 0 ? (
		<div className="grid w-full mt-10 overflow-scroll">
			<ul className="items-start nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tables" role="tablist">
				<li className="nav-item" role="presentation" onClick={() => setActiveTable("allFeatureRequestsTable")}>
					<span
						className={
							"cursor-pointer nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 parent hover:bg-dark-600 transition duration-300 rounded-t " +
							(activeTable == "allFeatureRequestsTable" && "border-primary-400 text-primary-400")
						}
						id="tabs-all-users-table"
						data-bs-toggle="pill"
						data-bs-target="#tabs-all-users"
						role="tab"
						aria-controls="tabs-all-users"
						aria-selected="true"
					>
						All Feature Requests
					</span>
				</li>
			</ul>

			<div className="tab-content" id="tabs-tabContent3">
				{/* All Users Table */}
				{activeTable == "allFeatureRequestsTable" && (
					<div className="tab-pane fade show active" id="tabs-all-users" role="tabpanel" aria-labelledby="tabs-all-users-details">
						{featureRequests.length !== 0 ? (
							<table className="w-full table allFeatureRequests-table table-auto text-gray-400 border-separate space-y-6 text-sm">
								<thead className="bg-dark-800">
									<tr>
										<th className="p-3 text-left pl-6 text-gradient-secondary-tr">Created At (UTC)</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Name</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Email</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Feature Name</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Feature Description</th>
										<th className="p-3 text-left text-gradient-secondary-tr">Delete Request</th>
									</tr>
								</thead>

								<tbody className="text-gray-900">
									{featureRequests.map((request, index) => (
										<tr className="bg-dark-600 text-light-200 " key={index}>
											<td className="p-3">
												<span className="flex align-items-center">
													<span className="ml-3">
														<span className="">{getTimestamp(request.createdAt).slice(0, 19)}</span>
													</span>
												</span>
											</td>
											<td className="p-3">{request.name ? request.name : "-"}</td>
											<td className="p-3">
												{request.email ? (
													<>
														<span data-info={request.email}>{request.email}</span>{" "}
														<i className="far fa-copy ml-1 cursor-pointer" onClick={copyToClipboard}></i>
													</>
												) : (
													"-"
												)}
											</td>
											<td className="p-3">{request.featureName}</td>
											<td className="p-3">{request.featureDescription}</td>
											<td
												className="p-3 bg-error-600 hover:bg-error-700 transition duration-300 text-light-100 cursor-pointer text-center"
												onClick={(e) => {
													e.preventDefault();
													setFeatureRequestToDelete(request);
													setDeleteFeatureRequestModalOpen(true);
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
								<table className="w-full table allFeatureRequests-table table-auto text-gray-400 border-separate space-y-6 text-sm">
									<thead className="bg-zinc-900 text-zinc-50">
										<tr>
											<th className="p-3 text-left pl-6 text-gradient-secondary-tr">Created At (UTC)</th>
											<th className="p-3 text-left text-gradient-secondary-tr">Name</th>
											<th className="p-3 text-left text-gradient-secondary-tr">Email</th>
											<th className="p-3 text-left text-gradient-secondary-tr">Feature Name</th>
											<th className="p-3 text-left text-gradient-secondary-tr">Feature Description</th>
											<th className="p-3 text-left text-gradient-secondary-tr">Delete Request</th>
										</tr>
									</thead>
								</table>

								<NoDataTableRow />
							</>
						)}
					</div>
				)}
			</div>

			<DeleteFeatureRequestModal
				isOpen={isDeleteFeatureRequestModalOpen}
				setOpen={setDeleteFeatureRequestModalOpen}
				featureRequestToDelete={featureRequestToDelete}
			/>
		</div>
	) : (
		<div className="mt-20 text-light-500">No feature request yet</div>
	);
}
