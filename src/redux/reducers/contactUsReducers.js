import {
	NEW_CONTACT_US_MESSAGE_REQUEST,
	NEW_CONTACT_US_MESSAGE_SUCCESS,
	NEW_CONTACT_US_MESSAGE_FAIL,
	ADMIN_GET_CONTACT_US_MESSAGES_REQUEST,
	ADMIN_GET_CONTACT_US_MESSAGES_SUCCESS,
	ADMIN_GET_CONTACT_US_MESSAGES_FAIL,
	ADMIN_DELETE_CONTACT_US_MESSAGE_REQUEST,
	ADMIN_DELETE_CONTACT_US_MESSAGE_SUCCESS,
	ADMIN_DELETE_CONTACT_US_MESSAGE_RESET,
	ADMIN_DELETE_CONTACT_US_MESSAGE_FAIL,
	CLEAR_ERRORS,
} from "../constants/contactUsConstants";

// New contact us message reducer
export const newContactUsMessageReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_CONTACT_US_MESSAGE_REQUEST:
			return {
				loading: true,
			};
		case NEW_CONTACT_US_MESSAGE_SUCCESS:
			return {
				loading: false,
				success: true,
				contactUsMessage: action.payload.contactUsMessage,
			};
		case NEW_CONTACT_US_MESSAGE_FAIL:
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

// Admin get contact us messages reducer
export const adminGetContactUsMessagesReducer = (state = { contactUsMessages: [] }, action) => {
	switch (action.type) {
		case ADMIN_GET_CONTACT_US_MESSAGES_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_GET_CONTACT_US_MESSAGES_SUCCESS:
			return {
				loading: false,
				contactUsMessages: action.payload.contactUsMessages,
			};
		case ADMIN_GET_CONTACT_US_MESSAGES_FAIL:
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

// Admin delete contact us message reducer
export const adminDeleteContactUsMessageReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_CONTACT_US_MESSAGE_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_CONTACT_US_MESSAGE_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_CONTACT_US_MESSAGE_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_CONTACT_US_MESSAGE_FAIL:
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
