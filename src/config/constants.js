/**************************************************************************/
/**************************    Product details   **************************/
/**************************************************************************/
export const product_name = "Idea2Business";
export const product_website = "https://www.idea2business.xyz";
export const contact_email = "team@idea2business.xyz";
export const company_name = "Musixverse Technologies Pvt. Ltd.";

export const twitter_url = "https://twitter.com/_idea2business";
export const linkedin_url = "https://www.linkedin.com/company/idea-2-business";

/**************************************************************************/
/**********************    SEO Meta Descriptions   ************************/
/**************************************************************************/
export const title_main_page = "Idea2Business";
export const meta_description =
	"Transforming your side-projects and hackathon-projects into profitable products. Just enter your project name and project description, Idea2Business will help you turn it into a successful venture.";
export const reportabug_meta_description =
	"Feedback is vital to make our services even better. With bug reporting forms, email, and discord server, it's easy to report issues you encounter and request enhancements to any services or functionalities on our platform. You'll directly influence the platform's development and building of the future of the music industry.";
export const contactus_meta_description =
	"Just send us your questions or concerns by filling out the shortest contact form you've ever seen and we will give you the help you need. Start Here.";
export const aboutus_meta_description =
	"Musixverse is how music should be: driven by the relationship between fans and artists. We’re creating a platform for a more collaborative music movement, built on web3 technology and values. On Musixverse, Fans support Artists they love directly and stake their claim on being there before everyone else.";
export const privacy_meta_description =
	"This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information.";

/**************************************************************************/
/************************    Card Information   ***************************/
/**************************************************************************/
export const pitches = [
	{
		cardText: "Pitch to Onboard Potential Co-Founder",
		isGeneratingText: "coFounderPitch",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Pitch to Get Yourself a Mentor",
		isGeneratingText: "mentorPitch",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Email Pitch to VC",
		isGeneratingText: "emailPitchToVc",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Pitch to Onboard Potential Advisor (Marketing)",
		isGeneratingText: "marketingAdvisorPitch",
		subscriptionPlanRequired: "Standard",
	},
];

export const understandingPotentialUsers = [
	{
		cardText: "User Persona",
		isGeneratingText: "userPersona",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Mom Test: How to talk to initial customers",
		isGeneratingText: "momTest",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Type of Potential Customers",
		isGeneratingText: "potentialCustomers",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Customer Pain Points",
		isGeneratingText: "customerPainPoints",
		subscriptionPlanRequired: "Pro Plus",
	},
];

export const socialMediaStrategy = [
	{
		cardText: "Twitter Strategy",
		isGeneratingText: "twitterStrategy",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Instagram Strategy",
		isGeneratingText: "instagramStrategy",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "LinkedIn Strategy",
		isGeneratingText: "linkedinStrategy",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "TikTok/Reels/Shorts Strategy",
		isGeneratingText: "tiktokStrategy",
		subscriptionPlanRequired: "Pro Plus",
	},
];

export const adviceFromBooks = [
	{
		cardText: "Advice from the book: The Lean Startup",
		isGeneratingText: "leanStartup",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Advice from the book: Hooked",
		isGeneratingText: "hooked",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Advice from the book: The Hard Thing About Hard Things",
		isGeneratingText: "hardThingAboutHardThings",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "Advice from the book: The Startup Owner’s Manual",
		isGeneratingText: "startupOwnersManual",
		subscriptionPlanRequired: "Pro Plus",
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
		isGeneratingText: "expectedInvestorQuestions",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "10 personal tips & tricks to nail your pitch",
		isGeneratingText: "personalTipsAndTricksToNailYourPitch",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "What is your revenue model and how do you plan to generate sustainable revenue over the long term?",
		isGeneratingText: "revenueModel",
		subscriptionPlanRequired: "Pro Plus",
	},
	{
		cardText: "What is your exit strategy, and how do you plan to create value for investors?",
		isGeneratingText: "exitStrategy",
		subscriptionPlanRequired: "Pro Plus",
	},
];

export const bonusContent = [
	{
		cardText: "SPME (Strategy, Positioning, Messaging, Experimentations): Marketing for solopreneurs",
		isGeneratingText: "spme",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "MVP Launch Checklist",
		isGeneratingText: "mvpLaunchChecklist",
		subscriptionPlanRequired: "Free",
	},
	{
		cardText: "How to build a team",
		isGeneratingText: "howToBuildATeam",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Product Roadmap",
		isGeneratingText: "productRoadmap",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Social Media Calendar",
		isGeneratingText: "socialMediaCalendar",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Ideal Customer Profile (ICP)",
		isGeneratingText: "idealCustomerProfile",
		subscriptionPlanRequired: "Standard",
	},
	{
		cardText: "Grant Proposal",
		isGeneratingText: "grantProposal",
		subscriptionPlanRequired: "Pro Plus",
	},
	{
		cardText: "Legal Advice",
		isGeneratingText: "legalAdvice",
		subscriptionPlanRequired: "Pro Plus",
	},
];

export const decks = [
	{
		cardText: "PitchDeck",
		isGeneratingText: "pitchDeck",
		subscriptionPlanRequired: "Pro Plus",
	},
];

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
				Our personalized suggestions are very good but we can't promise that you won't have to do more work. That is also not the goal. We aim to get
				you into action mode and kickstart your pitch deck and funding journey. Go get'em tiger! 🫡
			</p>
		),
		content_id: "collapseFive",
		content_heading: "headingFive",
	},
];
