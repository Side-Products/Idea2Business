import PageWrapper from "@/layout/PageWrapper";
import BlogAuthor from "@/components/Blog/BlogAuthor";
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogImage from "@/components/Blog/BlogImage";
import BlogContent from "@/components/Blog/BlogContent";
import BlogSectionBreak from "@/components/Blog/BlogSectionBreak";
import ContentBold from "@/components/Blog/ContentBold";
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
			<BlogHeader tags={["Early Stage", "Brand", "Story"]}>The StoryBrand Framework</BlogHeader>

			<BlogImage src={"/notes/the-storybrand-framework.jpg"} alt={"note display image"} width={768} height={400} />

			<BlogContent>
				The SB 7 Framework is a powerful storytelling formula consisting of seven steps that can be found in almost every narrative. It&apos;s not a new
				invention, but rather a natural rhythm that successful stories follow. By applying this formula to how you communicate your product or service
				to your customers, you can create a compelling story that resonates with your audience and drives success for your business.
				<br />
				<br />
				The framework has been used in popular stories like Star Wars, Hunger Games, and Lord of the Rings, and has been exposed by Donald Miller and
				his team at StoryBrand to help businesses create effective marketing messages.
				<br />
				<br />
				So, what&apos;s the big deal? Well, it works. And if there is a formula for your company&apos;s success that actually works - that&apos;s a
				pretty big deal.
				<br />
				<br />
				There are 7 plot points in the StoryBrand Framework:
			</BlogContent>

			<BlogImage src={"/notes/storybrand.jpg"} alt={"note display image"} width={768} height={400} />

			<BlogContent>
				A <ContentBold>character</ContentBold> who wants something (the person using the website) encounters a <ContentBold>problem</ContentBold> (their
				need), then meets a <ContentBold>guide</ContentBold> (the business) who gives them a <ContentBold>plan</ContentBold> (indicates next steps) and{" "}
				<ContentBold>calls them to action</ContentBold> (call to action button), which results in a <ContentBold>success story</ContentBold>
				(they buy the product) and helps them <ContentBold>avoid failure</ContentBold> (reminder of what would happen if they do not buy).
			</BlogContent>

			<BlogSectionBreak />

			<BlogContent>
				<ul className="list-decimal list-inside gap-y-8 flex flex-col">
					<li>
						<ContentBold>A character:</ContentBold> So, the customer is the real hero here, not the brand. It&apos;s on UX designers to get inside
						the customer&apos;s head and find out what they want. This usually means doing research and testing to understand their desires. What
						motivates people? Saving money, time, connecting with others, or maybe just boosting their status? That&apos;s what we need to focus on.
					</li>
					<li>
						<ContentBold>Has a problem:</ContentBold> The bad guy in the StoryBrand plot is the customer&apos;s issue. It&apos;s cool to give that
						issue a personified identity, and it&apos;s important to recognize that the brand&apos;s products are like tools the customer can use to
						conquer it. Businesses often concentrate on tackling external problems, but what customers actually look for is answers to internal
						problems. There are three kinds of conflicts that people experience: external (which is what most companies try to resolve), internal
						(such as feeling annoyed, intimidated, or insecure), and philosophical (why does this story even matter?).
					</li>
					<li>
						<ContentBold>And meets a guide:</ContentBold> The guide is like the brand or business that helps the customer. People want someone to
						fix their problems and that&apos;s where the brand comes in. To build trust, the brand needs to show that they understand the
						customer&apos;s pain (empathy) and that they have the skills to solve the problem (authority).
					</li>
					<li>
						<ContentBold>Who gives them a plan:</ContentBold> The business needs to show the customer what to do next. Customers won&apos;t buy
						unless they know what&apos;s next. UX designers can help by laying out clear steps for customers and addressing any concerns they may
						have about the product or service.
					</li>
					<li>
						<ContentBold>And calls them to action:</ContentBold> Hey, you gotta have a solid call-to-action (CTA) to persuade the customers to buy
						or sign up.
					</li>
					<li>
						<ContentBold>That helps them avoid failure:</ContentBold>What&apos;s on the line for the customer? What are they risking if they
						don&apos;t buy from this brand?
					</li>
					<li>
						<ContentBold>And ends in a success:</ContentBold> Let your customers know how your product can change their life! Show them what their
						life will be like after they buy your product and how they&apos;ll feel like a champ. When you end your story, give your character one
						of these three endings: they win power or position, they find someone or something that makes them complete, or they have a realization
						that makes them whole.
					</li>
				</ul>
			</BlogContent>

			<AboutUs />
		</PageWrapper>
	);
}
