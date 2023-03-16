import Modal from "@/layout/Modal/Modal";

const DeleteSubscriptionConfirmModal = ({ isOpen, setOpen, subscriptionToDelete, deleteSubscriptionHandler }) => {
	return (
		<Modal
			isOpen={isOpen}
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-trash"></i>
				</div>
			}
			title={"Delete Subscription"}
			content={
				<div>
					{subscriptionToDelete && (
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								await deleteSubscriptionHandler(subscriptionToDelete._id);
							}}
						>
							<div className="flex flex-col justify-center">
								<div className="flex justify-center items-center gap-x-4">
									<p className="text-3xl font-semibold text-light-300">{subscriptionToDelete.user.name}</p>
									<span className="text-3xl font-bold text-gradient-primary-tr">
										{subscriptionToDelete.amountPaid == 5 ? "$5" : subscriptionToDelete.amountPaid == 10 ? "$10" : ""}
									</span>
								</div>
								<p className="text-sm text-light-600">{subscriptionToDelete.user.email}</p>

								<p className="text-light-500 text-sm mt-4">
									<span className="font-medium">Started On:</span>&nbsp;
									{new Date(subscriptionToDelete.paidOn).toDateString()}
								</p>
								<p className="text-light-500 text-sm mt-1">
									<span className="font-medium">Valid Until:</span>&nbsp;
									{new Date(subscriptionToDelete.subscriptionValidUntil).toDateString()}
								</p>

								<p className="text-light-500 text-sm mt-1">
									<span className="font-medium">Stripe Payment ID:</span>&nbsp;
									{subscriptionToDelete.paymentInfo.id}
								</p>
							</div>

							<p className="text-sm font-semibold text-center mt-10">
								Are you sure you want to delete {subscriptionToDelete.user.name}'s Subscription?
							</p>

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
					)}
				</div>
			}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default DeleteSubscriptionConfirmModal;
