import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_BUG_REPORT_REQUEST,
	NEW_BUG_REPORT_SUCCESS,
	NEW_BUG_REPORT_FAIL,
	ADMIN_GET_BUG_REPORTS_REQUEST,
	ADMIN_GET_BUG_REPORTS_SUCCESS,
	ADMIN_GET_BUG_REPORTS_FAIL,
	ADMIN_DELETE_BUG_REPORT_REQUEST,
	ADMIN_DELETE_BUG_REPORT_SUCCESS,
	ADMIN_DELETE_BUG_REPORT_FAIL,
	CLEAR_ERRORS,
} from "../constants/bugReportConstants";

// Add new bug report
export const newBugReport = (bugReportInfo) => async (dispatch) => {
	try {
		dispatch({ type: NEW_BUG_REPORT_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(`/api/report-a-bug`, bugReportInfo, config);

		dispatch({ type: NEW_BUG_REPORT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_BUG_REPORT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get bug reports
export const adminGetBugReports = (req) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_BUG_REPORTS_REQUEST });

		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};
		const { data } = await axios.get(`${origin}/api/admin/bug-reports`, config);

		dispatch({ type: ADMIN_GET_BUG_REPORTS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ADMIN_GET_BUG_REPORTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin delete bug report
export const adminDeleteBugReport = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_BUG_REPORT_REQUEST });

		const { data } = await axios.delete(`/api/admin/bug-reports/${id}`);

		dispatch({ type: ADMIN_DELETE_BUG_REPORT_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_BUG_REPORT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
