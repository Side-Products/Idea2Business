import {
	NEW_PROJECT_SEARCH_REQUEST,
	NEW_PROJECT_SEARCH_SUCCESS,
	NEW_PROJECT_SEARCH_FAIL,
	ALL_PROJECTS_SUCCESS,
	ALL_PROJECTS_FAIL,
	MY_PROJECTS_SUCCESS,
	MY_PROJECTS_FAIL,
	PROJECT_DETAILS_SUCCESS,
	PROJECT_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/projectConstants";

// New project search reducer
export const newProjectSearchReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_PROJECT_SEARCH_REQUEST:
			return {
				loading: true,
			};
		case NEW_PROJECT_SEARCH_SUCCESS:
			return {
				loading: false,
				success: true,
				project: action.payload.project,
				searchCount: action.payload.searchCount,
			};
		case NEW_PROJECT_SEARCH_FAIL:
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

// My projects reducer
export const myProjectsReducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case MY_PROJECTS_SUCCESS:
			return {
				projectsCount: action.payload.projectsCount,
				resultsPerPage: action.payload.resultsPerPage,
				filteredProjectsCount: action.payload.filteredProjectsCount,
				projects: action.payload.projects,
			};
		case MY_PROJECTS_FAIL:
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

// All projects reducer
export const allProjectsReducer = (state = { projects: [] }, action) => {
	switch (action.type) {
		case ALL_PROJECTS_SUCCESS:
			return {
				projectsCount: action.payload.projectsCount,
				resultsPerPage: action.payload.resultsPerPage,
				filteredProjectsCount: action.payload.filteredProjectsCount,
				projects: action.payload.projects,
			};
		case ALL_PROJECTS_FAIL:
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

// Project details reducer
export const projectDetailsReducer = (state = { project: {} }, action) => {
	switch (action.type) {
		case PROJECT_DETAILS_SUCCESS:
			return {
				project: action.payload,
			};
		case PROJECT_DETAILS_FAIL:
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
