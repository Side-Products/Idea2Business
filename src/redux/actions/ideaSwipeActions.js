import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
	NEW_IDEA_SWIPE_REQUEST,
	NEW_IDEA_SWIPE_SUCCESS,
	NEW_IDEA_SWIPE_FAIL,
	ALL_IDEA_SWIPES_SUCCESS,
	ALL_IDEA_SWIPES_FAIL,
	VOTE_IDEA_REQUEST,
	VOTE_IDEA_SUCCESS,
	VOTE_IDEA_FAIL,
	VOTE_SECTION_IDEA_REQUEST,
	VOTE_SECTION_IDEA_SUCCESS,
	VOTE_SECTION_IDEA_FAIL,
	CLEAR_ERRORS,
} from "../constants/ideaSwipeConstants";

// New idea swipe search - server side
export const newIdeaSwipeSearchServerSide = (req) => async (dispatch) => {
	try {
		dispatch({ type: NEW_IDEA_SWIPE_REQUEST });

		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};

		const { data } = await axios.get(`${origin}/api/idea-swipe/generate-idea`, config);

		dispatch({ type: NEW_IDEA_SWIPE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_IDEA_SWIPE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// New idea search - client side
export const newIdeaSwipeSearch = () => async (dispatch) => {
	try {
		dispatch({ type: NEW_IDEA_SWIPE_REQUEST });

		const { data } = await axios.get(`/api/idea-swipe/generate-idea`);

		dispatch({ type: NEW_IDEA_SWIPE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_IDEA_SWIPE_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getIdeaSwipe = (req) => async (dispatch) => {
	try {
		dispatch({ type: NEW_IDEA_SWIPE_REQUEST });

		const { origin } = absoluteUrl(req);

		const { data } = await axios.post(`${origin}/api/idea-swipe/get-idea`);

		dispatch({ type: NEW_IDEA_SWIPE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_IDEA_SWIPE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get all idea swipes
export const getAllIdeaSwipes = (req) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);
		const config = {
			headers: {
				cookie: req.headers.cookie,
			},
		};

		const { data } = await axios.get(`${origin}/api/idea-swipe`, config);

		dispatch({
			type: ALL_IDEA_SWIPES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_IDEA_SWIPES_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get all idea swipes
export const getAllIdeaSwipesUnauthenticatedUser = (req) => async (dispatch) => {
	try {
		const { origin } = absoluteUrl(req);

		const { data } = await axios.post(`${origin}/api/idea-swipe`);

		dispatch({
			type: ALL_IDEA_SWIPES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_IDEA_SWIPES_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Vote idea
export const voteIdea = (voteInfo) => async (dispatch) => {
	try {
		dispatch({ type: VOTE_IDEA_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/idea-swipe/vote`, voteInfo, config);

		dispatch({ type: VOTE_IDEA_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: VOTE_IDEA_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Vote section idea
export const voteSectionIdea = (voteInfo) => async (dispatch) => {
	try {
		dispatch({ type: VOTE_SECTION_IDEA_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`/api/idea-swipe/vote`, voteInfo, config);

		dispatch({ type: VOTE_SECTION_IDEA_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: VOTE_SECTION_IDEA_FAIL,
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
