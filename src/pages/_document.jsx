import { Html, Head, Main, NextScript } from "next/document";
import { DefaultSeo } from "next-seo";
import SEO from "@/config/next-seo.config";
import { title_main_page, meta_description } from "@/config/constants";

export default function Document() {
	return (
		<Html>
			<Head>
				<title>{title_main_page}</title>
				<meta name="description" content={meta_description} />

				<meta property="og:title" content="Project2Product" key="title" />
				<meta property="og:description" content="Transforming your side-projects and hackathon-projects into profitable products" key="description" />
			</Head>
			<DefaultSeo {...SEO} />

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
