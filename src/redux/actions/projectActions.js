import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { ALL_PROJECTS_SUCCESS, ALL_PROJECTS_FAIL, PROJECT_DETAILS_SUCCESS, PROJECT_DETAILS_FAIL, CLEAR_ERRORS } from "../constants/projectConstants";

// Get all projects
export const getProjects =
	(req, currentPage = 1, search = "") =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);
			const { data } = await axios.get(`${origin}/api/projects?page=${currentPage}&search=${search}`);

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

// Get project details
export const getProjectDetails = (req, id) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);
		const { data } = await axios.get(`${origin}/api/projects/${id}`);

		dispatch({
			type: PROJECT_DETAILS_SUCCESS,
			payload: data.project,
		});
	} catch (error) {
		dispatch({
			type: PROJECT_DETAILS_FAIL,
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
