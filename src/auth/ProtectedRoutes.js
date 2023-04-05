import { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { appRoutes } from "./constants";
import { LoadingContext } from "@/store/LoadingContextProvider";

// Check if user is on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes = ({ router, children }) => {
	const { setLoading } = useContext(LoadingContext);
	const { data: session, status } = useSession();

	// Identify authenticated user
	const isAuthenticated = session && status === "authenticated" && session.user;

	// Three cases for users:
	// 1. Unauthenticated
	// 2. Authenticated but email not verified
	// 3. Authenticated and email verified

	// Three types of users based on session.user.role:
	// 1. user
	// 2. allAccess
	// 3. admin

	// session.user.role == "admin";
	// session.user.role == "allAccess";

	// @dev These routes are protected for unauthenticated users
	const protectedRoutes = [appRoutes.REGISTER, appRoutes.SETTINGS, appRoutes.CREATE_NFT, appRoutes.CREATE_BAND];
	/**
	 * @const pathIsProtected Checks if path exists in the protectedRoutes array
	 */
	const pathIsProtected = protectedRoutes.some((route) => router.pathname.includes(route));

	// @dev These routes are protected until a user confirms their email
	const protectedRoutesForAuthenticatedUserEmailUnverified = [appRoutes.REGISTER, appRoutes.CREATE_NFT, appRoutes.CREATE_BAND];
	/**
	 * @const pathIsProtectedForAuthenticatedUserEmailUnverified Checks if path exists in the protectedRoutesForAuthenticatedUserEmailUnverified array
	 */
	const pathIsProtectedForAuthenticatedUserEmailUnverified = protectedRoutesForAuthenticatedUserEmailUnverified.some((route) =>
		router.pathname.includes(route)
	);

	// @dev These routes are protected for a logged in user who is not an artist
	const protectedRoutesForCollectors = [appRoutes.CREATE_NFT, appRoutes.CREATE_BAND];
	/**
	 * @const pathIsProtectedForCollector Checks if path exists in the protectedRoutesForCollectors array
	 */
	const pathIsProtectedForCollector = protectedRoutesForCollectors.some((route) => router.pathname.includes(route));

	// @dev These routes are protected for a logged in user
	const protectedRoutesForAuthenticatedUser = [appRoutes.REGISTER];
	/**
	 * @const pathIsProtectedForAuthenticatedUser Checks if path exists in the protectedRoutesForAuthenticatedUser array
	 */
	const pathIsProtectedForAuthenticatedUser = protectedRoutesForAuthenticatedUser.some((route) => router.pathname.includes(route));

	async function refetchUserData() {}

	useEffect(() => {
		function checkPath() {
			// Not authenticated
			if (!isAuthenticated) {
				if (isBrowser() && pathIsProtected) {
					router.push(appRoutes.HOMEPAGE);
				}
			}
			// Authenticated
			else {
				refetchUserData();
				// if (isBrowser() && (!user.attributes.email || !user.attributes.name)) {
				// 	if (!router.pathname.startsWith(appRoutes.REGISTER)) router.push(appRoutes.REGISTER);
				// } else if (isBrowser() && pathIsProtectedForAuthenticatedUserEmailUnverified && !user.attributes.emailVerified) {
				// 	router.push(appRoutes.CONFIRM_EMAIL);
				// } else if (isBrowser() && !user.attributes.isArtist && pathIsProtectedForCollector) {
				// 	router.push(appRoutes.MARKETPLACE);
				// } else if (isBrowser() && pathIsProtectedForAuthenticatedUser) {
				// 	router.push(appRoutes.HOMEPAGE);
				// }
			}

			setLoading({ status: false });
		}
		checkPath();
	}, [router.pathname, isAuthenticated]);

	return children;
};

export default ProtectedRoutes;
