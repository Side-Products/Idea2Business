/**************************************************************************/
/**************************    Product details   **************************/
/**************************************************************************/
export const product_name = "Idea2Business";
export const product_url = "https://idea2business.xyz";
export const product_website_legal = "https://www.idea2business.xyz";
export const domain = "idea2business.xyz";
export const contact_email = "team@idea2business.xyz";
export const company_name = "Musixverse Technologies Pvt. Ltd.";

export const twitter_url = "https://twitter.com/_idea2business";
export const twitter_handle = "@_idea2business";
export const linkedin_url = "https://www.linkedin.com/company/idea-2-business";

export const personal_twitter_url = "https://twitter.com/Pushpit07";

/**************************************************************************/
/**********************    SEO Meta Descriptions   ************************/
/**************************************************************************/
export const title_main_page = "Idea to Business";
export const meta_description =
	"Transform your idea into a profitable business. Just enter your idea, and Idea2Business will help you turn it into a successful venture.";
export const reportabug_meta_description =
	"Feedback is vital to make our services even better. With a bug reporting form and email, it's easy to report issues you encounter and request enhancements to any services or functionalities on our platform. You'll directly influence the platform's development and help us make it better for you.";
export const contactus_meta_description =
	"Just send us your questions or concerns by filling out the shortest contact form you've ever seen and we will give you the help you need. Start Here.";
export const privacy_meta_description =
	"This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information.";
export const cancellation_and_refund_meta_description =
	"This Cancellation and Refund Policy is meant to help you understand the procedure for refunds and cancellation of subscriptions.";

/**************************************************************************/
/**************************    Subscription   *****************************/
/**************************************************************************/
// Replace these values with the values of the latest subscription object
export const freePlan = "Free";
export const standardPlan = "Standard";
export const proPlusPlan = "Pro Plus";

// version: {<obj>}
// Do not remove any new version object, only add new ones
// Prices are in USD
export const subscriptionPlans = {
	1: {
		freeSubscription: { name: "Free", price: 0 },
		standardSubscription: { name: "Standard", price: 5, validForDays: 7, usdToInrExchangeRate: 80 },
		proPlusSubscription: { name: "Pro Plus", price: 10, validForDays: 30, usdToInrExchangeRate: 80 },
	},
	// 2: {
	// 	freeSubscription: { name: freePlan, price: 0 },
	// 	standardSubscription: { name: standardPlan, price: 2, validForDays: 7 },
	// 	proPlusSubscription: { name: proPlusPlan, price: 5, validForDays: 30 },
	// },
};

/**************************************************************************/
/******************************    FAQs   *********************************/
/**************************************************************************/
import Link from "next/link";

export const Faqs = [
	{
		heading: "How do I use the app?",
		body: "To use the app, you simply need to provide a brief description of your idea. The app will then analyze the details and generate results. You can choose whatever you like best and use them as inspiration for your own creations.",
		content_id: "collapseSix",
		content_heading: "headingSix",
	},
	{
		heading: "Is the app free?",
		body: "The app has a free trial version with 5 credits having limited functionality, but you can take a paid subscription anytime to access full functionality.",
		content_id: "collapseSeven",
		content_heading: "headingSeven",
	},
	{
		heading: "How can I pay?",
		body:
			"We use Stripe's secure checkout which accepts the majority of credit cards and also offers European Debit Card payments. We do not store any of your (credit) card information. If you want to pay via PayPal, please send an email to " +
			contact_email +
			" and we'll arrange that!",
		content_id: "collapseOne",
		content_heading: "headingOne",
	},
	{
		heading: "Can I see an example of what I'll be getting?",
		body: (
			<p>
				Yes! Click&nbsp;
				<span className="font-medium underline underline-offset-2 text-primary-400">
					<Link href="/example">here</Link>
				</span>
				.
			</p>
		),
		content_id: "collapseTwo",
		content_heading: "headingTwo",
	},
	{
		heading: "Are the offerings created with a template?",
		body: "Nope! The pitch deck templates, investor questions, and tips & tricks are written by AI and they are 100% original. That means that all the content we generate and deliver is unique and tailored specifically for you and the startup you are building. You can use this content any way you want.",
		content_id: "collapseThree",
		content_heading: "headingThree",
	},
	{
		heading: "How do you deliver the content?",
		body: (
			<p>
				After your payment, you can go to the Generate page and select the content you want to generate. You can view the content in the browser and
				download it in .txt format too!
				<br />
				<br />
				Pitch Deck can be downloaded in .pptx format.
			</p>
		),
		content_id: "collapseFour",
		content_heading: "headingFour",
	},
	{
		heading: "What can I expect?",
		body: (
			<p>
				Our personalized suggestions are very good but we can&apos;t promise that you won&apos;t have to do more work. That is also not the goal. We aim
				to get you into action mode and kickstart your pitch deck and funding journey. Go get&apos;em tiger! 🫡
			</p>
		),
		content_id: "collapseFive",
		content_heading: "headingFive",
	},
];

