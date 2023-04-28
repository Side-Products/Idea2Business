import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_NEWSLETTER_REQUEST,
	NEW_NEWSLETTER_SUCCESS,
	NEW_NEWSLETTER_FAIL,
	ADMIN_GET_NEWSLETTERS_REQUEST,
	ADMIN_GET_NEWSLETTERS_SUCCESS,
	ADMIN_GET_NEWSLETTERS_FAIL,
	ADMIN_DELETE_NEWSLETTER_REQUEST,
	ADMIN_DELETE_NEWSLETTER_SUCCESS,
	ADMIN_DELETE_NEWSLETTER_FAIL,
	CLEAR_ERRORS,
} from "../constants/newsletterConstants";

// Add new newsletter
export const newNewsletter = (newsletterInfo) => async (dispatch) => {
	try {
		dispatch({ type: NEW_NEWSLETTER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(`/api/newsletter`, newsletterInfo, config);

		dispatch({ type: NEW_NEWSLETTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_NEWSLETTER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get newsletters
export const adminGetNewsletters = (req) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_NEWSLETTERS_REQUEST });

		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};
		const { data } = await axios.get(`${origin}/api/admin/newsletter`, config);

		dispatch({ type: ADMIN_GET_NEWSLETTERS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ADMIN_GET_NEWSLETTERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin delete newsletter
export const adminDeleteNewsletter = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_NEWSLETTER_REQUEST });

		const { data } = await axios.delete(`/api/admin/newsletter/${id}`);

		dispatch({ type: ADMIN_DELETE_NEWSLETTER_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_NEWSLETTER_FAIL,
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
