import { combineReducers } from "redux";
import { allProjectsReducer } from "./projectReducers";

const reducer = combineReducers({
	allProjects: allProjectsReducer,
});

export default reducer;
