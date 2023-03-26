import { combineReducers } from "redux";
import { newProjectSearchReducer, allProjectsReducer, myProjectsReducer, projectDetailsReducer } from "./projectReducers";
import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, adminGetAllUsersReducer, adminGetUserDetailsReducer } from "./userReducers";
import { mySubscriptionReducer, adminGetSubscriptionsReducer, adminDeleteSubscriptionReducer } from "./subscriptionReducers";
import { newContactUsMessageReducer, adminGetContactUsMessagesReducer, adminDeleteContactUsMessageReducer } from "./contactUsReducers";
import { newBugReportReducer, adminGetBugReportsReducer, adminDeleteBugReportReducer } from "./bugReportReducers";
import { newFeatureRequestReducer, adminGetFeatureRequestsReducer, adminDeleteFeatureRequestReducer } from "./featureRequestReducers";

const reducer = combineReducers({
	newProjectSearch: newProjectSearchReducer,
	allProjects: allProjectsReducer,
	myProjects: myProjectsReducer,
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
	newContactUsMessage: newContactUsMessageReducer,
	adminGetContactUsMessages: adminGetContactUsMessagesReducer,
	adminDeleteContactUsMessage: adminDeleteContactUsMessageReducer,
	newBugReport: newBugReportReducer,
	adminGetBugReports: adminGetBugReportsReducer,
	adminDeleteBugReport: adminDeleteBugReportReducer,
	newFeatureRequest: newFeatureRequestReducer,
	adminGetFeatureRequests: adminGetFeatureRequestsReducer,
	adminDeleteFeatureRequest: adminDeleteFeatureRequestReducer,
});

export default reducer;