/**************************************************************************/
/****************************    Examples   *******************************/
/**************************************************************************/

export const examples = [
	{
		heading: "Email Pitch to VC",
		body: `
		Dear [Name],
		
		I hope this message finds you well!
		
		I'm reaching out to you today to introduce you to Idea2Business, a revolutionary new startup that is transforming the way people turn their ideas into profitable businesses. 

		Idea2Business is a comprehensive, user-friendly platform that helps people turn their ideas into successful, profitable businesses. With Idea2Business, users just enter their idea, and the platform will provide resources and guidance to help the user identify the necessary steps to turn their idea into a successful venture. 

		This solution is especially important due to the size of the market. According to the Small Business Association, more than half of Americans have thought about starting their own business at some point in their life. Furthermore, there is an estimated value of $27 trillion in unrealized business ideas in the US alone.

		Idea2Business aims to become the go-to platform for people looking to start their own business. Our plan for achieving this is to create an extensive network of resources and experts who can provide guidance and support to those embarking on their entrepreneurial journey. We will also leverage our network of venture capitalists to help connect users with potential investors who can provide the financial resources needed to get their business off the ground. 

		We are confident that this platform has the potential to revolutionize the way people turn their ideas into profitable businesses and are looking to partner with an experienced venture capitalist who can help us reach our goals. 

		If you are interested in learning more about Idea2Business and partnering with us, please don't hesitate to get in touch via email or phone. I look forward to hearing from you!

		Sincerely,
		[Your Name]
		`,
	},
	{
		heading: "User Persona",
		body: `
		1. Chris, a 25 year-old recent college graduate. He's always had big ideas and is now looking to finally move forward with them. He's looking to use Idea2Business to understand how to make his ideas into a viable business without investing too much money.

		2. Andrew, a 33 year-old entrepreneur. He's had some success in the past, but he's looking for a way to make his latest venture become a reality. He's seen Idea2Business as a great way to launch his new project with minimal effort.

		3. Jane, a 50 year-old career woman. She's been in the business world for years and has some great ideas but has never taken the plunge. She's heard great things about Idea2Business and is curious to use it to finally make her ideas into something profitable.

		4. Eric, a 20 year-old student. He's fresh out of school and eager to make something of himself. He's seen Idea2Business as a way of taking his wild ideas and turning them into reality.

		5. Sarah, a 30 year-old stay-at-home mom. She's got some great ideas for projects but doesn't know how to make them into something real. She's heard about Idea2Business and is interested in using it to make her dreams come true.

		6. Rachel: A 29-year-old freelance artist who is looking for a way to create a steady source of income. She is using Idea2Business to help her turn her creative talents into a successful business.

		7. Lisa: A 48-year-old business professional who is looking for a way to use her years of experience to start her own business. She is excited to use the tools and resources provided by Idea2Business to turn her ideas into a profitable venture.

		8. Sam: A 21-year-old college student seeking an easy way to put his ideas into motion. He is tech-savvy and understands the basics of business but is seeking an easy way to set up a business.
		`,
	},
	{
		heading: "Twitter Strategy",
		body: `
		1. Create a Twitter profile page and post content regularly (e.g. tutorials, success stories, tips, etc.) that highlight the benefits of using Idea2Business.

		2. Build relationships with potential customers by engaging with them on relevant topics and responding to their tweets.

		3. Leverage influencers in the entrepreneurial space to raise awareness of Idea2Business and its features.

		4. Leverage Twitter Ads to target potential customers interested in starting a business.

		5. Create an engaging contest or giveaway that requires participants to follow the Idea2Business Twitter account and include #Idea2Business hashtag in their tweets.

		6. Promote the Idea2Business product on other related online platforms such as LinkedIn and Facebook.

		7. Research and utilize trending hashtags related to business and entrepreneurship, then write posts that provide value to potential customers.

		8. Run a Twitter chat series by hosting a weekly event with experts in the entrepreneurial space.
		`,
	},
	{
		heading: "Advice from the book: The Startup Owner’s Manual",
		body: `
		1. Start small. Don't get too ambitious when launching Idea2Business and try to launch a fully-fledged platform right away. Start with a basic version that you can further develop as customer feedback and demand increases.

		2. Understand your customer. Make sure you understand who your customer is and what their needs are. Figure out what problems they are trying to solve, and how Idea2Business can help them.

		3. Focus on marketing and sales. The success of your business will depend on how well you market and sell your product. Create a marketing and sales plan that focuses on how you can reach potential customers and convert them into paying customers.

		4. Invest in customer support. Provide customer support for your users, as it is essential for customer retention and satisfaction. This will help ensure that your customers are having a good experience, and are more likely to recommend Idea2Business to others.

		5. Test and iterate. Testing and iterating is essential for developing a successful product. Test out different features, and make sure to get customer feedback so you can make improvements. Continually refine and improve the product based on customer feedback and data.
		`,
	},
	{
		heading: "Validate the idea",
		body: `
		The startup idea of Idea2Business has the potential to revolutionize the way entrepreneurs bring their ideas to life. The idea of having a platform that assists in transforming an idea into a profitable business is highly appealing for entrepreneurs looking to make a change in the world. Idea2Business’s business model focuses on providing the necessary resources, such as market research, financial planning, and product development, to help an entrepreneur to turn an idea into a successful venture.

		The potential revenue of Idea2Business’s services is highly attractive. Entrepreneurs who use the platform could expect to pay a small fee for each session, or a subscription-based fee for a longer-term service. The platform also has potential to generate revenue by partnering with other organizations such as venture capitalists and tech incubators to provide their services to a wider range of entrepreneurs.

		The market opportunity of the Idea2Business platform is also promising. The platform has potential to appeal to a large pool of entrepreneurs, both in the startup world and in traditional businesses, who need assistance in bringing their ideas to fruition. Additionally, the platform could be used by institutions, such as universities and business schools, to support student entrepreneurs in launching their business. All of this presents a huge potential for Idea2Business to expand its user base and generate more revenue.
		`,
	},
	{
		heading: "Value Proposition",
		body: `
		1. Idea2Business will help you turn your ideas into profitable businesses with ease, and provide ongoing support to ensure ongoing success. 
		
		2. Invest in your future with Idea2Business and get the guidance, resources and expertise needed to turn your ideas into a successful venture. 
		
		3. Don't let your ideas go to waste, turn them into something special with Idea2Business. We provide the tools and support needed to turn your ideas into businesses. 
		
		4. Make your dreams a reality, with Idea2Business. Take your idea all the way from conception to success with personalized support and tailored resources. 
		
		5. Get the confidence and the resources needed to turn your ideas into businesses with Idea2Business. Enjoy the journey to success with our innovative platform.
		`,
	},
	{
		heading: "Brand Color Scheme",
		body: `
		1. Earthy Color Scheme: This color scheme includes natural, calming earth tones, such as olive green, beige, and light brown. This color scheme is warm and inviting, conveying a sense of trust, stability, and reliability, all core values of Idea2Business. 

		2. Bright Color Scheme: This color scheme features bold and saturated colors, such as orange, yellow, and blue. This vivid palette is energizing and conveys excitement for the possibilities available through Idea2Business, signaling that the business can help you create something new and innovative.

		3. Professional Color Scheme: This color scheme is composed of neutrals and navy blue, creating a clean and professional aesthetic. The navy blue is sophisticated, suggesting that Idea2Business can provide high-quality, reliable services to help you turn your ideas into reality. 

		4. Pastel Color Scheme: This color scheme includes pastel shades, such as soft pink, lilac, and peach. This palette creates a calming, friendly atmosphere, giving the impression that Idea2Business is eager to help you succeed. 

		5. Monochromatic Color Scheme: This color scheme features different shades of a single hue, such as white and grey. The color scheme is subtle and refined, conveying the idea that Idea2Business can help simplify the process of turning an idea into a reality.
		`,
	},
	{
		heading: "Effective strategies for generating buzz leading up to a product launch",
		body: `
		1. Create a compelling video outlining the product mission and potential of Idea2Business. Post this video with a short description of the service on popular social media platforms.

		2. Reach out to key influencers in the entrepreneurial and business space to review your product and create excitement about the launch.

		3. Advertise the launch of Idea2Business on relevant websites and blogs in the startup space.

		4. Develop a series of webinars and workshops for entrepreneurs to learn about the product and the benefits it will bring to them.

		5. Organize a competition to spark creativity and generate excitement around the product launch.

		6. Create a unique hashtag related to the product and add it to all of your social media posts to foster a sense of community and anticipation.

		7. Connect with potential customers through online forums and encourage them to try out Idea2Business when it launches.

		8. Launch a blog that discusses relevant topics in the entrepreneurial space and discuss the benefits of Idea2Business.
		`,
	},
	{
		heading: "Effective marketing channels and strategies",
		body: `
		Marketing Channels:
		1. Social Media Advertising: Utilize social media platforms such as Facebook, Instagram, Twitter, LinkedIn, and YouTube to promote the Idea2Business platform and attract potential customers.

		2. Search Engine Optimization (SEO): Improve the visibility of the platform and its content on search engines like Google and Bing by optimizing relevant webpages and creating backlinks.

		3. Influencer Marketing: Reach out to influencers in the entrepreneurship and business space who can help spread the word about the platform and its services.

		4. Email Marketing: Create a targeted email list of potential customers and use email outreach to promote the platform and its services.

		Marketing Strategies:
		1. Connect with Entrepreneurs and Business Owners: Connect with entrepreneurs and business owners online and in person to learn their needs and promote the service.

		2. Use Scenario-Based Content: Create content that caters to different scenarios and encourages users to take action to use the platform.

		3. Offer Free Trials: Offer free trials or discounts on services to attract more potential customers and give them a taste of the platform.

		4. Leverage Partnerships: Form strategic partnerships with other companies to cross-promote services and grow the customer base.
		`,
	},
	{
		heading: "Strategies for driving growth and scaling",
		body: `
		1. Leverage relationships with entrepreneurs, business advisors, and investors in the startup community to create word-of-mouth and referrals.

		2. Develop partnerships with incubators, accelerators, and other organizations that support entrepreneurs.

		3. Utilize online marketing tactics such as SEO, PPC, and social media to reach potential customers.

		4. Develop and nurture strong relationships with influencers and thought leaders in your target market.

		5. Implement a referral program to reward existing customers for providing referrals.

		6. Develop content that educates potential customers about the value of Idea2Business.

		7. Create a blog to showcase successful business stories and highlight the services provided by Idea2Business.

		8. Hold webinars, workshops, and other events that help to educate potential customers.

		9. Craft a clear message that speaks to the value of Idea2Business and how it can help entrepreneurs transform their ideas into successful businesses.

		10. Leverage the power of artificial intelligence to improve the accuracy and efficiency of the service.
		`,
	},
	{
		heading: "Investor questions you can expect (with answers)",
		body: `
		1. What is the target market of your business Idea2Business?
		Answer: Our target market is entrepreneurs, small businesses, and start-ups who want to turn an idea into a profitable business. 

		2. What makes Idea2Business unique and stand out from its competitors?
		Answer: Idea2Business is unique because we provide an all-in-one service to turn an idea into a profitable business. We provide guidance, resources, and tools throughout the entire process, from market research to business model development to marketing strategies.

		3. What type of resources and tools do you provide to turn an idea into a profitable business?
		Answer: We provide a wide range of resources and tools including market research, financial planning, business model development, marketing strategies, and more. We also offer personalized guidance, advice, and mentorship to assist entrepreneurs throughout the entire process.

		4. Who is the team behind Idea2Business?
		Answer: The team behind Idea2Business consists of entrepreneurs, investors, and business professionals with extensive experience in the industry. We are dedicated to helping entrepreneurs turn their ideas into successful businesses.

		5. What kind of success rate does Idea2Business have?
		Answer: We have helped hundreds of entrepreneurs turn their ideas into successful businesses, with a success rate of over 95%.
		`,
	},
	{
		heading: "Grant Proposal",
		body: `
		Proposal to _____

		We seek your support to help launch Idea2Business, a revolutionary new web-based platform that will empower entrepreneurs and innovators to quickly and easily transform their ideas into profitable ventures.

		At Idea2Business our mission is to enable the creative minds of the world to turn their ideas into successful businesses. By leveraging our advanced web-based platform, we can provide an accessible and affordable service to help entrepreneurs and innovators access the resources and advice they need to launch a successful venture from the ground up.

		Our platform will offer an easy and intuitive interface for users to enter their ideas and receive personalized guidance on turning their concept into a successful endeavor. Our team will provide the right support and advice to help users each step of the way, from researching their market and crafting a business plan to finding investors and launching the venture.

		We need your financial support to help realize our vision. Your funding will enable us to develop the platform and materials needed to help users achieve their goals. This includes website design and development, marketing, and legal guidance to name a few. Your funding will also play an essential role in facilitating the development of our in-house team of experts who will offer personalized advice and guidance to our users.

		Your investment will play a vital role in providing an accessible and affordable service that will help entrepreneurs turn their ideas into successful businesses. By helping launch Idea2Business, you will open up a world of opportunity for those who dream of launching their own venture.

		We invite you to be part of making this dream a reality and thank you for your consideration. Please contact us if you have any questions about our project or would like additional information.

		Sincerely,
		Idea2Business Team
		`,
	},
];

