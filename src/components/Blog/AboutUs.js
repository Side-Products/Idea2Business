import BlogContent from "./BlogContent";
import BlogNoteContent from "./BlogNoteContent";
import BlogSubHeading from "./BlogSubHeading";
import BlogLink from "./BlogLink";
import { product_name, product_url, contact_email, twitter_url, linkedin_url } from "@/config/constants";

const AboutUs = () => (
	<div>
		<div className="mt-10 flex text-4xl justify-center text-dark-100 tracking-widest">...</div>
		<BlogSubHeading>About Us</BlogSubHeading>
		<BlogContent>
			<BlogLink link={product_url}>{product_name}</BlogLink> helps you transform your idea into a profitable business. You just need to enter your idea,
			and Idea2Business will help you turn it into a successful venture.
		</BlogContent>
		<BlogNoteContent>
			Visit our <BlogLink link={product_url}>website</BlogLink>. Follow us on <BlogLink link={twitter_url}>Twitter</BlogLink> and{" "}
			<BlogLink link={linkedin_url}>LinkedIn</BlogLink>.
		</BlogNoteContent>
		<BlogContent>
			Reach out to us at: <BlogLink link={"mailto:" + contact_email}>{contact_email}</BlogLink>
		</BlogContent>
	</div>
);

export default AboutUs;
