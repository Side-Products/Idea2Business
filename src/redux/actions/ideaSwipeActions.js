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
	CLEAR_ERRORS,
} from "../constants/ideaSwipeConstants";

// Add new idea swipe search
export const newIdeaSwipeSearch = (req) => async (dispatch) => {
	try {
		dispatch({ type: NEW_IDEA_SWIPE_REQUEST });

		const { origin } = absoluteUrl(req);

		const { data } = await axios.post(`${origin}/api/idea-swipe/generate-idea`);

		dispatch({ type: NEW_IDEA_SWIPE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_IDEA_SWIPE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Add new idea search
export const newIdeaSearch = () => async (dispatch) => {
	try {
		dispatch({ type: NEW_IDEA_SWIPE_REQUEST });

		const { data } = await axios.post(`/api/idea-swipe/generate-idea`);

		dispatch({ type: NEW_IDEA_SWIPE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NEW_IDEA_SWIPE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get all idea swipes
export const getAllIdeaSwipes = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/idea-swipe`);

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

// Clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
