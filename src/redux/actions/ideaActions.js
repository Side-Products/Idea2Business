import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_IDEA_SEARCH_REQUEST,
	NEW_IDEA_SEARCH_SUCCESS,
	NEW_IDEA_SEARCH_FAIL,
	ALL_IDEAS_SUCCESS,
	ALL_IDEAS_FAIL,
	MY_IDEAS_SUCCESS,
	MY_IDEAS_FAIL,
	IDEA_DETAILS_SUCCESS,
	IDEA_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/ideaConstants";

// Add new idea search
export const newIdeaSearch = (ideaInfo) => async (dispatch) => {
	try {
		dispatch({ type: NEW_IDEA_SEARCH_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/ideas`, ideaInfo, config);

		dispatch({ type: NEW_IDEA_SEARCH_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_IDEA_SEARCH_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get all ideas
export const getAllIdeas =
	(req, currentPage = 1, search = "") =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);
			const { data } = await axios.get(`${origin}/api/ideas?page=${currentPage}&search=${search}`);

			dispatch({
				type: ALL_IDEAS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ALL_IDEAS_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// Get my ideas
export const getMyIdeas =
	(req, currentPage = 1, search = "") =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);
			const config = {
				headers: {
					cookie: req.headers.cookie,
				},
			};
			const { data } = await axios.get(`${origin}/api/ideas/me?page=${currentPage}&search=${search}`, config);

			dispatch({
				type: MY_IDEAS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: MY_IDEAS_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// Get idea details
export const getIdeaDetails = (req, id) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);
		const { data } = await axios.get(`${origin}/api/ideas/${id}`);

		dispatch({
			type: IDEA_DETAILS_SUCCESS,
			payload: data.idea,
		});
	} catch (error) {
		dispatch({
			type: IDEA_DETAILS_FAIL,
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
