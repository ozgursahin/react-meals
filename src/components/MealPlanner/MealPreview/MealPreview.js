import { React, useState } from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import ImagePlaceholder from "../../UIComponents/ImagePlaceholder/ImagePlaceholder";

import "./MealPreview.scss";

export default function MealPreview({ recipeObject, removeMeal }) {
	const [recipeImageLoaded, setRecipeImageLoaded] = useState(false);

	return (
		<div className="meal-preview">
			<div className="recipe-image">
				{!recipeImageLoaded && <ImagePlaceholder width="50" height="50" />}
				<img
					className={`${recipeImageLoaded ? "d-block" : "d-none"}`}
					alt="recipe"
					src={recipeObject.image}
					onLoad={() => setRecipeImageLoaded(true)}
				/>
			</div>
			<div className="recipe-label" title={recipeObject.label}>{recipeObject.label}</div>

			<IconButton
				className="remove-meal"
				aria-label="remove meal from plan"
				color="primary"
				onClick={() => removeMeal(recipeObject)}
			>
				<DeleteIcon />
			</IconButton>
		</div>
	);
}
