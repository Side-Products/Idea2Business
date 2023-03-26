import {
	NEW_BUG_REPORT_REQUEST,
	NEW_BUG_REPORT_SUCCESS,
	NEW_BUG_REPORT_FAIL,
	ADMIN_GET_BUG_REPORTS_REQUEST,
	ADMIN_GET_BUG_REPORTS_SUCCESS,
	ADMIN_GET_BUG_REPORTS_FAIL,
	ADMIN_DELETE_BUG_REPORT_REQUEST,
	ADMIN_DELETE_BUG_REPORT_SUCCESS,
	ADMIN_DELETE_BUG_REPORT_RESET,
	ADMIN_DELETE_BUG_REPORT_FAIL,
	CLEAR_ERRORS,
} from "../constants/bugReportConstants";

// New bug report reducer
export const newBugReportReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_BUG_REPORT_REQUEST:
			return {
				loading: true,
			};
		case NEW_BUG_REPORT_SUCCESS:
			return {
				loading: false,
				success: true,
				bugReport: action.payload.bugReport,
			};
		case NEW_BUG_REPORT_FAIL:
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

// Admin get bug reports reducer
export const adminGetBugReportsReducer = (state = { bugReports: [] }, action) => {
	switch (action.type) {
		case ADMIN_GET_BUG_REPORTS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_GET_BUG_REPORTS_SUCCESS:
			return {
				loading: false,
				bugReports: action.payload.bugReports,
			};
		case ADMIN_GET_BUG_REPORTS_FAIL:
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
export const adminDeleteBugReportReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_BUG_REPORT_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_DELETE_BUG_REPORT_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};
		case ADMIN_DELETE_BUG_REPORT_RESET:
			return {
				loading: false,
				isDeleted: false,
			};
		case ADMIN_DELETE_BUG_REPORT_FAIL:
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
