import { React, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import "./IngredientDisplayer.scss";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function IngredientDisplayer({ ingredientObject, addToShoppingList }) {
	const [isInfoVisible, setIsInfoVisible] = useState(false);
	const [isIngredientAdded, setIsIngredientAdded] = useState(false);

	const handleToastClose = () => {
		setIsInfoVisible(false);
	};

	const addIngredientToList = (food) => {
		addToShoppingList(food);
		setIsInfoVisible(true);
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

			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={isInfoVisible}
				autoHideDuration={3000}
				onClose={handleToastClose}
			>
				<Alert onClose={handleToastClose} severity="success">
					Added to shopping list.
				</Alert>
			</Snackbar>
		</div>
	);
}

export default IngredientDisplayer;
