class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	search() {
		const search = this.queryString.search
			? {
					name: {
						$regex: this.queryString.search,
						$options: "i",
					},
			  }
			: {};

		this.query = this.query.find({ ...search });
		return this;
	}

	filter() {
		const queryCopy = { ...this.queryString };

		// Remove fields from query
		const removeFields = ["name", "page"];
		removeFields.forEach((el) => delete queryCopy[el]);

		this.query = this.query.find(queryCopy);
		return this;
	}

	pagination(resultsPerPage) {
		const currentPage = Number(this.queryString.page) || 1;
		const skip = resultsPerPage * (currentPage - 1);

		this.query = this.query.limit(resultsPerPage).skip(skip);
		return this;
	}
}

export default APIFeatures;
