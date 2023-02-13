import { ALL_PROJECTS_SUCCESS, ALL_PROJECTS_FAIL, CLEAR_ERRORS } from "../constants/projectConstants";

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
