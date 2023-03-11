import { combineReducers } from "redux";
import { allProjectsReducer, projectDetailsReducer } from "./projectReducers";
import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, adminGetAllUsersReducer, adminGetUserDetailsReducer } from "./userReducers";
import { mySubscriptionReducer, adminGetSubscriptionsReducer, adminDeleteSubscriptionReducer } from "./subscriptionReducers";

const reducer = combineReducers({
	allProjects: allProjectsReducer,
	projectDetails: projectDetailsReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	allUsers: adminGetAllUsersReducer,
	userDetails: adminGetUserDetailsReducer,
	forgotPassword: forgotPasswordReducer,
	subscription: mySubscriptionReducer,
	adminGetSubscriptions: adminGetSubscriptionsReducer,
	adminDeleteSubscription: adminDeleteSubscriptionReducer,
});

export default reducer;
