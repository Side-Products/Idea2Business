import { Html, Head, Main, NextScript } from "next/document";
import { product_name, meta_description } from "@/config/constants";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/icon.png" />
				<link rel="shortcut icon" href="/favicon.ico" />

				{/* PWA */}
				<meta name="application-name" content={product_name} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content={product_name} />
				<meta name="description" content={meta_description} />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				<meta name="msapplication-TileColor" content="#000000" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#000000" />

				<link rel="apple-touch-icon" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="167x167" href="/icon.png" />

				<link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
				<link rel="mask-icon" href="/icon.png" color="#000000" />

				{/* Tailwind Elements */}
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css" />

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
				{/* Font for Parallax Text */}
				<link href="https://fonts.googleapis.com/css2?family=Plaster&display=swap" rel="stylesheet" />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
