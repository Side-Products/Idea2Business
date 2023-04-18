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
/************************    Card Information   ***************************/
/**************************************************************************/
// Do not change identifier property of the objects in these arrays
// Do not remove any object from these arrays. Only add `hidden: true` to the object to hide it from the generate & pricing page
export const pitches = [
	{
		cardText: "Pitch to Onboard Potential Co-Founder",
		identifier: "coFounderPitch",
		subscriptionPlanRequired: freePlan,
		prompt: `Write me a pitch to a potential future co-founder if they would be interested in joining me on a startup journey. Write a comprehensive answer to convince them. Following is my startup:`,
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
