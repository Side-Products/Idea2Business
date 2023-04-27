import { product_name, product_url, meta_description, twitter_handle } from "./constants";

export const SEO = {
	title: undefined,
	titleTemplate: `${product_name} | %s`,
	defaultTitle: product_name,
	description: meta_description,
	canonical: product_url,
	openGraph: {
		siteName: product_name,
		url: product_url,
		title: product_name,
		description: meta_description,
		images: [{ url: `${product_url}/logo.png`, width: 640, height: 640, alt: "Logo" }],
	},
	twitter: {
		handle: twitter_handle,
		creator: twitter_handle,
		site: twitter_handle,
		cardType: "summary_large_image",
	},
};
