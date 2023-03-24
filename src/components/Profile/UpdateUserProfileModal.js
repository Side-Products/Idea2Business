import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";

const UpdateUserProfileModal = ({ isOpen, setOpen, submitHandler, avatarUrl, user, setUser }) => {
	const { data: session } = useSession();

	const { name, email, password } = user;
	const onFieldChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				title={<h1 className="text-4xl font-bold text-center tracking-[-1px] text-gradient-secondary-tr">Profile Details</h1>}
				content={
					<div className="-mt-4">
						<div className="w-full flex items-center justify-center">
							{avatarUrl ? (
								<Image src={avatarUrl} alt="avatar" width="100" height="100" className="rounded-full" />
							) : (
								<Image src={"/avatar.jpg"} alt="avatar" width="100" height="100" className="rounded-full object-cover" />
							)}
						</div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								submitHandler();
							}}
							className="mt-4"
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
									onChange={onFieldChange}
									required
								/>
							</div>

							{session && session.user && !session.user.image.includes("google") && (
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
										onChange={onFieldChange}
										required
									/>
								</div>
							)}

							{session && session.user && !session.user.image.includes("google") && (
								<div className="flex flex-col mt-2">
									<label htmlFor="password_field" className="text-sm text-start font-semibold text-light-500">
										Password
									</label>
									<input
										type="password"
										id="password_field"
										className="mt-1 w-full bg-dark-900 focus:border-light-500 transition duration-300 outline-0 rounded-md px-3 py-[10px] normal-case"
										value={password}
										name="password"
										onChange={onFieldChange}
										required
									/>
								</div>
							)}

							<div className="mt-10">
								<Button variant={"secondary"} rounded={true} classes="text-md px-8 py-3">
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
		</>
	);
};

export default UpdateUserProfileModal;
