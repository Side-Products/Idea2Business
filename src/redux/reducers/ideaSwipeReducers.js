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

// New idea swipe reducer
export const newIdeaSwipeReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_IDEA_SWIPE_REQUEST:
			return {
				loading: true,
			};
		case NEW_IDEA_SWIPE_SUCCESS:
			return {
				loading: false,
				success: true,
				ideaSwipe: action.payload.ideaSwipe,
			};
		case NEW_IDEA_SWIPE_FAIL:
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

// All idea swipes
export const allIdeaSwipesReducer = (state = { ideaSwipes: [] }, action) => {
	switch (action.type) {
		case ALL_IDEA_SWIPES_SUCCESS:
			return {
				ideaSwipes: action.payload.ideaSwipes,
			};
		case ALL_IDEA_SWIPES_FAIL:
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

// Vote idea reducer
export const voteIdeaReducer = (state = {}, action) => {
	switch (action.type) {
		case VOTE_IDEA_REQUEST:
			return {
				loading: true,
			};
		case VOTE_IDEA_SUCCESS:
			return {
				loading: false,
				success: true,
				ideaSwipeVote: action.payload.ideaSwipeVote,
			};
		case VOTE_IDEA_FAIL:
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

// Vote section idea reducer
export const voteSectionIdeaReducer = (state = {}, action) => {
	switch (action.type) {
		case VOTE_SECTION_IDEA_REQUEST:
			return {
				loading: true,
			};
		case VOTE_SECTION_IDEA_SUCCESS:
			return {
				loading: false,
				success: true,
				ideaSwipeVote: action.payload.ideaSwipeVote,
			};
		case VOTE_SECTION_IDEA_FAIL:
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
