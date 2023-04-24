import PageWrapper from "@/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function LandingPageGenerator() {
	const [productInfo, setProductInfo] = useState({ productName: "", productDescription: "", productFeatures: "", inspiration: "" });
	const onFieldChange = (e) => {
		setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
	};

	const { productName, productDescription, productFeatures, inspiration } = productInfo;

	const submitHandler = () => {
		console.log(productInfo);
	};

	return (
		<PageWrapper>
			<h1 className="text-[80px] leading-[100px] font-bold text-center tracking-[-2.5px] text-gradient-primary-tr">Landing Page Generator</h1>

			<div className="w-full flex flex-col items-center justify-center">
				<form className="w-full p-4 sm:p-0 sm:w-6/12 h-min flex flex-col items-center justify-center mt-4 sm:mt-14">
					<input
						className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-12 p-4 normal-case"
						placeholder="Product Name"
						name="productName"
						value={productName}
						onChange={onFieldChange}
						required
					/>
					<br />
					<textarea
						className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-40 p-4 normal-case resize-none"
						placeholder={`Product Description`}
						name="productDescription"
						value={productDescription}
						onChange={onFieldChange}
						required
					/>
					<br />
					<textarea
						className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-40 p-4 normal-case resize-none"
						placeholder={`Features`}
						name="productFeatures"
						value={productFeatures}
						onChange={onFieldChange}
						required
					/>
					<br />
					<input
						className="w-full bg-dark-600/40 border border-light-900 focus:border-light-700 transform duration-300 outline-0 rounded-xl h-12 p-4 normal-case"
						placeholder="Inspiration"
						name="inspiration"
						value={inspiration}
						onChange={onFieldChange}
						required
					/>
					<div className="w-2/3 sm:w-1/3 flex items-center justify-center mt-10">
						<Button
							type="button"
							variant={"primary"}
							onClick={() => {
								submitHandler();
							}}
							// isLoading={isGenerating === "generating" || loading}
							rounded={true}
							classes="text-[17px] px-8 py-3"
						>
							Generate
						</Button>
					</div>
				</form>
			</div>
		</PageWrapper>
	);
}
