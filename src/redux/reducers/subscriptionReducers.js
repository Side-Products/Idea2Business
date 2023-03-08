import { MY_SUBSCRIPTION_SUCCESS, MY_SUBSCRIPTION_FAIL, CLEAR_ERRORS } from "../constants/subscriptionConstants";

// My subscription reducer
export const mySubscriptionReducer = (state = { subscription: [] }, action) => {
	switch (action.type) {
		case MY_SUBSCRIPTION_SUCCESS:
			return {
				loading: false,
				subscription: action.payload,
			};
		case MY_SUBSCRIPTION_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
