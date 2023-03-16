import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	MY_SUBSCRIPTION_SUCCESS,
	MY_SUBSCRIPTION_FAIL,
	ADMIN_GET_SUBSCRIPTIONS_REQUEST,
	ADMIN_GET_SUBSCRIPTIONS_SUCCESS,
	ADMIN_GET_SUBSCRIPTIONS_FAIL,
	ADMIN_DELETE_SUBSCRIPTION_REQUEST,
	ADMIN_DELETE_SUBSCRIPTION_SUCCESS,
	ADMIN_DELETE_SUBSCRIPTION_FAIL,
	CLEAR_ERRORS,
} from "../constants/subscriptionConstants";

// My subscription
export const mySubscription = (req) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};
		const { data } = await axios.get(`${origin}/api/subscriptions/me`, config);
		dispatch({ type: MY_SUBSCRIPTION_SUCCESS, payload: data.subscription[0] ?? null });
	} catch (error) {
		dispatch({
			type: MY_SUBSCRIPTION_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get subscriptions
export const adminGetSubscriptions = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_SUBSCRIPTIONS_REQUEST });

		const { data } = await axios.get(`/api/admin/subscriptions`);

		dispatch({ type: ADMIN_GET_SUBSCRIPTIONS_SUCCESS, payload: data.subscriptions });
	} catch (error) {
		dispatch({
			type: ADMIN_GET_SUBSCRIPTIONS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin delete subscription
export const adminDeleteSubscription = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_SUBSCRIPTION_REQUEST });

		const { data } = await axios.delete(`/api/admin/subscriptions/${id}`);

		dispatch({ type: ADMIN_DELETE_SUBSCRIPTION_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_SUBSCRIPTION_FAIL,
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
