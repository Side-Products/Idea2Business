const product_url = "https://idea2business.xyz";

module.exports = {
	siteUrl: product_url,
	generateRobotsTxt: true,
	exclude: ["/admin/*"],
	robotsTxtOptions: {
		policies: [
			{ userAgent: "*", disallow: "/admin/*" },
			{ userAgent: "*", allow: "/" },
		],
	},
};
