import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const ContentModal = ({ isOpen, setOpen, heading, content }) => {
	const downloadContent = () => {
		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([content], { type: "text/plain" }));
		a.download = `${heading}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<Modal
			isOpen={isOpen}
			classes="max-w-[48rem]"
			title={<div className="flex text-start ml-8">{heading}</div>}
			titleClasses="justify-start text-start"
			content={
				<>
					<div className="text-start whitespace-pre-wrap max-h-[400px] overflow-y-scroll pr-4">{content}</div>
					<div className="w-full flex items-center justify-center">
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								downloadContent();
							}}
							rounded={true}
							classes="w-1/2 text-md px-8 py-2 mt-10"
						>
							<i className="fa-solid fa-download"></i>&nbsp;Download
						</Button>
					</div>
				</>
			}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default ContentModal;
