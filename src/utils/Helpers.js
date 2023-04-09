import { subscriptionPlans, freePlan, standardPlan, proPlusPlan } from "@/config/constants";

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
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.text
		: plan == standardPlan
		? getObjectWithHighestKey(subscriptionPlans).standardSubscription.text
		: plan == proPlusPlan
		? getObjectWithHighestKey(subscriptionPlans).proPlusSubscription.text
		: "";
};

export const getSubscriptionPlanPrice = (plan) => {
	return plan == freePlan
		? getObjectWithHighestKey(subscriptionPlans).freeSubscription.price
		: plan == standardPlan
		? getObjectWithHighestKey(subscriptionPlans).standardSubscription.price
		: plan == proPlusPlan
		? getObjectWithHighestKey(subscriptionPlans).proPlusSubscription.price
		: "";
};

export const getSubscriptionPlanValidDays = (plan) => {
	return plan == standardPlan
		? getObjectWithHighestKey(subscriptionPlans).standardSubscription.validForDays
		: plan == proPlusPlan
		? getObjectWithHighestKey(subscriptionPlans).proPlusSubscription.validForDays
		: "";
};

export const getCurrentSubscriptionTier = (subscription) => {
	return subscription &&
		subscriptionPlans[subscription.version] &&
		subscription.amountPaid == subscriptionPlans[subscription.version].proPlusSubscription.price &&
		new Date(subscription.subscriptionValidUntil) > Date.now()
		? proPlusPlan
		: subscription &&
		  subscriptionPlans[subscription.version] &&
		  subscription.amountPaid == subscriptionPlans[subscription.version].standardSubscription.price &&
		  new Date(subscription.subscriptionValidUntil) > Date.now()
		? standardPlan
		: freePlan;
};
