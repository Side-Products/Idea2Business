import { useState, createContext } from "react";

const defaultErrorState = {
	title: "",
	message: "",
	showErrorBox: false,
};
const defaultSuccessState = {
	title: "",
	message: "",
	showSuccessBox: false,
};

const defaultContext = {
	error: defaultErrorState,
	setError: () => {},
	success: defaultSuccessState,
	setSuccess: () => {},
};
export const StatusContext = createContext(defaultContext);

function StatusContextProvider({ children }) {
	const [error, setError] = useState(defaultErrorState);
	const [success, setSuccess] = useState(defaultSuccessState);

	return <StatusContext.Provider value={{ error, success, setSuccess, setError }}>{children}</StatusContext.Provider>;
}

export default StatusContextProvider;