/**************************************************************************/
/************************    Card Information   ***************************/
/**************************************************************************/
// Do not change identifier property of the objects in these arrays
// Do not remove any object from these arrays. Only add `hidden: true` to the object to hide it from the generate & pricing page
// Update the generateCategories object and goToSectionCarouselOptions array if you add or remove any category
export const pitches = [
	{
		cardText: "Pitch to Onboard Potential Co-Founder",
		identifier: "coFounderPitch",
		subscriptionPlanRequired: freePlan,
		prompt: `Write me a pitch to a potential future co-founder if they would be interested in joining me on a startup journey. Write a comprehensive answer to convince them. Make it crisp and a bit funny. Following is my startup:`,
		loadingMessage: "Co-Founder pitch for your idea is being generated",
	},
	{
		cardText: "Pitch to Get Yourself a Mentor",
		identifier: "mentorPitch",
		subscriptionPlanRequired: freePlan,
		prompt: `Write me a pitch to get a mentor if they would be interested in joining my startup to mentor me. Write a comprehensive answer to convince them. Following is my startup:`,
		loadingMessage: "Pitch to Mentor for your idea is being generated",
	},
	{
		cardText: "Email Pitch to VC",
		identifier: "emailPitchToVc",
		subscriptionPlanRequired: standardPlan,
		prompt: `Write me a email pitch to a VC for the following startup that includes the problem it's solving, the solution, market size, and the business plan:`,
		loadingMessage: "VC Pitch for your idea is being generated",
	},
	{
		cardText: "Pitch to Onboard Potential Advisor (Marketing)",
		identifier: "marketingAdvisorPitch",
		subscriptionPlanRequired: standardPlan,
		prompt: `Write me a pitch to a potential future advisor if they would be interested in joining my startup to advise us on the marketing and strategy front. Write a comprehensive answer to convince them. Following is my startup:`,
		loadingMessage: "Pitch to Marketing Advisor for your idea is being generated",
	},
];

