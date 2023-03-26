import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_FEATURE_REQUEST_REQUEST,
	NEW_FEATURE_REQUEST_SUCCESS,
	NEW_FEATURE_REQUEST_FAIL,
	ADMIN_GET_FEATURE_REQUESTS_REQUEST,
	ADMIN_GET_FEATURE_REQUESTS_SUCCESS,
	ADMIN_GET_FEATURE_REQUESTS_FAIL,
	ADMIN_DELETE_FEATURE_REQUEST_REQUEST,
	ADMIN_DELETE_FEATURE_REQUEST_SUCCESS,
	ADMIN_DELETE_FEATURE_REQUEST_FAIL,
	CLEAR_ERRORS,
} from "../constants/featureRequestConstants";

// Add new feature request
export const newFeatureRequest = (featureRequestInfo) => async (dispatch) => {
	try {
		dispatch({ type: NEW_FEATURE_REQUEST_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(`/api/feature-request`, featureRequestInfo, config);

		dispatch({ type: NEW_FEATURE_REQUEST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_FEATURE_REQUEST_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get feature requests
export const adminGetFeatureRequests = (req) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_FEATURE_REQUESTS_REQUEST });

		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};
		const { data } = await axios.get(`${origin}/api/admin/feature-request`, config);

		dispatch({ type: ADMIN_GET_FEATURE_REQUESTS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ADMIN_GET_FEATURE_REQUESTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin delete feature request
export const adminDeleteFeatureRequest = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_FEATURE_REQUEST_REQUEST });

		const { data } = await axios.delete(`/api/admin/feature-request/${id}`);

		dispatch({ type: ADMIN_DELETE_FEATURE_REQUEST_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_FEATURE_REQUEST_FAIL,
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
