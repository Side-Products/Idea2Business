import { Fragment, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { StatusContext } from "@/store/StatusContextProvider";

const SuccessBox = ({ style }) => {
	const { success, setSuccess } = useContext(StatusContext);

	const handleClose = () => {
		setSuccess((prevState) => ({
			...prevState,
			showSuccessBox: false,
		}));
	};

	useEffect(() => {
		if (success.showSuccessBox) {
			setTimeout(function () {
				setSuccess((prevState) => ({
					...prevState,
					showSuccessBox: false,
				}));
			}, 5000);
		}
	}, [success.showSuccessBox, setSuccess]);

	return (
		<Transition show={success.showSuccessBox}>
			<Transition.Child
				as={Fragment}
				enter="transition-all ease-in-out duration-400"
				enterFrom="opacity-0 scale-75 translate-x-full"
				enterTo="opacity-100 scale-100"
				leave="transition-all ease-out duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-75 translate-x-full"
			>
				<div
					className={
						"fixed bottom-0 right-0 z-[60] lg:w-5/12 md:w-8/12 sm:w-3/4 w-11/12 px-5 py-4 rounded-lg shadow-2xl -translate-x-4 -translate-y-4 break-words " +
						(style == 1
							? "xl:w-4/12 bg-success-500 border-2 border-success-500 backdrop-brightness-200 bg-opacity-50 backdrop-blur-[24px]"
							: style == 2
							? "xl:w-3/12 bg-dark-900 border-success-500 border-[0.5px]"
							: "")
					}
					role="alert"
				>
					<p className={"font-semibold mb-4 " + (style == 1 ? "text-base" : style == 2 ? "text-base text-success-500" : "")}>{success.title}</p>
					<span className={"block sm:inline " + (style == 1 ? "text-base" : style == 2 ? "text-sm" : "")}>{success.message}</span>
					<div
						onClick={handleClose}
						className={
							"absolute flex justify-center items-center rounded-md transition-all duration-200 cursor-pointer text-success-500 hover:bg-success-500 " +
							(style == 1 ? "w-8 h-8 top-1 right-1" : style == 2 ? "w-6 h-6 top-2 right-2" : "")
						}
					>
						<i className={"fa-solid fa-xmark text-light-400 " + (style == 1 ? "text-base" : style == 2 ? "text-sm" : "")}></i>
					</div>
				</div>
			</Transition.Child>
		</Transition>
	);
};

export default SuccessBox;
