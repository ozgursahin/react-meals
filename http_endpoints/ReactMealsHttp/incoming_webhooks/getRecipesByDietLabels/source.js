// This function is the webhook's request handler.
exports = function(payload, response) {
	// Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
	const { dietLabels, startIndex, limit	} = payload.query;

	if (!dietLabels || startIndex === undefined || limit === undefined) {
		response.setStatusCode(400);
		response.setBody(`Could not find some of the fields in the request body.`);
	} else {
		// Raw request body (if the client sent one).
		// This is a binary object that can be accessed as a string using .text()
		const body = payload.body;

		console.log(`dietLabels: ${dietLabels} startIndex: ${startIndex} limit: ${limit}`);
		//console.log("Content-Type:", JSON.stringify(contentTypes));
		console.log("Request body:", body);

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