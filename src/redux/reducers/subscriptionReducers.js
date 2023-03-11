import {
	MY_SUBSCRIPTION_SUCCESS,
	MY_SUBSCRIPTION_FAIL,
	ADMIN_GET_SUBSCRIPTIONS_REQUEST,
	ADMIN_GET_SUBSCRIPTIONS_SUCCESS,
	ADMIN_GET_SUBSCRIPTIONS_FAIL,
	ADMIN_DELETE_SUBSCRIPTION_REQUEST,
	ADMIN_DELETE_SUBSCRIPTION_SUCCESS,
	ADMIN_DELETE_SUBSCRIPTION_FAIL,
	ADMIN_DELETE_SUBSCRIPTION_RESET,
	CLEAR_ERRORS,
} from "../constants/subscriptionConstants";

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

// Admin get subscriptions reducer
export const adminGetSubscriptionsReducer = (state = { subscriptions: [] }, action) => {
	switch (action.type) {
		case ADMIN_GET_SUBSCRIPTIONS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_GET_SUBSCRIPTIONS_SUCCESS:
			return {
				loading: false,
				subscriptions: action.payload,
			};
		case ADMIN_GET_SUBSCRIPTIONS_FAIL:
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

// Admin delete subscription reducer
export const adminDeleteSubscriptionReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_SUBSCRIPTION_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_SUBSCRIPTION_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_SUBSCRIPTION_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_SUBSCRIPTION_FAIL:
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