export const understandingPotentialUsers = [
	{
		cardText: "User Persona",
		identifier: "userPersona",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate 10 user personas for the following startup:`,
		loadingMessage: "User Personas for your idea are being generated",
	},
	{
		cardText: "Mom Test: How to talk to initial customers",
		identifier: "momTest",
		subscriptionPlanRequired: standardPlan,
		prompt: `The Mom Test: The Mom Test is a set of simple rules for crafting good questions that even your mom can't lie to you about.
		They are collectively called The Mom Test:
		1. Talk about their life instead of your idea.
		2. Ask about specifics in the past instead of generics or opinions about the future.
		3. Talk less and listen more.
		
		Write the comprehensive content for the Mom test for the following startup:`,
		loadingMessage: "Mom Test for your idea is being generated",
	},
	{
		cardText: "Type of Potential Customers",
		identifier: "typeOfPotentialCustomers",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate the types of potential customers a startup founder should target for the following startup:`,
		loadingMessage: "List of Potential Customers for your idea is being generated",
	},
	{
		cardText: "Customer Pain Points",
		identifier: "customerPainPoints",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate the pain points that a potential customer could have for the following startup:`,
		loadingMessage: "List of Customer Pain Points for your idea is being generated",
	},
];

export const socialMediaStrategy = [
	{
		cardText: "Twitter Strategy",
		identifier: "twitterStrategy",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate the Twitter strategy for initial growth for the following product:`,
		loadingMessage: "Twitter Strategy for your idea is being generated",
	},
	{
		cardText: "Instagram Strategy",
		identifier: "instagramStrategy",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate the Instagram strategy for initial growth for the following product:`,
		loadingMessage: "Instagram Strategy for your idea is being generated",
	},
	{
		cardText: "LinkedIn Strategy",
		identifier: "linkedinStrategy",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate the LinkedIn strategy for initial growth for the following product:`,
		loadingMessage: "LinkedIn Strategy for your idea is being generated",
	},
	{
		cardText: "TikTok/Reels/Shorts Strategy",
		identifier: "tiktokReelsShortsStrategy",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate the TikTok strategy for initial growth for the following product:`,
		loadingMessage: "TikTok/Reels/Shorts Strategy for your idea is being generated",
	},
];

export const adviceFromBooks = [
	{
		cardText: "Advice from the book: The Lean Startup",
		identifier: "adviceFromBookTheLeanStartup",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate advice from the book "The  Lean Startup" specifically for the following startup:`,
		loadingMessage: "Advice from The Lean Startup for your idea is being generated",
	},
	{
		cardText: "Advice from the book: Hooked",
		identifier: "adviceFromBookHooked",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate advice from the book “Hooked” specifically for the following startup:`,
		loadingMessage: "Advice from Hooked for your idea is being generated",
	},
	{
		cardText: "Advice from the book: The Hard Thing About Hard Things",
		identifier: "adviceFromBookTheHardThingAboutHardThings",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate advice from the book “The Hard Thing About Hard Things” specifically for the following startup:`,
		loadingMessage: "Advice from The Hard Thing About Hard Things for your idea is being generated",
	},
	{
		cardText: "Advice from the book: The Startup Owner’s Manual",
		identifier: "adviceFromBookTheStartupOwnersManual",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate advice from the book “The Startup Owner’s Manual” specifically for the following startup:`,
		loadingMessage: "Advice from The Startup Owner's Manual for your idea is being generated",
	},
];

export const marketValidation = [
	{
		cardText: "Validate the idea",
		identifier: "validateTheIdea",
		subscriptionPlanRequired: freePlan,
		prompt: `Validate the startup idea of the following startup according to the business model, revenue, and market opportunity in at least 3 paragraphs:`,
		loadingMessage: "Idea validation result for your idea is being generated",
	},
	{
		cardText: "Effective methods for conducting market research",
		identifier: "effectiveMethodsForConductingMarketResearch",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate some effective methods for conducting market research for the following startup idea:`,
		loadingMessage: "Methods for conducting market research for your idea are being generated",
	},
	{
		cardText: "Mistakes to avoid when conducting market validation",
		identifier: "mistakesToAvoidWhenConductingMarketValidation",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate 10 mistakes to avoid when conducting market validation for the following startup idea:`,
		loadingMessage: "Mistakes to avoid when conducting market validation for your idea are being generated",
	},
	{
		cardText: "Key metrics to track during market validation process",
		identifier: "keyMetricsToTrackDuringMarketValidationProcess",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `What are 10 key metrics to track during market validation process for the following startup idea:`,
		loadingMessage: "Key metrics to track during market validation process for your idea are being generated",
	},
];

export const vision = [
	{
		cardText: "Value Proposition",
		identifier: "valueProposition",
		subscriptionPlanRequired: standardPlan,
		prompt: `A value proposition is a short statement that communicates why buyers should choose your products or services. It’s more than just a product or service description — it's the specific solution that your business provides and the promise of value that a customer can expect you to deliver.
		
		Reference: https://blog.hubspot.com/marketing/write-value-proposition#value-proposition-vs-mission-statement
		Write 5 possible value propositions (see above reference) for the following startup idea:`,
		loadingMessage: "Value Proposition for your business is being generated",
	},
	{
		cardText: "Mission Statement",
		identifier: "missionStatement",
		subscriptionPlanRequired: standardPlan,
		prompt: `A mission statement details your objective as an organization. While the two can have points in common, a value prop is more product- and service-oriented while a mission statement is more goal-oriented.
		
		Reference: https://blog.hubspot.com/marketing/write-value-proposition#value-proposition-vs-mission-statement
		Write 5 possible mission statements (see above reference) for the following startup idea:`,
		loadingMessage: "Mission Statement for your business is being generated",
	},
	{
		cardText: "Slogan",
		identifier: "slogan",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `A slogan is a short, catchy statement that brands use in marketing campaigns to sell a specific product. While your value proposition wouldn’t necessarily go in an ad (at least, not usually), a slogan would. The most important thing to note is that a company can have different slogans for different campaigns or products.
		
		Reference: https://blog.hubspot.com/marketing/write-value-proposition#value-proposition-vs-mission-statement
		Write 5 possible slogans (see above reference) for the following startup idea:`,
		loadingMessage: "Slogan for your business is being generated",
	},
	{
		cardText: "Tagline",
		identifier: "tagline",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `A tagline is a short statement that embodies a certain aspect of your brand or business. While a value proposition is more concrete, a tagline can represent a concept or idea that your business stands for.
		
		Reference: https://blog.hubspot.com/marketing/write-value-proposition#value-proposition-vs-mission-statement
		Write 5 possible taglines (see above reference) for the following startup idea:`,
		loadingMessage: "Tagline for your business is being generated",
	},
];

export const design = [
	{
		cardText: "Website Design Theme",
		identifier: "designTheme",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate 10 design theme suggestions of a website for the following startup:`,
		loadingMessage: "Design themes for your idea are being generated",
	},
	{
		cardText: "Logo Ideas",
		identifier: "logoIdeas",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate 10 logo ideas for a website for the following startup:`,
		loadingMessage: "Logo ideas for your business are being generated",
	},
	{
		cardText: "Brand Color Scheme",
		identifier: "brandColorScheme",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate 5 brand color schemes (with explanation) that can be used in creating a website for the following business idea:`,
		loadingMessage: "Brand Color Scheme for your business is being generated",
	},
	{
		cardText: "Mistakes to avoid in design",
		identifier: "mistakesToAvoidInDesign",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate 10 graphic design language mistakes to avoid for the following startup idea:`,
		loadingMessage: "Mistakes to avoid in design for your business are being generated",
	},
];

export const productLaunch = [
	{
		cardText: "How to execute a successful product launch?",
		identifier: "howToExecuteASuccessfulProductLaunch",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate a guide to execute a successful product launch online for the following startup idea:`,
		loadingMessage: "Guide to execute a successful product launch of your business is being generated",
	},
	{
		cardText: "Guide to launch on Product Hunt",
		identifier: "guideToLaunchOnProductHunt",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate a guide to launch the following startup on Product Hunt:`,
		loadingMessage: "Guide to launch your business on Product Hunt is being generated",
	},
	{
		cardText: "Effective strategies for generating buzz leading up to a product launch",
		identifier: "effectiveStrategiesForGeneratingBuzzLeadingUpToAProductLaunch",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate some effective strategies for generating buzz and building anticipation leading up to a product launch for the following startup idea:`,
		loadingMessage: "Effective strategies for generating buzz for your business are being generated",
	},
	{
		cardText: "Mistakes to avoid during product launch",
		identifier: "mistakesToAvoidDuringProductLaunch",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `What are 10 mistakes to avoid during product launch for the following startup idea:`,
		loadingMessage: "Mistakes to avoid during your product launch are being generated",
	},
];

