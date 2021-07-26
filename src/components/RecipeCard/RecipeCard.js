import React from "react";
import "./RecipeCard.scss";
import { IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TocIcon from "@material-ui/icons/Toc";

const IngredientTooltip = withStyles((theme) => ({
	tooltip: {
		fontSize: "100%",
	},
}))(Tooltip);

function RecipeCard({ recipeObject, stateParams }) {
	const stopProp = (e) => {
		e.stopPropagation();
	};

	const addToMealPlan = (e) => {
		stateParams.addToMealPlan(recipeObject);
		e.stopPropagation();
	};

	return (
		<div className="recipe-card">
			<div className="quick-actions-container">
				<IconButton className="quick-action-button meal-plan" aria-label="add to meal plan" color="primary" onClick={addToMealPlan}>
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
			<img alt="recipe" src={recipeObject.image} />
			<span className="label">{recipeObject.label}</span>
			<a className="source" href={recipeObject.url} onClick={stopProp} rel="noreferrer" target="_blank">
				<span>{recipeObject.source}</span>
			</a>
		</div>
	);
}

export default RecipeCard;
