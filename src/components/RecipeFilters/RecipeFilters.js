import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { GreenButton, RedButton } from "../UIComponents/Buttons/Buttons";
import { Drawer, Chip, FormControl, Input, InputLabel, MenuItem, Select, Slider, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import "./RecipeFilters.scss";

import { ALLERGENS } from "../../helpers/recipe-filters/Allergens";
import { INGREDIENTS } from "../../helpers/recipe-filters/Ingredients";

const useStyles = makeStyles((theme) => ({
	control: {
		padding: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 280,
		maxWidth: 280,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
}));

function RecipeFilters({ stateParams }) {
	const classes = useStyles();
	const theme = useTheme();

	const [selectedAllergens, setSelectedAllergens] = useState([]);
	const [dislikedIngredients, setDislikedIngredients] = useState([]);
	const [nutritionFilterIron, setNutritionFilterIron] = useState(0);
	const [nutritionFilterVitB12, setNutritionFilterVitB12] = useState(0);

	function getStyles(item, selectedItems, theme) {
		return {
			fontWeight:
				selectedItems.indexOf(item) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
			backgroundColor: selectedItems.indexOf(item) === -1 ? "white" : "#963d3d",
			color: selectedItems.indexOf(item) === -1 ? "black" : "white",
		};
	}

	const nutritionFilterIronChange = (event, newValue) => {
		setNutritionFilterIron(newValue);
	};

	const nutritionFilterVitB12Change = (event, newValue) => {
		setNutritionFilterVitB12(newValue);
	};

	const selectedAllergensChanged = (event) => {
		setSelectedAllergens(event.target.value);
	};

	const dislikedIngredientsChanged = (event) => {
		setDislikedIngredients(event.target.value);
	};

	const nutritionFilterIronText = (value) => {
		return `${value} mg`;
	};

	const nutritionFilterVitB12Text = (value) => {
		return `${value} µg`;
	};

	const applyFilters = function () {
		let filters = {
			selectedAllergens: selectedAllergens,
			dislikedIngredients: dislikedIngredients,
			ingredientAmounts: {
				FE: nutritionFilterIron,
				VITB12: nutritionFilterVitB12,
			},
		};

		stateParams.applyRecipeFilters(filters);
	};

	const clearFilters = function () {
		setSelectedAllergens([]);
		setDislikedIngredients([]);
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
					<div className="allergen-selection">
						<FormControl className={classes.formControl}>
							<InputLabel className="form-select-label" id="allergens-select-label">
								Select Allergens
							</InputLabel>
							<Select
								labelId="allergens-select-label"
								id="allergens-select"
								multiple
								value={selectedAllergens}
								onChange={selectedAllergensChanged}
								input={<Input id="select-multiple-allergens" />}
								renderValue={(selected) => (
									<div className={classes.chips}>
										{selected.map((value) => (
											<Chip key={value} label={value} className={classes.chip} />
										))}
									</div>
								)}
							>
								{ALLERGENS.map((allergen) => (
									<MenuItem
										key={allergen}
										value={allergen}
										style={getStyles(allergen, selectedAllergens, theme)}
									>
										{allergen}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="disliked-ingredients-selection">
						<FormControl className={classes.formControl}>
							<InputLabel className="form-select-label" id="dislikes-select-label">
								Disliked Ingredients
							</InputLabel>
							<Select
								labelId="dislikes-select-label"
								id="dislikes-select"
								multiple
								value={dislikedIngredients}
								onChange={dislikedIngredientsChanged}
								input={<Input id="select-multiple-ingredients" />}
								renderValue={(selected) => (
									<div className={classes.chips}>
										{selected.map((value) => (
											<Chip key={value} label={value} className={classes.chip} />
										))}
									</div>
								)}
							>
								{INGREDIENTS.map((ingredient) => (
									<MenuItem
										key={ingredient}
										value={ingredient}
										style={getStyles(ingredient, dislikedIngredients, theme)}
									>
										{ingredient}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div className="nutrient-slider-container">
						<Typography id="iron-slider" gutterBottom>
							Iron (mg)
						</Typography>
						<Slider
							defaultValue={0}
							value={nutritionFilterIron}
							onChange={nutritionFilterIronChange}
							getAriaValueText={nutritionFilterIronText}
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
							getAriaValueText={nutritionFilterVitB12Text}
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
