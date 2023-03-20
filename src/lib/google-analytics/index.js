export const pageview = (url) => {
	window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, { path_url: url });
};
