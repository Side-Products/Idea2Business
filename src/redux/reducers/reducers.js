import { combineReducers } from "redux";
import { newIdeaSearchReducer, allIdeasReducer, myIdeasReducer, ideaDetailsReducer, adminDeleteIdeaSearchReducer } from "./ideaReducers";
import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, adminGetAllUsersReducer, adminGetUserDetailsReducer } from "./userReducers";
import { mySubscriptionReducer, adminGetSubscriptionsReducer, adminDeleteSubscriptionReducer } from "./subscriptionReducers";
import { newContactUsMessageReducer, adminGetContactUsMessagesReducer, adminDeleteContactUsMessageReducer } from "./contactUsReducers";
import { newBugReportReducer, adminGetBugReportsReducer, adminDeleteBugReportReducer } from "./bugReportReducers";
import { newFeatureRequestReducer, adminGetFeatureRequestsReducer, adminDeleteFeatureRequestReducer } from "./featureRequestReducers";
import { allGeneratedResponsesReducer, adminDeleteGeneratedResponseReducer } from "./generatedResponseReducers";
import { newIdeaSwipeReducer, allIdeaSwipesReducer, voteIdeaReducer, voteSectionIdeaReducer } from "./ideaSwipeReducers";
import { newNewsletterReducer, adminGetNewslettersReducer, adminDeleteNewsletterReducer } from "./newsletterReducers";

const reducer = combineReducers({
	newIdeaSearch: newIdeaSearchReducer,
	allIdeas: allIdeasReducer,
	myIdeas: myIdeasReducer,
	ideaDetails: ideaDetailsReducer,
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
	allGeneratedResponses: allGeneratedResponsesReducer,
	adminDeleteGeneratedResponse: adminDeleteGeneratedResponseReducer,
	adminDeleteIdeaSearch: adminDeleteIdeaSearchReducer,
	newIdeaSwipe: newIdeaSwipeReducer,
	allIdeaSwipes: allIdeaSwipesReducer,
	voteIdea: voteIdeaReducer,
	voteSectionIdea: voteSectionIdeaReducer,
	newNewsletter: newNewsletterReducer,
	adminGetNewsletters: adminGetNewslettersReducer,
	adminDeleteNewsletter: adminDeleteNewsletterReducer,
});

export default reducer;
