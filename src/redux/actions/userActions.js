import axios from "axios";
import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	ADMIN_GET_ALL_USERS_REQUEST,
	ADMIN_GET_ALL_USERS_SUCCESS,
	ADMIN_GET_ALL_USERS_FAIL,
	ADMIN_GET_USER_DETAILS_REQUEST,
	ADMIN_GET_USER_DETAILS_SUCCESS,
	ADMIN_GET_USER_DETAILS_FAIL,
	ADMIN_UPDATE_USER_DETAILS_REQUEST,
	ADMIN_UPDATE_USER_DETAILS_SUCCESS,
	ADMIN_UPDATE_USER_DETAILS_FAIL,
	ADMIN_DELETE_USER_REQUEST,
	ADMIN_DELETE_USER_SUCCESS,
	ADMIN_DELETE_USER_FAIL,
	CLEAR_ERRORS,
} from "../constants/userConstants";
import absoluteUrl from "next-absolute-url";

// Register user
export const registerUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/auth/register`, userData, config);

		dispatch({
			type: REGISTER_USER_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Load user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await axios.get(`/api/me`);

		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update user profile
export const updateUserProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`/api/me/update`, userData, config);

		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/password/forgot`, email, config);

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config);

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get all users
export const adminGetAllUsers = (req) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_ALL_USERS_REQUEST });

		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};
		const { data } = await axios.get(`${origin}/api/admin/users`, config);

		dispatch({
			type: ADMIN_GET_ALL_USERS_SUCCESS,
			payload: { users: data.users, usersCount: data.usersCount, admins: data.admins, allAccessUsers: data.allAccessUsers },
		});
	} catch (error) {
		dispatch({
			type: ADMIN_GET_ALL_USERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin get user details
export const adminGetUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_GET_USER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/admin/users/${id}`);

		dispatch({
			type: ADMIN_GET_USER_DETAILS_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_GET_USER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin update user details
export const adminUpdateUserDetails = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_UPDATE_USER_DETAILS_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`/api/admin/users/${id}`, userData, config);

		dispatch({
			type: ADMIN_UPDATE_USER_DETAILS_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_UPDATE_USER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin delete user
export const adminDeleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_DELETE_USER_REQUEST });

		const { data } = await axios.delete(`/api/admin/users/${id}`);

		dispatch({
			type: ADMIN_DELETE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_USER_FAIL,
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
