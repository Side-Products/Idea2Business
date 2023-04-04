import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { AuthModalContext } from "@/store/AuthModalContextProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBox from "@/components/ui/Toast/ErrorBox";
import SuccessBox from "@/components/ui/Toast/SuccessBox";
import Loading from "@/components/ui/Loading";
import AuthModal from "@/components/ui/Modal/AuthModal";

const Layout = ({ children }) => {
	const { setLoading } = useContext(LoadingContext);
	const { authModalOpen, setAuthModalOpen } = useContext(AuthModalContext);

	const router = useRouter();

	useEffect(() => {
		if (router && router.events) {
			router.events.on("routeChangeStart", () => setLoading((prevState) => ({ ...prevState, status: true })));
			router.events.on("routeChangeComplete", () => setLoading((prevState) => ({ ...prevState, status: false })));
			router.events.on("routeChangeError", () => setLoading((prevState) => ({ ...prevState, status: false })));
		}
	}, [router.events, setLoading]);

	useEffect(() => {
		if (router.query && "login" in router.query) {
			setAuthModalOpen(true);
		} else if (router.query && "signup" in router.query) {
			setAuthModalOpen(true);
		} else {
			setAuthModalOpen(false);
		}
	}, [router.query]);

	return (
		<>
			<Navbar setAuthModalOpen={setAuthModalOpen} />
			<AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
			{children}
			<Loading />
			<ErrorBox />
			<SuccessBox />
			{router.pathname !== "/404" && <Footer />}
		</>
	);
};

export default Layout;
