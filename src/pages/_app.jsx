import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import * as ga from "@/lib/google-analytics";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { SEO } from "@/config/next-seo.config";
import ProtectedRoutes from "@/auth/ProtectedRoutes";
import ScrollToPageTop from "@/utils/ScrollToPageTop";
import Layout from "@/layout/Layout";
import { wrapper } from "@/redux/redux-store";
import StatusContextProvider from "@/store/StatusContextProvider";
import LoadingContextProvider from "@/store/LoadingContextProvider";
import AuthModalContextProvider from "@/store/AuthModalContextProvider";

function App({ Component, pageProps, session, router }) {
	// Google Analytics
	useEffect(() => {
		const handleRouteChange = (url) => {
			ga.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete");
		};
	}, [router.events]);

	return (
		<>
			{/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
				strategy="afterInteractive"
				onError={(err) => {}}
			/>
			<Script id="google-analytics" strategy="afterInteractive" onError={(err) => {}}>
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                    });
                `}
			</Script>

			<Script src="https://kit.fontawesome.com/8f4546bba1.js" crossOrigin="anonymous"></Script>
			<Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></Script>

			<SessionProvider session={session}>
				<ProtectedRoutes router={router}>
					<LoadingContextProvider>
						<AuthModalContextProvider>
							<StatusContextProvider>
								<Layout>
									<ScrollToPageTop />
									<DefaultSeo {...SEO} />
									<Component {...pageProps} />
								</Layout>
							</StatusContextProvider>
						</AuthModalContextProvider>
					</LoadingContextProvider>
				</ProtectedRoutes>
			</SessionProvider>
		</>
	);
}
export default wrapper.withRedux(App);
