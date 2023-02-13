import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { ALL_PROJECTS_SUCCESS, ALL_PROJECTS_FAIL, CLEAR_ERRORS } from "../constants/projectConstants";

// Get all projects
export const getProjects = (req) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);
		const { data } = await axios.get(`${origin}/api/project-search`);

		dispatch({
			type: ALL_PROJECTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_PROJECTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
