import PageWrapper from "@/layout/PageWrapper";
import ExampleCard from "@/components/Example/ExampleCard";
import SectionHeading from "@/components/Generate/SectionHeading";
import { examples } from "@/config/constants";

export default function Example() {
	return (
		<PageWrapper>
			<h1 className="mb-10 text-[36px] sm:text-[60px] font-bold text-center tracking-[-1px] text-gradient-primary-tr leading-[80px]">
				Here&apos;s what you get
			</h1>
			<div className="mt-12 text-3xl font-semibold text-center">This input</div>

			<div className="grid w-full mt-4 xl:px-20">
				<table className="w-full table example-table table-auto text-gray-400 border-separate space-y-6 text-sm">
					<thead className="bg-dark-800">
						<tr>
							<th className="p-3 pl-10 text-left text-gradient-secondary-tr">Idea Name</th>
							<th className="p-3 pl-10 text-left text-gradient-secondary-tr">Description</th>
						</tr>
					</thead>

					<tbody className="text-gray-900">
						<tr className="bg-dark-600 text-light-200">
							<td className="p-3 pl-10">Idea2Business</td>
							<td className="p-3 pl-10">
								Transform your idea into a profitable business. Just enter your idea, and Idea2Business will help you turn it into a successful
								venture.
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="mt-8 text-3xl font-semibold text-center">turns into this 🪄</div>

			<div className="mt-10 flex flex-col items-center justify-center w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[600px] 2xl:px-48 xl:px-40 lg:px-20 md:px-16 sm:px-4 px-2">
				<iframe
					src="https://view.officeapps.live.com/op/embed.aspx?src=https://docs.google.com/presentation/d/1dCMPbgtdG7ZPvTO47B_o6B4R6UDz-6Qg/edit?usp=sharing&ouid=100683860382676570556&rtpof=true&sd=true"
					width="100%"
					height="100%"
					frameborder="0"
				></iframe>
			</div>

			<div className="mt-24 text-3xl font-semibold text-center">and into all these specifically tailored for your business 🚀</div>

			<div className="mt-16">
				<div className="w-full grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 place-items-start gap-y-6 gap-x-10 md:gap-x-4 lg:gap-x-26 xl:gap-x-8">
					{examples &&
						examples.map((example, index) => {
							return <ExampleCard sectionStyle={(index + 5) % 8} heading={example.heading} body={example.body} key={index} />;
						})}
				</div>
			</div>

			<SectionHeading>And much more!</SectionHeading>

			<div className="mt-16 text-center text-gradient-primary-tr">
				Our personalized suggestions are very good but we can&apos;t promise that you won&apos;t have to do more work. That is also not the goal. We aim
				to get you into action mode. We want you to start your business as soon as possible. We want you to start making money. We want you to start
				living the life you&apos;ve always wanted. We want you to start living your dream.
			</div>
		</PageWrapper>
	);
}
