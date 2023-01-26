import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import "@/styles/styles.css";
import ScrollToPageTop from "@/utils/ScrollToPageTop";
import Layout from "@/layout/WrapLayout/Layout";
import StatusContext from "@/store/status-context";
import LoadingContext from "@/store/loading-context";
import AuthModalContext from "@/store/authModal-context";

function App({ Component, pageProps, session }) {
	const [isLoading, setLoading] = useState({
		status: false,
		title: "",
		message: "",
		showProgressBar: false,
		progress: 0,
	});
	const [error, setError] = useState({
		title: "",
		message: "",
		showErrorBox: false,
	});
	const [success, setSuccess] = useState({
		title: "",
		message: "",
		showSuccessBox: false,
	});
	const [authModalOpen, setAuthModalOpen] = useState(false);

	return (
		<>
			<Script src="https://kit.fontawesome.com/8f4546bba1.js" crossOrigin="anonymous"></Script>
			<Script 
            strategy="afterInteractive" 
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            onError={(err) => {
              console.error("Google Tag Manager Script Error:", err);
            }}
          	></Script>
			<Script id="google-analytics" strategy="afterInteractive" onError={(err) => {}}>
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
			</Script>
			
			<SessionProvider session={session}>
				<LoadingContext.Provider value={[isLoading, setLoading]}>
					<AuthModalContext.Provider value={[authModalOpen, setAuthModalOpen]}>
						<StatusContext.Provider value={[error, success, setSuccess, setError]}>
							<Layout>
								<ScrollToPageTop />
								<Component {...pageProps} />
							</Layout>
						</StatusContext.Provider>
					</AuthModalContext.Provider>
				</LoadingContext.Provider>
			</SessionProvider>
		</>
	);
}
export default App;
