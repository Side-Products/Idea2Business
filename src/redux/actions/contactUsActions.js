import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_CONTACT_US_MESSAGE_REQUEST,
	NEW_CONTACT_US_MESSAGE_SUCCESS,
	NEW_CONTACT_US_MESSAGE_FAIL,
	ADMIN_GET_CONTACT_US_MESSAGES_REQUEST,
	ADMIN_GET_CONTACT_US_MESSAGES_SUCCESS,
	ADMIN_GET_CONTACT_US_MESSAGES_FAIL,
	ADMIN_DELETE_CONTACT_US_MESSAGE_REQUEST,
	ADMIN_DELETE_CONTACT_US_MESSAGE_SUCCESS,
	ADMIN_DELETE_CONTACT_US_MESSAGE_FAIL,
	CLEAR_ERRORS,
} from "../constants/contactUsConstants";

// Add new contact us message
export const newContactUsMessage = (contactUsMessageInfo) => async (dispatch) => {
	try {
		dispatch({ type: NEW_CONTACT_US_MESSAGE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(`/api/contact-us`, contactUsMessageInfo, config);

		dispatch({ type: NEW_CONTACT_US_MESSAGE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_CONTACT_US_MESSAGE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get contact us messages
export const adminGetContactUsMessages = (req) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_CONTACT_US_MESSAGES_REQUEST });

		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};
		const { data } = await axios.get(`${origin}/api/admin/contact-us`, config);

		dispatch({ type: ADMIN_GET_CONTACT_US_MESSAGES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ADMIN_GET_CONTACT_US_MESSAGES_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin delete contact us message
export const adminDeleteContactUsMessage = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_CONTACT_US_MESSAGE_REQUEST });

		const { data } = await axios.delete(`/api/admin/contact-us/${id}`);

		dispatch({ type: ADMIN_DELETE_CONTACT_US_MESSAGE_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_CONTACT_US_MESSAGE_FAIL,
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
