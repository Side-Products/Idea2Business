import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Popup({
	heading = "Please complete the KYC",
	text = "Please follow the instructions in the email to complete account verification. Make sure to check your promotions/spam as well.",
}) {
	const [showPopup, setShowPopup] = useState(true);

	return (
		showPopup && (
			<motion.div
				className="bg-primary-500 rounded-lg py-5 sm:px-6 px-3"
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.1 }}
				exit={{ opacity: 0 }}
			>
				<div className="flex flex-row justify-between items-center text-light-100">
					<div className="flex flex-row items-center sm:gap-x-5 gap-x-4">
						<Image src="/ui/attention.png" alt="attention" width="27" height="27" />
						<div>
							<p className="sm:text-base text-sm">{heading}</p>
							<p className="sm:text-xs text-[10px] mt-2">{text}</p>
						</div>
					</div>
					<motion.span
						whileHover={{
							scale: 1.2,
							transition: { duration: 0.2 },
						}}
						onClick={() => setShowPopup(false)}
						className="cursor-pointer self-start sm:self-center"
					>
						<Image src="/ui/close.png" alt="close" width="20" height="20" className="sm:block hidden" />
						<Image src="/ui/close.png" alt="close" width="40" height="40" className="sm:hidden block" />
					</motion.span>
				</div>
			</motion.div>
		)
	);
}
