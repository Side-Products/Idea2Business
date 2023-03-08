import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { MY_SUBSCRIPTION_SUCCESS, MY_SUBSCRIPTION_FAIL, CLEAR_ERRORS } from "../constants/subscriptionConstants";

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

// Clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
