import { useState, createContext } from "react";

const defaultState = false;

const defaultContext = {
	authModalOpen: defaultState,
	setAuthModalOpen: () => {},
};
export const AuthModalContext = createContext(defaultContext);

function AuthModalContextProvider({ children }) {
	const [authModalOpen, setAuthModalOpen] = useState(defaultState);

	return <AuthModalContext.Provider value={{ authModalOpen, setAuthModalOpen }}>{children}</AuthModalContext.Provider>;
}

export default AuthModalContextProvider;
