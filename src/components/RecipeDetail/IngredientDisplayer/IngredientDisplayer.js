import { React, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import "./IngredientDisplayer.scss";

function IngredientDisplayer({ ingredientObject, addToShoppingList }) {
	const [isIngredientAdded, setIsIngredientAdded] = useState(false);

	const addIngredientToList = (food) => {
		addToShoppingList([food]);
		setIsIngredientAdded(true);
	};

	return (
		<div className="ingredient-displayer">
			{isIngredientAdded ? (
				<CheckCircleOutlineIcon style={{ color: "green" }} fontSize="large" />
			) : (
				<AddCircleOutlineIcon
					className="add-to-list"
					fontSize="large"
					titleAccess="Add to shopping list"
					onClick={() => addIngredientToList(ingredientObject.food)}
				/>
			)}

			<span>{ingredientObject.text}</span>
		</div>
	);
}

export default IngredientDisplayer;
