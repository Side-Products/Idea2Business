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
	const isAuthenticated = session && status == "authenticated" && session.user;
	const isEmailVerified = session && status == "authenticated" && session.user && session.user.emailVerified;

	// Three cases for users:
	// 1. Unauthenticated
	// 2. Authenticated but email not verified
	// 3. Authenticated and email verified

	// Three types of users based on session.user.role:
	// 1. user
	// 2. allAccess
	// 3. admin

	// @dev These routes are protected for unauthenticated users
	const protectedRoutes = [appRoutes.ADMIN, appRoutes.PROFILE];
	/**
	 * @const pathIsProtected Checks if path exists in the protectedRoutes array
	 */
	const pathIsProtected = protectedRoutes.some((route) => router.pathname.includes(route));

	// @dev These routes are protected for a logged in user
	const protectedRoutesForAuthenticatedUser = [appRoutes.SIGNUP, appRoutes.LOGIN];
	/**
	 * @const pathIsProtectedForAuthenticatedUser Checks if path exists in the protectedRoutesForAuthenticatedUser array
	 */
	const pathIsProtectedForAuthenticatedUser = protectedRoutesForAuthenticatedUser.some((route) => router.pathname.includes(route));

	// @dev These routes are protected until a user confirms their email
	const protectedRoutesForAuthenticatedUserEmailUnverified = [appRoutes.ADMIN];
	/**
	 * @const pathIsProtectedForAuthenticatedUserEmailUnverified Checks if path exists in the protectedRoutesForAuthenticatedUserEmailUnverified array
	 */
	const pathIsProtectedForAuthenticatedUserEmailUnverified = protectedRoutesForAuthenticatedUserEmailUnverified.some((route) =>
		router.pathname.includes(route)
	);

	// @dev These routes are protected for authenticated users having role user
	const protectedRoutesForRoleUser = [appRoutes.ADMIN];
	/**
	 * @const pathIsProtectedForRoleUser Checks if path exists in the protectedRoutesForRoleUser array
	 */
	const pathIsProtectedForRoleUser = protectedRoutesForRoleUser.some((route) => router.pathname.includes(route));

	// @dev These routes are protected for authenticated users having role allAccess
	const protectedRoutesForRoleAllAccess = [appRoutes.ADMIN];
	/**
	 * @const pathIsProtectedForRoleAllAccess Checks if path exists in the protectedRoutesForRoleAllAccess array
	 */
	const pathIsProtectedForRoleAllAccess = protectedRoutesForRoleAllAccess.some((route) => router.pathname.includes(route));

	// @dev These routes are protected for authenticated users having role admin
	const protectedRoutesForRoleAdmin = [];
	/**
	 * @const pathIsProtectedForRoleAdmin Checks if path exists in the protectedRoutesForRoleAdmin array
	 */
	const pathIsProtectedForRoleAdmin = protectedRoutesForRoleAdmin.some((route) => router.pathname.includes(route));

	useEffect(() => {
		function checkPath() {
			// Not authenticated
			if (!isAuthenticated) {
				if (isBrowser() && pathIsProtected) {
					router.push(appRoutes.HOMEPAGE);
				}
			}
			// Authenticated
			// else {
			// 	if (isBrowser() && pathIsProtectedForAuthenticatedUser) {
			// 		router.push(appRoutes.HOMEPAGE);
			// 	} else if (isBrowser() && pathIsProtectedForAuthenticatedUserEmailUnverified && !isEmailVerified) {
			// 		router.push(appRoutes.PROFILE);
			// 	}
			// 	// isEmailVerified and route is protected for role
			// 	else if (isBrowser() && pathIsProtectedForRoleUser && session && session.user && session.user.role == "user") {
			// 		router.push(appRoutes.GENERATE);
			// 	} else if (isBrowser() && pathIsProtectedForRoleAllAccess && session && session.user && session.user.role == "allAccess") {
			// 		router.push(appRoutes.GENERATE);
			// 	} else if (isBrowser() && pathIsProtectedForRoleAdmin && session && session.user && session.user.role == "admin") {
			// 		router.push(appRoutes.PROFILE);
			// 	}
			// }

			setLoading({ status: false });
		}
		checkPath();
	}, [router.pathname, isAuthenticated, isEmailVerified]);

	return children;
};

export default ProtectedRoutes;