export const marketing = [
	{
		cardText: "Effective marketing channels and strategies",
		identifier: "effectiveMarketingChannelsAndStrategies",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate effective marketing channels and strategies for the following startup idea:`,
		loadingMessage: "Effective marketing channels and strategies for your business are being generated",
	},
	{
		cardText: "How to maintain momentum and sustain interest in your product after the initial launch period?",
		identifier: "howDoYouMaintainMomentumAndSustainInterestInYourProductAfterTheInitialLaunchPeriod",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate 10 detailed ways to maintain momentum and sustain interest after the initial launch period for the following startup idea:`,
		loadingMessage: "Ways to maintain momentum for your business are being generated",
	},
	{
		cardText: "How to create a strong brand identity?",
		identifier: "howToCreateAStrongBrandIdentity",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate 10 detailed tips to create a strong brand identity for the following startup idea:`,
		loadingMessage: "Ways to create a strong brand identity for your business are being generated",
	},
	{
		cardText: "How to use customer feedback to improve your marketing messaging and approach?",
		identifier: "howToUseCustomerFeedbackToImproveYourMarketingMessagingAndApproach",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate 10 detailed ways to use customer feedback to improve the marketing messaging and approach for the following startup idea:`,
		loadingMessage: "Ways to improve marketing messaging for your business are being generated",
	},
];

