import PageWrapper from "@/layout/PageWrapper";
import BlogAuthor from "@/components/Blog/BlogAuthor";
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogImage from "@/components/Blog/BlogImage";
import BlogContent from "@/components/Blog/BlogContent";
import BlogNoteContent from "@/components/Blog/BlogNoteContent";
import BlogLink from "@/components/Blog/BlogLink";
import AboutUs from "@/components/Blog/AboutUs";

export default function HowToFindUniqueIdeas() {
	return (
		<PageWrapper blog={true}>
			<BlogAuthor
				avatar={`https://miro.medium.com/v2/resize:fill:176:176/1*QF8ZkVw7TVFwkymlULXeNw.png`}
				username={`Pushpit07`}
				name={`Pushpit`}
				lastUpdated={new Date(2023, 3, 23).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" })}
			/>
			<BlogHeader tags={["Early Stage", "Talking to Users", "Growth", "Product Market Fit"]}>Essential YC Advice: A Pocket Guide</BlogHeader>

			<BlogImage src={"/notes/essential-yc-advice.jpg"} alt={"note display image"} width={768} height={400} />

			<BlogContent>
				<ul className="list-disc list-inside gap-y-4 flex flex-col">
					<li>Launch now</li>
					<li>Build something people want</li>
					<li>Do things that don&apos;t scale</li>
					<li>Find the 90 / 10 solution</li>
					<li>Find 10-100 customers who love your product</li>
					<li>All startups are badly broken at some point</li>
					<li>Write code - talk to users</li>
					<li>&quot;It&apos;s not your money&quot;</li>
					<li>Growth is the result of a great product not the precursor</li>
					<li>Don&apos;t scale your team/product until you have built something people want</li>
					<li>Valuation is not equal to success or even probability of success</li>
					<li>Avoid long negotiated deals with big customers if you can</li>
					<li>Avoid big company corporate development queries - they will only waste time</li>
					<li>Avoid conferences unless they are the best way to get customers</li>
					<li>Pre-product market fit - do things that don&apos;t scale: remain small/nimble</li>
					<li>Startups can only solve one problem well at any given time</li>
					<li>Founder relationships matter more than you think</li>
					<li>Sometimes you need to fire your customers (they might be killing you)</li>
					<li>Ignore your competitors, you will more likely die of suicide than murder</li>
					<li>Most companies don&apos;t die because they run out of money</li>
					<li>Be nice! Or at least don&apos;t be a jerk</li>
					<li>Get sleep and exercise - take care of yourself</li>
				</ul>
			</BlogContent>

			<div className="mt-20">
				<BlogNoteContent>
					Reference:{" "}
					<BlogLink link={"https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice"}>
						https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice
					</BlogLink>
				</BlogNoteContent>
			</div>

			<AboutUs />
		</PageWrapper>
	);
}
