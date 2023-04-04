import { useState, createContext } from "react";

const defaultState = {
	status: false,
	section: false,
	title: "",
	message: "",
	waitMessage: "",
	showProgressBar: false,
	progress: 0,
};

const defaultContext = {
	loading: defaultState,
	setLoading: () => {},
};
export const LoadingContext = createContext(defaultContext);

function LoadingContextProvider({ children }) {
	const [loading, setLoading] = useState(defaultState);

	return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
}

export default LoadingContextProvider;
