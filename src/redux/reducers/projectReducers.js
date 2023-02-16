import { ALL_PROJECTS_SUCCESS, ALL_PROJECTS_FAIL, PROJECT_DETAILS_SUCCESS, PROJECT_DETAILS_FAIL, CLEAR_ERRORS } from "../constants/projectConstants";

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
