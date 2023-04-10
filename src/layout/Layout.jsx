import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import ErrorBox from "@/components/ui/Toast/ErrorBox";
import SuccessBox from "@/components/ui/Toast/SuccessBox";
import Loading from "@/components/ui/Loading";
import AuthModal from "@/components/AuthModal";

const Layout = ({ children }) => {
	const { setLoading } = useContext(LoadingContext);
	const { authModalOpen, setAuthModalOpen } = useContext(AuthModalContext);

	const router = useRouter();
	// Loading on page change
	useEffect(() => {
		if (router && router.events) {
			router.events.on("routeChangeStart", () => setLoading((prevState) => ({ ...prevState, status: true })));
			router.events.on("routeChangeComplete", () => setLoading((prevState) => ({ ...prevState, status: false })));
			router.events.on("routeChangeError", () => setLoading((prevState) => ({ ...prevState, status: false })));
		}
	}, [router.events, setLoading]);

	const { data: session, status } = useSession();
	// Identify authenticated user
	const isAuthenticated = session && status == "authenticated" && session.user;
	useEffect(() => {
		if (router.query && "login" in router.query) {
			if (isAuthenticated) setAuthModalOpen(false);
			else setAuthModalOpen(true);
		} else if (router.query && "signup" in router.query) {
			if (isAuthenticated) setAuthModalOpen(false);
			else setAuthModalOpen(true);
		} else {
			setAuthModalOpen(false);
		}
	}, [router.query, isAuthenticated]);

	return (
		<>
			<Navbar setAuthModalOpen={setAuthModalOpen} />
			<AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
			{children}
			<Loading />
			<ErrorBox />
			<SuccessBox />
			{router.pathname !== "/404" && router.pathname !== "/_offline" && <Footer />}
		</>
	);
};

export default Layout;
