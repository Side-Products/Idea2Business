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
