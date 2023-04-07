import {
	ALL_GENERATED_RESPONSES_SUCCESS,
	ALL_GENERATED_RESPONSES_FAIL,
	ADMIN_DELETE_GENERATED_RESPONSE_REQUEST,
	ADMIN_DELETE_GENERATED_RESPONSE_SUCCESS,
	ADMIN_DELETE_GENERATED_RESPONSE_RESET,
	ADMIN_DELETE_GENERATED_RESPONSE_FAIL,
	CLEAR_ERRORS,
} from "../constants/generatedResponseConstants";

// All generated responses reducer
export const allGeneratedResponsesReducer = (state = { generatedResponses: [] }, action) => {
	switch (action.type) {
		case ALL_GENERATED_RESPONSES_SUCCESS:
			return {
				generatedResponsesCount: action.payload.generatedResponsesCount,
				resultsPerPage: action.payload.resultsPerPage,
				filteredGeneratedResponsesCount: action.payload.filteredGeneratedResponsesCount,
				generatedResponses: action.payload.generatedResponses,
			};
		case ALL_GENERATED_RESPONSES_FAIL:
			return {
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

// Admin delete genereated response reducer
export const adminDeleteGeneratedResponseReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_GENERATED_RESPONSE_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_GENERATED_RESPONSE_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_GENERATED_RESPONSE_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_GENERATED_RESPONSE_FAIL:
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
