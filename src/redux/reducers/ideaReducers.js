import {
	NEW_IDEA_SEARCH_REQUEST,
	NEW_IDEA_SEARCH_SUCCESS,
	NEW_IDEA_SEARCH_FAIL,
	ALL_IDEAS_SUCCESS,
	ALL_IDEAS_FAIL,
	MY_IDEAS_SUCCESS,
	MY_IDEAS_FAIL,
	IDEA_DETAILS_SUCCESS,
	IDEA_DETAILS_FAIL,
	ADMIN_DELETE_IDEA_SEARCH_REQUEST,
	ADMIN_DELETE_IDEA_SEARCH_SUCCESS,
	ADMIN_DELETE_IDEA_SEARCH_RESET,
	ADMIN_DELETE_IDEA_SEARCH_FAIL,
	CLEAR_ERRORS,
} from "../constants/ideaConstants";

// New idea search reducer
export const newIdeaSearchReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_IDEA_SEARCH_REQUEST:
			return {
				loading: true,
			};
		case NEW_IDEA_SEARCH_SUCCESS:
			return {
				loading: false,
				success: true,
				idea: action.payload.idea,
				searchCount: action.payload.searchCount,
			};
		case NEW_IDEA_SEARCH_FAIL:
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

// My ideas reducer
export const myIdeasReducer = (state = { ideas: [] }, action) => {
	switch (action.type) {
		case MY_IDEAS_SUCCESS:
			return {
				ideasCount: action.payload.ideasCount,
				resultsPerPage: action.payload.resultsPerPage,
				filteredIdeasCount: action.payload.filteredIdeasCount,
				ideas: action.payload.ideas,
			};
		case MY_IDEAS_FAIL:
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

// All ideas reducer
export const allIdeasReducer = (state = { ideas: [] }, action) => {
	switch (action.type) {
		case ALL_IDEAS_SUCCESS:
			return {
				ideasCount: action.payload.ideasCount,
				resultsPerPage: action.payload.resultsPerPage,
				filteredIdeasCount: action.payload.filteredIdeasCount,
				ideas: action.payload.ideas,
			};
		case ALL_IDEAS_FAIL:
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

// Idea details reducer
export const ideaDetailsReducer = (state = { idea: {} }, action) => {
	switch (action.type) {
		case IDEA_DETAILS_SUCCESS:
			return {
				idea: action.payload,
			};
		case IDEA_DETAILS_FAIL:
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

// Admin delete idea search reducer
export const adminDeleteIdeaSearchReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_IDEA_SEARCH_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_IDEA_SEARCH_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_IDEA_SEARCH_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_IDEA_SEARCH_FAIL:
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
