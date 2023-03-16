import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_PROJECT_SEARCH_REQUEST,
	NEW_PROJECT_SEARCH_SUCCESS,
	NEW_PROJECT_SEARCH_FAIL,
	ALL_PROJECTS_SUCCESS,
	ALL_PROJECTS_FAIL,
	MY_PROJECTS_SUCCESS,
	MY_PROJECTS_FAIL,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/projectConstants";

// Add new project search
export const newProjectSearch = (projectInfo) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PROJECT_SEARCH_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/projects`, projectInfo, config);

		dispatch({ type: NEW_PROJECT_SEARCH_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_PROJECT_SEARCH_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get all projects
export const getAllProjects =
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

// Get my projects
export const getMyProjects =
	(req, currentPage = 1, search = "") =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);
			const config = {
				headers: {
					cookie: req.headers.cookie,
				},
			};
			const { data } = await axios.get(`${origin}/api/projects/me?page=${currentPage}&search=${search}`, config);

			dispatch({
				type: MY_PROJECTS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: MY_PROJECTS_FAIL,
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
