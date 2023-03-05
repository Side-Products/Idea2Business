import { combineReducers } from "redux";
import { allProjectsReducer, projectDetailsReducer } from "./projectReducers";
import { authReducer, userReducer } from "./userReducers";

const reducer = combineReducers({
	allProjects: allProjectsReducer,
	projectDetails: projectDetailsReducer,
	auth: authReducer,
	user: userReducer,
});

export default reducer;
