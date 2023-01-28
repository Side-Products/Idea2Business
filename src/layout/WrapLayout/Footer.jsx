import Image from "next/image";
import logo from "../../../public/site_logo.png";

const Footer = () => {
	return (
		<div className="flex justify-center w-full dark:bg-dark-900">
			<div className="footer dark:bg-dark-900">
				<div className="w-full flex justify-between items-center">
					<Image src={logo} alt="P~P logo" width="60" className="rounded-md" />
					<p className="font-primary sm:text-lg text-base text-primary-500">Project~Product</p>
				</div>

				<div className="grid grid-cols-2 gap-y-10 md:gap-y-0 md:flex flex-wrap font-primary justify-between border-t-2 border-light-300 dark:border-light-900 w-full py-8 mt-5"></div>
			</div>
		</div>
	);
};

export default Footer;
