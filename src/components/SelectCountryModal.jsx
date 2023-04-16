import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import RadioButtons from "@/components/ui/Input/RadioButtons";

const SelectCountryModal = ({ isOpen, setOpen, country, setCountry, redirectToCheckout }) => {
	return (
		<Modal
			isOpen={isOpen}
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-earth-americas"></i>
				</div>
			}
			title={<p className="text-lg sm:text-xl font-semibold text-light-300">Which country are you located in?</p>}
			content={
				<div>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await redirectToCheckout();
						}}
					>
						<div className="flex justify-center gap-x-4">
							<RadioButtons
								radioType={"stripeCountryCheckout"}
								radioState={country}
								setRadioState={setCountry}
								radioId1={"India"}
								radioLabel1={"India"}
								radioId2={"Other"}
								radioLabel2={"Other"}
							/>
						</div>

						<div className="mt-10 w-full flex items-center justify-center">
							<Button
								type="submit"
								variant={"primary"}
								outline={true}
								rounded={true}
								classes="w-4/5 sm:w-2/3 md:w-2/3 px-[2px] py-[2px]"
								onClick={() => {}}
							>
								<div className="px-4 text-sm font-normal">
									Continue to checkout
									<span className="ml-2 text-sm">
										<i className="fa-solid fa-arrow-right-long"></i>
									</span>
								</div>
							</Button>
						</div>

						<div className="mt-8 text-[13px] text-dark-100">
							We use this information just for the Stripe checkout process and to show you prices in the appropriate currency of your country.
						</div>
					</form>
				</div>
			}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default SelectCountryModal;
