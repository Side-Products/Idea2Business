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
export const subscriptionPlans = {
	1: {
		freeSubscription: { text: "Free", price: 0 },
		standardSubscription: { text: "Standard", price: 5, validForDays: 7 },
		proPlusSubscription: { text: "Pro Plus", price: 10, validForDays: 30 },
	},
	// 2: {
	// 	freeSubscription: { text: freePlan, price: 0 },
	// 	standardSubscription: { text: standardPlan, price: 2, validForDays: 7 },
	// 	proPlusSubscription: { text: proPlusPlan, price: 5, validForDays: 30 },
	// },
};

/**************************************************************************/
/******************************    FAQs   *********************************/
/**************************************************************************/
import Link from "next/link";

export const Faqs = [
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
		body: "Nope! The pitch deck templates, investor questions, and tips & tricks are written by AI and they are 100% original. That means that the content of every PDF we generate and deliver is unique and tailored specifically for you and the startup you are building. You can use this content any way you want.",
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
// Changing the order of the objects in these arrays will affect their functioning on generate page
// Do not change the order of the objects in these arrays
// Do not change identifier property of the objects in these arrays
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
		loadingMessage: "User Personas for your idea is being generated",
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
	investorMeetingPrep,
	bonusContent,
};
