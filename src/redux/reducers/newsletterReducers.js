import {
	NEW_NEWSLETTER_REQUEST,
	NEW_NEWSLETTER_SUCCESS,
	NEW_NEWSLETTER_FAIL,
	ADMIN_GET_NEWSLETTERS_REQUEST,
	ADMIN_GET_NEWSLETTERS_SUCCESS,
	ADMIN_GET_NEWSLETTERS_FAIL,
	ADMIN_DELETE_NEWSLETTER_REQUEST,
	ADMIN_DELETE_NEWSLETTER_SUCCESS,
	ADMIN_DELETE_NEWSLETTER_RESET,
	ADMIN_DELETE_NEWSLETTER_FAIL,
	CLEAR_ERRORS,
} from "../constants/newsletterConstants";

// New newsletter entry reducer
export const newNewsletterReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_NEWSLETTER_REQUEST:
			return {
				loading: true,
			};
		case NEW_NEWSLETTER_SUCCESS:
			return {
				loading: false,
				success: true,
				newsletter: action.payload.newsletter,
			};
		case NEW_NEWSLETTER_FAIL:
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

// Admin get newsletters reducer
export const adminGetNewslettersReducer = (state = { newsletters: [] }, action) => {
	switch (action.type) {
		case ADMIN_GET_NEWSLETTERS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_GET_NEWSLETTERS_SUCCESS:
			return {
				loading: false,
				newsletters: action.payload.newsletters,
			};
		case ADMIN_GET_NEWSLETTERS_FAIL:
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

// Admin delete bug report reducer
export const adminDeleteNewsletterReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_NEWSLETTER_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_NEWSLETTER_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_NEWSLETTER_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_NEWSLETTER_FAIL:
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