export const growth = [
	{
		cardText: "Strategies for driving growth and scaling",
		identifier: "strategiesForDrivingGrowthAndScaling",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate strategies for driving growth and scaling for the following startup idea:`,
		loadingMessage: "Strategies for driving growth for your business are being generated",
	},
	{
		cardText: "How to identify and prioritize growth opportunities?",
		identifier: "howToIdentifyAndPrioritizeGrowthOpportunities",
		subscriptionPlanRequired: standardPlan,
		prompt: `How to identify and prioritize growth opportunities for the following startup idea:`,
		loadingMessage: "Plan to identify growth opportunities for your business is being generated",
	},
	{
		cardText: "How to leverage technology and automation to streamline operations and fuel growth?",
		identifier: "howToLeverageTechnologyAndAutomationToStreamlineOperationsAndFuelGrowth",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate a detailed plan on how to leverage technology and automation to streamline operations and fuel growth for the following startup idea:`,
		loadingMessage: "A detailed plan for your business is being generated",
	},
	{
		cardText: "How to build and maintain strong relationships with customers to drive repeat business and referrals?",
		identifier: "howToBuildAndMaintainStrongRelationshipsWithCustomersToDriveRepeatBusinessAndReferrals",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate a detailed plan on how to build and maintain strong relationships with customers to drive repeat business and referrals for the following startup idea:`,
		loadingMessage: "A detailed plan for your business is being generated",
	},
];

export const investorMeetingPrep = [
	{
		cardText: (
			<>
				15 investor questions you can expect
				<br />
				(with answers)
			</>
		),
		identifier: "15expectedInvestorQuestions",
		subscriptionPlanRequired: freePlan,
		prompt: `Write me 15 questions that an investor can ask me during a pitch. Also write comprehensive answers to convince them. Following is my startup:`,
		loadingMessage: "Expected Investor Questions for your idea are being generated",
	},
	{
		cardText: "10 personal tips & tricks to nail your pitch",
		identifier: "10personalTipsAndTricksToNailYourPitch",
		subscriptionPlanRequired: freePlan,
		prompt: `Write me 10 tips and tricks to nail a pitch about my idea in front of an investor. Write comprehensive text. Following is my startup:`,
		loadingMessage: "Tips & Tricks to nail the pitch for your idea are being generated",
	},
	{
		cardText: "What is your revenue model and how do you plan to generate sustainable revenue over the long term?",
		identifier: "revenueModel",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Write revenue models for my startup and how can I plan to generate sustainable revenue over the long term? I have to give the answer to an investor. Write comprehensive answers to convince them. Following is my startup:`,
		loadingMessage: "Revenue Model for your idea is being generated",
	},
	{
		cardText: "What is your exit strategy, and how do you plan to create value for investors?",
		identifier: "exitStrategy",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Write an exit strategy for my startup and how can I create value for investors? I have to give the answer to an investor. Write comprehensive answers to convince them. Following is my startup:`,
		loadingMessage: "Exit Strategy for your idea is being generated",
	},
];

export const bonusContent = [
	{
		cardText: "SPME (Strategy, Positioning, Messaging, Experimentations): Marketing for solopreneurs",
		identifier: "spme",
		subscriptionPlanRequired: freePlan,
		prompt: `SPME (Strategy, Positioning, Messaging, Experimentations): Marketing for solopreneurs.
		Strategy: the way toward your first position, the way from position to the next position, like a staircase up and to the right.
		Positioning: A position is a context, an environment in which your product appears. Your future customers put your product into such a mental position. This happens in their own minds.
		Messaging: Messaging is about crafting successful messages that you can send to your audience. Messages should transport information and cause emotion. The information your audience needs to develop emotions that lead them to buy your product.
		Experimentations:  It consists of a story you want to tell, a channel by which to reach your audience, a hypothesis of what will happen when they get the story, the materials you need to tell the story (text, images, video, audio...), the recipe about how you process and combine those materials, and the tools you need to execute the recipe.
		Generate Strategy, Positioning, Messaging, and Experimentations for marketing of the following startup:`,
		loadingMessage: "SPME for your idea is being generated",
	},
	{
		cardText: "MVP Launch Checklist",
		identifier: "mvpLaunchChecklist",
		subscriptionPlanRequired: freePlan,
		prompt: `Generate a list of actionable items to launch the MVP of the following idea:`,
		loadingMessage: "MVP Launch checklist for your idea is being generated",
		// hidden: true,
	},
	{
		cardText: "How to build a team",
		identifier: "howToBuildATeam",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate a guide for how to build a team for the following idea:`,
		loadingMessage: "How to build a team for your idea is being generated",
	},
	{
		cardText: "Product Roadmap",
		identifier: "productRoadmap",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate a product roadmap for the following idea:`,
		loadingMessage: "Product Roadmap for your idea is being generated",
	},
	{
		cardText: "Social Media Calendar",
		identifier: "socialMediaCalendar",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate social media calendar for 30 days for the following idea:`,
		loadingMessage: "Social Media Calendar for your idea is being generated",
	},
	{
		cardText: "Ideal Customer Profile (ICP)",
		identifier: "idealCustomerProfile",
		subscriptionPlanRequired: standardPlan,
		prompt: `Generate ideal customer profile for the following idea:`,
		loadingMessage: "Ideal Customer Profile for your idea is being generated",
	},
	{
		cardText: "Grant Proposal",
		identifier: "grantProposal",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate a grant proposal for the following startup:`,
		loadingMessage: "Grant Proposal for your idea is being generated",
	},
	{
		cardText: "Legal Advice",
		identifier: "legalAdvice",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Generate legal advice specifically for the following startup:`,
		loadingMessage: "Legal Advice for your idea is being generated",
	},
];

