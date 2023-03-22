import Image from "next/image";

export default function TestimonialCard({ name, position, username, avatar, text, daysAgo }) {
	return (
		<div className="w-full md:w-1/2 lg:w-1/3 p-3">
			<div className="p-6 h-full bg-dark-700 bg-opacity-80 border border-dark-400 rounded-2xl">
				<div className="flex flex-col justify-between h-full">
					<div className="mb-5 block">
						<div className="flex flex-wrap mb-4 -m-2">
							<div className="w-auto p-2">
								<Image className="rounded-full" width="44" height="44" src={avatar} alt="avatar" />
							</div>
							<div className="w-auto p-2 text-start">
								<h3 className="font-semibold leading-normal">
									{name} <span className="pl-3 text-sm font-light text-dark-100">{position}</span>
								</h3>
								<p className="text-dark-100 text-sm">{username}</p>
							</div>
						</div>
						<p className="text-lg font-medium text-light-400 text-start">{text}</p>
					</div>

					<p className="text-sm text-start text-dark-100 font-medium">{daysAgo}</p>
				</div>
			</div>
		</div>
	);
}
