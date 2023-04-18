import PageWrapper from "@/layout/PageWrapper";

export default function Example() {
	return (
		<PageWrapper>
			<h1 className="mb-10 text-[40px] sm:text-6xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">Coming Soon...</h1>

			<iframe
				src="https://view.officeapps.live.com/op/embed.aspx?src=[https://idea2business.xyz/example/deck.pptx]"
				width="100%"
				height="600px"
				frameborder="0"
			></iframe>
		</PageWrapper>
	);
}
