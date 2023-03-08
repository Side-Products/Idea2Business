import axios from "axios";
import Tick from "./Tick";
import Button from "@/components/ui/Button";

const Pricing = () => {
	const subscriptionHandler = async (_planChosen) => {
		const subscriptionData = {
			amountPaid: _planChosen,
			paymentInfo: {
				id: "STRIPE_PAYMENT_ID",
				status: "STRIPE_PAYMENT_STATUS",
			},
			paidOn: Date.now(),
			subscriptionValidUntil: Date.now() + (_planChosen == 5 ? 7 : 30) * 24 * 60 * 60 * 1000,
		};
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post("/api/subscriptions", subscriptionData, config);

			console.log(data);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<section>
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-light-300">Made for driven people like you</h2>
					<p className="mb-5 font-light sm:text-xl text-gray-400">
						Everything you need to convert your side-project into a profitable product.
						<br />
						Choose a plan that suits you. Grow business fast.
					</p>
				</div>

				<div className="mt-10 lg:mt-14 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
					<div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<h3 className="mb-4 text-2xl font-semibold">Free</h3>
						<p className="font-light sm:text-lg text-gray-400">Best option for personal use & for your next project.</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">$0</span>
							<span className="text-gray-400">/month</span>
						</div>

						<div className="mb-8 font-bold text-lg text-light-600">WHAT YOU CAN DO</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<Tick />
								<span>Individual configuration</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>No setup, or hidden fees</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Team size: <span className="font-semibold">1 developer</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Premium support: <span className="font-semibold">6 months</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Free updates: <span className="font-semibold">6 months</span>
								</span>
							</li>
						</ul>

						<Button type="button" variant={"primary"} onClick={() => {}} classes="text-lg px-8 py-3">
							Get Started Now
						</Button>
					</div>

					<div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<h3 className="mb-4 text-2xl font-semibold">Standard</h3>
						<p className="font-light sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">$5</span>
							<span className="dark:text-gray-400">/week</span>
						</div>

						<div className="mb-8 font-bold text-lg text-light-600">ALL OF FREE PLUS</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<Tick />
								<span>Individual configuration</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>No setup, or hidden fees</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Team size: <span className="font-semibold">10 developers</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Premium support: <span className="font-semibold">24 months</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Free updates: <span className="font-semibold">24 months</span>
								</span>
							</li>
						</ul>

						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								subscriptionHandler(5);
							}}
							classes="text-lg px-8 py-3"
						>
							Choose Plan
						</Button>
					</div>

					<div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-dark-800 text-white">
						<h3 className="mb-4 text-2xl font-semibold">Pro Plus</h3>
						<p className="font-light sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
						<div className="flex justify-center items-baseline my-8">
							<span className="mr-2 text-5xl font-extrabold">$10</span>
							<span className="dark:text-gray-400">/month</span>
						</div>

						<div className="mb-8 font-bold text-lg text-light-600">ALL OF STANDARD PLUS</div>

						<ul role="list" className="mb-8 space-y-4 text-left">
							<li className="flex items-center space-x-3">
								<Tick />
								<span>Individual configuration</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>No setup, or hidden fees</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Team size: <span className="font-semibold">100+ developers</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Premium support: <span className="font-semibold">36 months</span>
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<Tick />
								<span>
									Free updates: <span className="font-semibold">36 months</span>
								</span>
							</li>
						</ul>

						<Button
							type="button"
							variant={"secondary"}
							onClick={() => {
								subscriptionHandler(10);
							}}
							classes="text-lg px-8 py-3"
						>
							Choose Plan
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
