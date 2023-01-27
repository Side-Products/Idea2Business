import Modal from "@/layout/Modal/Modal";

const ContentModal = ({ isOpen, setOpen, heading, content }) => {
	return (
		<Modal
			isOpen={isOpen}
			classes="max-w-[48rem]"
			title={<div className="flex ml-8">{heading}</div>}
			titleClasses="justify-start text-start"
			content={<div className="text-start whitespace-pre-wrap max-h-[450px] overflow-y-scroll">{content}</div>}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default ContentModal;
