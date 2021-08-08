import { React, useState } from "react";
import "./RecipeCard.scss";
import { IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TocIcon from "@material-ui/icons/Toc";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import ImagePlaceholder from "../UIComponents/ImagePlaceholder/ImagePlaceholder";

const IngredientTooltip = withStyles((theme) => ({
	tooltip: {
		fontSize: "100%",
	},
}))(Tooltip);

function RecipeCard({ recipeObject, stateParams }) {
	const [recipeImageLoaded, setRecipeImageLoaded] = useState(false);

	const stopProp = (e) => {
		e.stopPropagation();
	};

	const addToMealPlan = (e) => {
		stateParams.addToMealPlan(recipeObject);
		e.stopPropagation();
	};

	const addToShoppingList = (e) => {
		stateParams.addToShoppingList(recipeObject.ingredients.map((ingredient) => ingredient.food));
		e.stopPropagation();
	};

	return (
		<div className="recipe-card">
			<div className="quick-actions-container">
				<IconButton
					className="quick-action-button add-to-cart"
					title="add items to shopping list"
					aria-label="add items to shopping list"
					color="primary"
					onClick={addToShoppingList}
				>
					<AddShoppingCartIcon />
				</IconButton>

				<IconButton
					className="quick-action-button meal-plan"
					title="add to meal plan"
					aria-label="add to meal plan"
					color="primary"
					onClick={addToMealPlan}
				>
					<ListAltIcon />
				</IconButton>

				<IngredientTooltip title={recipeObject.ingredientLines.join(" - ")}>
					<IconButton
						className="quick-action-button ingredients"
						aria-label="ingredients"
						color="primary"
						onClick={stopProp}
					>
						<TocIcon />
					</IconButton>
				</IngredientTooltip>
			</div>

			<div className="recipe-image">
				{!recipeImageLoaded && <ImagePlaceholder width="250" height="250" />}
				<img
					className={`${recipeImageLoaded ? "d-block" : "d-none"}`}
					alt="recipe"
					src={recipeObject.image}
					onLoad={() => setRecipeImageLoaded(true)}
				/>
			</div>

			<span className="label">{recipeObject.label}</span>
			<a className="source" href={recipeObject.url} onClick={stopProp} rel="noreferrer" target="_blank">
				<span>{recipeObject.source}</span>
			</a>
		</div>
	);
}

export default RecipeCard;
