import React, { useState } from "react";
import { GreenButton, RedButton } from "../UIComponents/Buttons/Buttons";
import { Drawer, Slider, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import "./RecipeFilters.scss";

import { ALLERGENS } from "../../helpers/recipe-filters/Allergens";
import { INGREDIENTS } from "../../helpers/recipe-filters/Ingredients";
import ChipSelect from "../UIComponents/ChipSelect/ChipSelect";

function RecipeFilters({ stateParams }) {
	const [selectedAllergens, setSelectedAllergens] = useState([]);
	const [selectedDislikedIngredients, setSelectedDislikedIngredients] = useState([]);
	const [nutritionFilterIron, setNutritionFilterIron] = useState(0);
	const [nutritionFilterVitB12, setNutritionFilterVitB12] = useState(0);

	const nutritionFilterIronChange = (event, newValue) => {
		setNutritionFilterIron(newValue);
	};

	const nutritionFilterVitB12Change = (event, newValue) => {
		setNutritionFilterVitB12(newValue);
	};

	const applyFilters = function () {
		let filters = {
			selectedAllergens: selectedAllergens,
			dislikedIngredients: selectedDislikedIngredients,
			ingredientAmounts: {
				FE: nutritionFilterIron,
				VITB12: nutritionFilterVitB12,
			},
		};

		stateParams.applyRecipeFilters(filters);
	};

	const clearFilters = function () {
		setSelectedAllergens([]);
		setSelectedDislikedIngredients([]);
		setNutritionFilterIron(0);
		setNutritionFilterVitB12(0);

		stateParams.applyRecipeFilters({});
	};

	return (
		<Drawer anchor="left" variant="persistent" open={stateParams.recipeFilterDrawerState}>
			<div className="recipe-filters">
				<div className="header">
					<span className="label">Recipe Filters</span>
					<CloseIcon
						className="close-icon"
						fontSize="large"
						titleAccess="Close"
						onClick={() => stateParams.setRecipeFilterDrawerState(false)}
					/>
				</div>
				<div className="filters">
					<ChipSelect
						selectionKey="allergen"
						selectionLabel="Allergens"
						stateParams={{
							items: ALLERGENS,
							selectedItems: selectedAllergens,
							setSelectedItems: setSelectedAllergens,
						}}
					></ChipSelect>

					<ChipSelect
						selectionKey="dislikes"
						selectionLabel="Disliked Ingredients"
						stateParams={{
							items: INGREDIENTS,
							selectedItems: selectedDislikedIngredients,
							setSelectedItems: setSelectedDislikedIngredients,
						}}
					></ChipSelect>

					<div className="nutrient-slider-container">
						<Typography id="iron-slider" gutterBottom>
							Iron (mg)
						</Typography>
						<Slider
							defaultValue={0}
							value={nutritionFilterIron}
							onChange={nutritionFilterIronChange}
							aria-labelledby="iron-slider"
							valueLabelDisplay="auto"
							marks
							step={1}
							min={0}
							max={20}
						/>
					</div>

					<div className="nutrient-slider-container">
						<Typography id="b12-slider" gutterBottom>
							Vitamin B12 (µg)
						</Typography>
						<Slider
							defaultValue={0}
							value={nutritionFilterVitB12}
							onChange={nutritionFilterVitB12Change}
							aria-labelledby="b12-slider"
							valueLabelDisplay="auto"
							marks
							step={0.5}
							min={0}
							max={50}
						/>
					</div>
				</div>

				<div className="buttons">
					<RedButton
						className="clear-button"
						variant="contained"
						color="primary"
						onClick={() => clearFilters()}
					>
						Clear
					</RedButton>
					<GreenButton
						className="apply-button"
						variant="contained"
						color="primary"
						onClick={() => applyFilters()}
					>
						Apply
					</GreenButton>
				</div>
			</div>
		</Drawer>
	);
}

export default RecipeFilters;
