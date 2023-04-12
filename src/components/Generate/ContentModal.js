import { useContext } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { StatusContext } from "@/store/StatusContextProvider";
import { removeAllWhiteSpaces } from "@/utils/Helpers";

const ContentModal = ({ isOpen, setOpen, heading, content, adminGeneratedResponseView = false }) => {
	const downloadContent = () => {
		// Downloading a text file
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([content], { type: "text/plain" }));
		a.download = `${heading}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	const { setSuccess } = useContext(StatusContext);
	const copyContentToClipboard = async () => {
		await navigator.clipboard.writeText(content);
		setSuccess((prevState) => ({
			...prevState,
			title: "Text copied",
			message: "Text has been copied to clipboard",
			showSuccessBox: true,
		}));
	};

	return (
		<Modal
			isOpen={isOpen}
			classes="max-w-[48rem]"
			title={<div className="flex text-start ml-8">{heading}</div>}
			titleClasses="justify-start text-start"
			content={
				<>
					<div className="text-start whitespace-pre-wrap max-h-[300px] sm:max-h-[400px] overflow-y-scroll pr-4">{content}</div>
					<div className="w-full flex sm:flex-row flex-col items-center justify-center gap-6 mt-10">
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								downloadContent();
							}}
							rounded={true}
							classes="md:w-1/2 w-full text-md px-8 py-2"
						>
							<i className="fa-solid fa-download"></i>&nbsp;Download
						</Button>

						<Button
							type="button"
							variant={"default"}
							onClick={() => {
								copyContentToClipboard();
							}}
							rounded={true}
							classes="md:w-1/2 w-full text-md px-8 py-2"
						>
							<i className="fa-solid fa-copy"></i>&nbsp;Copy
						</Button>

						{!adminGeneratedResponseView && (
							<Button
								type="button"
								variant={"primary"}
								onClick={() => {
									document.getElementById(removeAllWhiteSpaces(heading)).click();
								}}
								rounded={true}
								classes="md:w-1/2 w-full text-md px-8 py-2"
							>
								<i className="fa-solid fa-arrow-rotate-left"></i>&nbsp;
								<span className="sm:hidden md:block block">Generate again</span>
								<span className="md:hidden sm:block hidden">Regenerate</span>
							</Button>
						)}
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
