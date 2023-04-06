import Socials from "./Socials";

export default function NewsLetter() {
	return (
		<div className="w-full flex justify-center bg-light-300 dark:bg-dark-700">
			<div className="font-secondary w-full max-w-[1920px] py-20 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
				<p className="font-tertiary text-4xl mb-2">Stay in the loop</p>
				<div className="flex flex-col md:flex-row justify-between">
					{/* Left section */}
					<div>
						<p className="text-sm mb-4 max-w-md">
							Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating
							Musixverse.
						</p>
						{/* Subscribe to Mailchimp mailing list */}
						<form
							className="flex flex-col self-start sm:self-end md:flex-row"
							action="https://musixverse.us14.list-manage.com/subscribe/post"
							method="POST"
						>
							<input type="hidden" name="u" value="526b30ef38873ddc8b5b707b2" />
							<input type="hidden" name="id" value="895279b10e" />

							<input
								type="email"
								name="MERGE0"
								id="MERGE0"
								autoCapitalize="off"
								autoCorrect="off"
								className="py-3 px-4 text-sm rounded-lg outline-none sm:w-[267px] md:w-[283px] 2xl:w-[315px] font-primary bg-dark-700 dark:bg-dark-900 text-light-100"
								placeholder="Your email address"
								required
							></input>
							<button
								type="submit"
								className="max-w-[137px] py-2 mt-3 font-semibold rounded-md md:mt-0 md:ml-3 px-7 bg-light-100 hover:bg-light-200 dark:text-dark-600"
							>
								Subscribe
							</button>
						</form>
					</div>
					{/* Right section */}
					<div className="flex flex-col mt-5 md:mt-0 md:justify-end md:items-end">
						<p className="mb-4 text-[18px] font-semibold">Join the Community</p>
						<Socials />
					</div>
				</div>
			</div>
		</div>
	);
}
