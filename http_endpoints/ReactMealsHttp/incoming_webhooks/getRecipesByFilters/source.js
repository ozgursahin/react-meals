// This function is the webhook's request handler.
exports = function(payload, response) {
	const { filters, startIndex, limit	} = EJSON.parse(payload.body.text());

	if (!filters || startIndex === undefined || limit === undefined) {
	  console.log(`missing parameters!`);
		response.setStatusCode(400);
		response.setBody(`Could not find some of the fields in the request body.`);
	} else {
		console.log(`startIndex: ${startIndex} limit: ${limit}`);
		
		const {selectedAllergens, dislikedIngredients, ingredientAmounts} = filters;
		
		let queryFilters = [];
		
		if (selectedAllergens && selectedAllergens.length > 0) {
		  queryFilters.push({"recipe.healthLabels": { $all: selectedAllergens }});
		}
		
		if (dislikedIngredients && dislikedIngredients.length > 0) {
		  queryFilters.push({$nor: [{"recipe.ingredients.food": {$all: dislikedIngredients}}]});
		}
		
		if (ingredientAmounts) {
		  let ingredientFilters = [];
		  Object.keys(ingredientAmounts).forEach(ingredientKey => {
		    if (ingredientAmounts[ingredientKey] > 0) {
		      ingredientFilters.push({ $expr: { $gt: [{ $toDouble: "$recipe.perServing.totalNutrients." + ingredientKey + ".quantity" }, ingredientAmounts[ingredientKey]] } })
		    }
		  });
		  queryFilters.push({$and: ingredientFilters});
		}
		
		let finalQuery;
		
		if (queryFilters.length == 0) {
		  finalQuery = {};
		} else {
		  finalQuery = {$and: queryFilters};
		}
		
		console.log(`queryFilters: ${JSON.stringify(queryFilters)}`);

		// Querying a mongodb service:
		const docs = context.services.get("mongodb-atlas")
			.db("react-meals").collection("recipes")
			.find(finalQuery)
			.skip(startIndex)
			.limit(limit)
			.toArray();

		return docs;
	}
};