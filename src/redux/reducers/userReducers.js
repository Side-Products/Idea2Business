import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_RESET,
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
	ADMIN_UPDATE_USER_DETAILS_RESET,
	ADMIN_UPDATE_USER_DETAILS_FAIL,
	ADMIN_DELETE_USER_REQUEST,
	ADMIN_DELETE_USER_SUCCESS,
	ADMIN_DELETE_USER_RESET,
	ADMIN_DELETE_USER_FAIL,
	CLEAR_ERRORS,
} from "../constants/userConstants";

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
			};
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case REGISTER_USER_FAIL:
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

// Loaded user reducer
export const loadedUserReducer = (state = { loading: true, user: null }, action) => {
	switch (action.type) {
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case LOAD_USER_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
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

// User reducer
export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_REQUEST:
		case ADMIN_UPDATE_USER_DETAILS_REQUEST:
		case ADMIN_DELETE_USER_REQUEST:
			return {
				loading: true,
			};
		case UPDATE_PROFILE_SUCCESS:
		case ADMIN_UPDATE_USER_DETAILS_SUCCESS:
			return {
				loading: false,
				isUpdated: action.payload,
			};
		case ADMIN_DELETE_USER_SUCCESS:
			return {
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_PROFILE_RESET:
		case ADMIN_UPDATE_USER_DETAILS_RESET:
			return {
				loading: false,
				isUpdated: false,
			};
		case ADMIN_DELETE_USER_RESET:
			return {
				loading: false,
				isDeleted: false,
			};

		case UPDATE_PROFILE_FAIL:
		case ADMIN_UPDATE_USER_DETAILS_FAIL:
		case ADMIN_DELETE_USER_FAIL:
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

// Forgot password reducer
export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				loading: true,
			};

		case FORGOT_PASSWORD_SUCCESS:
			return {
				loading: false,
				message: action.payload,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};

		case FORGOT_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
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

// Admin get all users reducer
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ADMIN_GET_ALL_USERS_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_GET_ALL_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload.users,
				usersCount: action.payload.usersCount,
				admins: action.payload.admins,
				allAccessUsers: action.payload.allAccessUsers,
			};
		case ADMIN_GET_ALL_USERS_FAIL:
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

// Admin get user details reducer
export const adminGetUserDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case ADMIN_GET_USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ADMIN_GET_USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case ADMIN_GET_USER_DETAILS_FAIL:
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
