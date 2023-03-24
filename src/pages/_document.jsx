import { Html, Head, Main, NextScript } from "next/document";
import { DefaultSeo } from "next-seo";
import { SEO } from "@/config/next-seo.config";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="apple-touch-icon" href="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="theme-color" content="#fff" />

				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css" />
				{/* Google Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>

				<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap" rel="stylesheet" />

				<meta property="og:title" content="Project2Product" key="title" />
				<meta property="og:description" content="Transforming your side-projects and hackathon-projects into profitable products" key="description" />

				{/* Parallax Text */}
				<link href="https://fonts.googleapis.com/css2?family=Plaster&display=swap" rel="stylesheet" />
			</Head>
			<DefaultSeo {...SEO} />

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
