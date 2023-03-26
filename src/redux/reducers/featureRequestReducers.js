import {
	NEW_FEATURE_REQUEST_REQUEST,
	NEW_FEATURE_REQUEST_SUCCESS,
	NEW_FEATURE_REQUEST_FAIL,
	ADMIN_GET_FEATURE_REQUESTS_REQUEST,
	ADMIN_GET_FEATURE_REQUESTS_SUCCESS,
	ADMIN_GET_FEATURE_REQUESTS_FAIL,
	ADMIN_DELETE_FEATURE_REQUEST_REQUEST,
	ADMIN_DELETE_FEATURE_REQUEST_SUCCESS,
	ADMIN_DELETE_FEATURE_REQUEST_RESET,
	ADMIN_DELETE_FEATURE_REQUEST_FAIL,
	CLEAR_ERRORS,
} from "../constants/featureRequestConstants";

// New feature request reducer
export const newFeatureRequestReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_FEATURE_REQUEST_REQUEST:
			return {
				loading: true,
			};
		case NEW_FEATURE_REQUEST_SUCCESS:
			return {
				loading: false,
				success: true,
				featureRequest: action.payload.featureRequest,
			};
		case NEW_FEATURE_REQUEST_FAIL:
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

// Admin get feature requests reducer
export const adminGetFeatureRequestsReducer = (state = { featureRequests: [] }, action) => {
	switch (action.type) {
		case ADMIN_GET_FEATURE_REQUESTS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_GET_FEATURE_REQUESTS_SUCCESS:
			return {
				loading: false,
				featureRequests: action.payload.featureRequests,
			};
		case ADMIN_GET_FEATURE_REQUESTS_FAIL:
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

// Admin delete feature request reducer
export const adminDeleteFeatureRequestReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_FEATURE_REQUEST_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_FEATURE_REQUEST_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_FEATURE_REQUEST_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_FEATURE_REQUEST_FAIL:
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
