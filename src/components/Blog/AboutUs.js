import BlogContent from "./BlogContent";
import BlogNoteContent from "./BlogNoteContent";
import BlogSubHeading from "./BlogSubHeading";
import BlogLink from "./BlogLink";

const AboutUs = () => (
	<div>
		<div className="flex text-4xl justify-center text-dark-100 tracking-widest">...</div>
		<BlogSubHeading>About Us</BlogSubHeading>
		<BlogContent>
			<BlogLink link="https://musixverse.com/">Musixverse</BlogLink> aims to power music ownership and distribution across the web and beyond, and in the
			process empower artists and fans alike. Musixverse is more than just an NFT marketplace for musicians and fans.
			<br />
			<br />
			It enables talent discovery, provides tools to propel growth, and uplifts musicians by enabling them to create NFTs of their music and provide them
			with royalties and recognition that they deserve.
			<br />
			<br />
			Musixverse is here to disrupt the music industry!
		</BlogContent>
		<BlogNoteContent>
			Visit our <BlogLink link="https://musixverse.com/">website</BlogLink>. Follow us on{" "}
			<BlogLink link="https://twitter.com/musixverse">Twitter</BlogLink>, <BlogLink link="https://www.linkedin.com/company/musomatic/">LinkedIn</BlogLink>
			, and <BlogLink link="https://www.instagram.com/musixverse/">Instagram</BlogLink>. Join our{" "}
			<BlogLink link="https://discord.com/invite/rXKb7rCqjG">Discord community</BlogLink>.
		</BlogNoteContent>
		<BlogContent>
			Contact Us: <BlogLink link="mailto:contact@musixverse.com">contact@musixverse.com</BlogLink>
		</BlogContent>
	</div>
);

export default AboutUs;
