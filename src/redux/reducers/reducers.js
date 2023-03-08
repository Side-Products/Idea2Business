import { combineReducers } from "redux";
import { allProjectsReducer, projectDetailsReducer } from "./projectReducers";
import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer } from "./userReducers";
import { mySubscriptionReducer } from "./subscriptionReducers";

const reducer = combineReducers({
	allProjects: allProjectsReducer,
	projectDetails: projectDetailsReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	forgotPassword: forgotPasswordReducer,
	subscription: mySubscriptionReducer,
});

export default reducer;
