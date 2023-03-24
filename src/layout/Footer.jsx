import Image from "next/image";
import logo from "../../public/site_logo.png";

const Footer = () => {
	return (
		<div className="flex justify-center w-full">
			<div className="footer bg-dark-900">
				<div className="w-full flex justify-between items-center">
					<Image src={logo} alt="P~P logo" width="60" className="rounded-md" />
					<p className="font-primary sm:text-lg text-base font-medium text-gradient-primary-tr">Project~Product</p>
				</div>

				<div className="grid grid-cols-2 gap-y-10 md:gap-y-0 md:flex flex-wrap font-primary justify-between border-t-2 border-dark-600 w-full py-8 mt-5"></div>
			</div>
		</div>
	);
};

export default Footer;
