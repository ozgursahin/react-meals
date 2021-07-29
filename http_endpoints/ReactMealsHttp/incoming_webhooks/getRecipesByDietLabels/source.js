// This function is the webhook's request handler.
exports = function(payload, response) {
	const { dietLabels, startIndex, limit	} = payload.body;

	if (!dietLabels || startIndex === undefined || limit === undefined) {
		response.setStatusCode(400);
		response.setBody(`Could not find some of the fields in the request body.`);
	} else {
		console.log(`dietLabels: ${dietLabels} startIndex: ${startIndex} limit: ${limit}`);

		// Querying a mongodb service:
		const docs = context.services.get("mongodb-atlas")
			.db("react-meals").collection("recipes")
			.find({
				"recipe.dietLabels": { $all: dietLabels }
			})
			.skip(startIndex)
			.limit(limit)
			.toArray();
			
		response.setStatusCode(200);

		return docs;
	}
};