import { subscriptionPlans, freePlan, proPlan, premiumPlan } from "@/config/constants";

const getUTCTimestamp = (blockTimestamp) => {
	const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
	const d = new Date(blockTimestamp);

	return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(
		d.getMilliseconds(),
		3
	)}`;
};
export const getTimestamp = (blockTimestamp) => {
	var date = new Date(blockTimestamp);
	var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

	return getUTCTimestamp(new Date(now_utc).toUTCString().toString().slice(0, 25));
};

export const getTimeDifference = (startDate, endDate, timeDiff = "") => {
	let diff;

	if (timeDiff) diff = timeDiff;
	else diff = endDate.getTime() - startDate.getTime();

	const yearDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
	if (yearDiff > 0) {
		return yearDiff + (yearDiff === 1 ? " year ago" : " years ago");
	}

	const monthDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
	if (monthDiff > 0) {
		return monthDiff + (monthDiff === 1 ? " month ago" : " months ago");
	}

	const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (dayDiff > 0) {
		return dayDiff + (dayDiff === 1 ? " day ago" : " days ago");
	}

	const hourDiff = Math.floor(diff / (1000 * 60 * 60));
	if (hourDiff > 0) {
		return hourDiff + (hourDiff === 1 ? " hour ago" : " hours ago");
	}

	const minuteDiff = Math.floor(diff / (1000 * 60));
	if (minuteDiff > 0) {
		return minuteDiff + (minuteDiff === 1 ? " minute ago" : " minutes ago");
	}

	const secondDiff = Math.floor(diff / 1000);
	return secondDiff === 0 ? "just now" : secondDiff + secondDiff === 1 ? " second ago" : " seconds ago";
};

// export const getTimeDifference = (date1, date2) => {
// 	const diff = Math.abs(date1.getTime() - date2.getTime());
// 	const minute = 60 * 1000;
// 	const hour = 60 * minute;
// 	const day = 24 * hour;
// 	const week = 7 * day;
// 	const month = 30 * day;

// 	if (diff < minute) {
// 		return `${Math.floor(diff / 1000)} ${Math.floor(diff / 1000) == 1 ? "second" : "seconds"}`;
// 	} else if (diff < hour) {
// 		return `${Math.floor(diff / minute)} ${Math.floor(diff / minute) == 1 ? "minute" : "minutes"}`;
// 	} else if (diff < day) {
// 		return `${Math.floor(diff / hour)} ${Math.floor(diff / hour) == 1 ? "hour" : "hours"}`;
// 	} else if (diff < week) {
// 		return `${Math.floor(diff / day)} ${Math.floor(diff / day) == 1 ? "day" : "days"}`;
// 	} else if (diff < month) {
// 		return `${Math.floor(diff / week)} ${Math.floor(diff / week) == 1 ? "week" : "weeks"}`;
// 	} else {
// 		return `${Math.floor(diff / month)} ${Math.floor(diff / month) == 1 ? "month" : "months"}`;
// 	}
// };

export const removeAllWhiteSpaces = (str) => {
	return str.toString().replace(/\s+/g, "");
};

export const padZeros = (num, width) => {
	num = num + "";
	return num.length >= width ? num : new Array(width - num.length + 1).join("0") + num;
};

export const findByMatchingProperties = (set, properties) => {
	return set.filter(function (entry) {
		return Object.keys(properties).every(function (key) {
			return entry[key] === properties[key];
		});
	});
};

// Subscription helpers
export const getObjectWithHighestKey = (obj) => {
	let highestKey = null;
	let highestObj = null;
	for (const key in obj) {
		if (highestKey === null || key > highestKey) {
			highestKey = key;
			highestObj = obj[key];
		}
	}
	return highestObj;
};

export const getHighestKeyFromObject = (obj) => {
	let highestKey = null;
	let highestObj = null;
	for (const key in obj) {
		if (highestKey === null || key > highestKey) {
			highestKey = key;
			highestObj = obj[key];
		}
	}
	return parseInt(highestKey);
};

export const getLatestSubscriptionPlansVersion = () => {
	return getHighestKeyFromObject(subscriptionPlans);
};

export const getSubscriptionPlanName = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.name
		: plan == proPlan
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.name
		: plan == premiumPlan
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.name
		: "";
};

export const getSubscriptionPlanPrice = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.price
		: plan == proPlan
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.price
		: plan == premiumPlan
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.price
		: "";
};

export const getSubscriptionPlanCredits = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.credits
		: plan == proPlan
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.credits
		: plan == premiumPlan
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.credits
		: "";
};

export const getSubscriptionPlanPriceId = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.stripePriceId
		: plan == proPlan
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.stripePriceId
		: plan == premiumPlan
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.stripePriceId
		: "";
};

export const getPriceFromStripePriceId = (stripePriceId) =>
	stripePriceId
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.price
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.price
			: 0
		: 0;

export const getPlanFromStripePriceId = (stripePriceId) =>
	stripePriceId
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.name
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.name
			: freePlan
		: freePlan;

export const getCreditsFromStripePriceId = (stripePriceId) =>
	stripePriceId
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).proSubscription.credits
			: getObjectWithHighestKey(subscriptionPlans).premiumSubscription.stripePriceId === stripePriceId
			? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.credits
			: 0
		: 0;

export const getCreditsFromPlanName = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.credits
		: plan == proPlan
		? getObjectWithHighestKey(subscriptionPlans).proSubscription.credits
		: plan == premiumPlan
		? getObjectWithHighestKey(subscriptionPlans).premiumSubscription.credits
		: 0;
};

export const getCurrentSubscriptionTier = (subscription) => {
	return subscription &&
		subscriptionPlans[subscription.version] &&
		subscription.stripe_priceId == subscriptionPlans[subscription.version].premiumSubscription.stripePriceId &&
		new Date(subscription.subscriptionValidUntil) > Date.now()
		? premiumPlan
		: subscription &&
		  subscriptionPlans[subscription.version] &&
		  subscription.stripe_priceId == subscriptionPlans[subscription.version].proSubscription.stripePriceId &&
		  new Date(subscription.subscriptionValidUntil) > Date.now()
		? proPlan
		: freePlan;
};

export const updateAllIdeas = (obj, updatedVote) => {
	Object.keys(obj).forEach((key) => {
		obj[key] = obj[key].map((item) => {
			if (item._id === updatedVote.ideaSwipe._id) {
				return { ...item, vote: updatedVote.vote, votes: updatedVote.ideaSwipe.votes };
			} else {
				return item;
			}
		});
	});
};
