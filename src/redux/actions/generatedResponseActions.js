import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	ALL_GENERATED_RESPONSES_SUCCESS,
	ALL_GENERATED_RESPONSES_FAIL,
	ADMIN_DELETE_GENERATED_RESPONSE_REQUEST,
	ADMIN_DELETE_GENERATED_RESPONSE_SUCCESS,
	ADMIN_DELETE_GENERATED_RESPONSE_FAIL,
	CLEAR_ERRORS,
} from "../constants/generatedResponseConstants";

// Get all generated responses
export const getAllGeneratedResponses =
	(req, currentPage = 1, search = "") =>
	async (dispatch) => {
		try {
			const { origin } = absoluteUrl(req);
			const config = {
				headers: {
					cookie: req.headers.cookie,
				},
			};
			const { data } = await axios.get(`${origin}/api/admin/generated-response?page=${currentPage}&search=${search}`, config);

			dispatch({
				type: ALL_GENERATED_RESPONSES_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ALL_GENERATED_RESPONSES_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// Admin delete generated response
export const adminDeleteGeneratedResponse = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_GENERATED_RESPONSE_REQUEST });

		const { data } = await axios.delete(`/api/admin/generated-response/${id}`);

		dispatch({ type: ADMIN_DELETE_GENERATED_RESPONSE_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_GENERATED_RESPONSE_FAIL,
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
