import { combineReducers } from "redux";
import { allProjectsReducer, projectDetailsReducer } from "./projectReducers";

const reducer = combineReducers({
	allProjects: allProjectsReducer,
	projectDetails: projectDetailsReducer,
});

export default reducer;