export const decks = [
	{
		cardText: "Download PitchDeck",
		identifier: "pitchDeck",
		subscriptionPlanRequired: proPlusPlan,
		prompt: `Reference: https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck
		Write 1 comprehensive paragraph for each of the following topics, following the guidelines provided by YCombinator (see above reference): Problem, Solution, Market Opportunity, Product, Business Model, Competition, Traction, Financials, Team, Ask, Unique Selling Point, Target Audience for the following product:`,
		loadingMessage: "Pitchdeck for your idea is being generated",
	},
];

// Add all section constants here
export const generateCategories = {
	decks,
	pitches,
	understandingPotentialUsers,
	socialMediaStrategy,
	adviceFromBooks,
	marketValidation,
	vision,
	design,
	productLaunch,
	marketing,
	growth,
	investorMeetingPrep,
	bonusContent,
};

export const goToSectionCarouselOptions = [
	{ name: "Decks", id: "decks", icon: "fa-solid fa-file-powerpoint" },
	{ name: "Pitches", id: "pitches", icon: "fa-solid fa-person-chalkboard" },
	{ name: "Potential Users", id: "understandingPotentialUsers", icon: "fa-solid fa-users" },
	{ name: "Social Media", id: "socialMediaStrategy", icon: "fa-solid fa-hashtag" },
	{ name: "Advice From Books", id: "adviceFromBooks", icon: "fa-solid fa-book" },
	{ name: "Market Validation", id: "marketValidation", icon: "fa-solid fa-check-double" },
	{ name: "Vision", id: "vision", icon: "fa-solid fa-lightbulb" },
	{ name: "Design", id: "design", icon: "fa-solid fa-paintbrush" },
	{ name: "Product Launch", id: "productLaunch", icon: "fa-solid fa-rocket" },
	{ name: "Marketing", id: "marketing", icon: "fa-solid fa-bullhorn" },
	{ name: "Growth", id: "growth", icon: "fa-solid fa-arrow-up-right-dots" },
	{ name: "Investor Meeting Prep", id: "investorMeetingPrep", icon: "fa-solid fa-handshake" },
	{ name: "Bonus", id: "bonusContent", icon: "fa-solid fa-money-bill-trend-up" },
];

export const resources = {
	images: [
		{
			name: "Lexica",
			url: "https://lexica.art",
			logo: "",
		},
	],
	text: [
		{
			name: "Speedwrite",
			description: "Write faster and better. Unique writing, every time.",
			url: "https://speedwrite.com",
			logo: "",
		},
	],
	presentations: [
		{
			name: "beautiful.ai",
			description: "Create beautiful presentations in minutes",
			url: "https://www.beautiful.ai",
			logo: "",
		},
	],
};

export const notes = [
	{
		name: "The StoryBrand Framework",
		image: "/notes/the-storybrand-framework.jpg",
		link: "/notes/the-storybrand-framework",
	},
	{
		name: "How to write a Great Value Proposition?",
		image: "/notes/how-to-write-a-great-value-proposition.jpg",
		link: "/notes/how-to-write-a-great-value-proposition",
	},
	{
		name: "Essential YC Advice: A Pocket Guide",
		image: "/notes/essential-yc-advice.jpg",
		link: "/notes/essential-yc-advice",
	},
	{
		name: "How to find unique ideas?",
		image: "/notes/idea-bulb.jpg",
		link: "/notes/how-to-find-unique-ideas",
	},
];
