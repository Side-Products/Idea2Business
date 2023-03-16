export default function TestimonialCard({ name, username, avatar, text, daysAgo }) {
	return (
		<div class="w-full md:w-1/2 lg:w-1/3 p-3">
			<div class="p-6 h-full bg-dark-700 bg-opacity-80 border border-dark-400 rounded-2xl">
				<div class="flex flex-col justify-between h-full">
					<div class="mb-5 block">
						<div class="flex flex-wrap mb-4 -m-2">
							<div class="w-auto p-2">
								<img class="w-12 h-12 rounded-full" src={avatar} alt="avatar" />
							</div>
							<div class="w-auto p-2 text-start">
								<h3 class="font-semibold leading-normal">{name}</h3>
								<p class="text-dark-100">{username}</p>
							</div>
						</div>
						<p class="text-lg font-medium text-light-400 text-start">{text}</p>
					</div>

					<p class="text-sm text-start text-dark-100 font-medium">{daysAgo}</p>
				</div>
			</div>
		</div>
	);
}
