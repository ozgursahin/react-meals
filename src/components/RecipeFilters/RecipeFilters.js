import React, { useReducer } from "react";
import { GreenButton, RedButton } from "../UIComponents/Buttons/Buttons";
import { Drawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import "./RecipeFilters.scss";

import { ALLERGENS } from "../../helpers/recipe-filters/Allergens";
import { INGREDIENTS } from "../../helpers/recipe-filters/Ingredients";
import { MEAL_TYPES } from "../../helpers/recipe-filters/MealTypes";
import { DISH_TYPES } from "../../helpers/recipe-filters/DishTypes";
import { CUISINE_TYPES } from "../../helpers/recipe-filters/CuisineTypes";

import ChipSelect from "../UIComponents/ChipSelect/ChipSelect";
import FilterSlider from "../UIComponents/FilterSlider/FilterSlider";

const initialFilters = {
	selectedAllergens: [],
	dislikedIngredients: [],
	selectedMealTypes: [],
	selectedDishTypes: [],
	selectedCuisineTypes: [],
	nutritionFilterIron: 0,
	nutritionFilterCalc: 0,
	nutritionFilterVitB12: 0,
	nutritionFilterVitD: 0,
};

const filterReducer = (state, action) => {
	if (action.type === "initial") {
		return initialFilters;
	} else if (action.type === "field") {
		return {
			...state,
			[action.fieldName]: action.payload,
		};
	} else {
		throw new Error("filterReducer - action type not found");
	}
};

function RecipeFilters({ stateParams }) {
	const [filters, dispatchFilter] = useReducer(filterReducer, initialFilters);

	const setFilter = (fieldName, payload) => {
		dispatchFilter({ type: "field", fieldName: fieldName, payload: payload });
	};

	const applyFilters = function () {
		let filtersObj = {
			selectedAllergens: filters.selectedAllergens,
			dislikedIngredients: filters.dislikedIngredients,
			selectedMealTypes: filters.selectedMealTypes,
			selectedDishTypes: filters.selectedDishTypes,
			selectedCuisineTypes: filters.selectedCuisineTypes,
			ingredientAmounts: {
				FE: filters.nutritionFilterIron,
				CA: filters.nutritionFilterCalc,
				VITB12: filters.nutritionFilterVitB12,
				VITD: filters.nutritionFilterVitD,
			},
		};

		stateParams.applyRecipeFilters(filtersObj);
	};

	const clearFilters = function () {
		dispatchFilter({ type: "initial" });
		stateParams.applyRecipeFilters({});
	};

	return (
		<Drawer anchor="left" variant="persistent" open={stateParams.drawerState}>
			<div className="recipe-filters">
				<div className="header">
					<span className="label">Recipe Filters</span>
					<CloseIcon
						className="close-icon"
						fontSize="large"
						titleAccess="Close"
						onClick={() => stateParams.setDrawerState(stateParams.drawerStateKey, false)}
					/>
				</div>

				<div className="filters">
					<ChipSelect
						selectionKey="selectedAllergens"
						selectionLabel="Allergens"
						params={{
							items: ALLERGENS,
							selectedItems: filters.selectedAllergens,
							setSelectedItems: setFilter,
						}}
					></ChipSelect>

					<ChipSelect
						selectionKey="dislikedIngredients"
						selectionLabel="Disliked Ingredients"
						params={{
							items: INGREDIENTS,
							selectedItems: filters.dislikedIngredients,
							setSelectedItems: setFilter,
						}}
					></ChipSelect>

					<ChipSelect
						selectionKey="selectedMealTypes"
						selectionLabel="Meal Types"
						params={{
							items: MEAL_TYPES,
							selectedItems: filters.selectedMealTypes,
							setSelectedItems: setFilter,
						}}
					></ChipSelect>

					<ChipSelect
						selectionKey="selectedDishTypes"
						selectionLabel="Dish Types"
						params={{
							items: DISH_TYPES,
							selectedItems: filters.selectedDishTypes,
							setSelectedItems: setFilter,
						}}
					></ChipSelect>

					<ChipSelect
						selectionKey="selectedCuisineTypes"
						selectionLabel="Cuisine Types"
						params={{
							items: CUISINE_TYPES,
							selectedItems: filters.selectedCuisineTypes,
							setSelectedItems: setFilter,
						}}
					></ChipSelect>

					<FilterSlider
						stateKey="nutritionFilterIron"
						label="Iron (mg)"
						sliderOptions={{
							step: 1,
							max: 20,
						}}
						params={{
							sliderValue: filters.nutritionFilterIron,
							setSliderValue: setFilter,
						}}
					></FilterSlider>
					
					<FilterSlider
						stateKey="nutritionFilterCalc"
						label="Calcium (mg)"
						sliderOptions={{
							step: 5,
							max: 1000,
						}}
						params={{
							sliderValue: filters.nutritionFilterCalc,
							setSliderValue: setFilter,
						}}
					></FilterSlider>

					<FilterSlider
						stateKey="nutritionFilterVitB12"
						label="Vitamin B12 (µg)"
						sliderOptions={{
							step: 0.5,
							max: 50,
						}}
						params={{
							sliderValue: filters.nutritionFilterVitB12,
							setSliderValue: setFilter,
						}}
					></FilterSlider>

					<FilterSlider
						stateKey="nutritionFilterVitD"
						label="Vitamin D (µg)"
						sliderOptions={{
							step: 0.5,
							max: 50,
						}}
						params={{
							sliderValue: filters.nutritionFilterVitD,
							setSliderValue: setFilter,
						}}
					></FilterSlider>
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
