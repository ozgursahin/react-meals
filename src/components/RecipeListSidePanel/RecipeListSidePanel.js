import React, { useState } from "react";
import { GreenButton, DarkRedButton, LightBlueButton } from "../UIComponents/Buttons/Buttons";
import FilterListIcon from "@material-ui/icons/FilterList";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import ListAltIcon from "@material-ui/icons/ListAlt";

import "./RecipeListSidePanel.scss";
import RecipeFilters from "../RecipeFilters/RecipeFilters";
import ShoppingList from "../ShoppingList/ShoppingList";
import MealPlanner from "../MealPlanner/MealPlanner";

function RecipeListSidePanel({ allRecipes, recipeFiltersParams, shoppingListParams, mealPlannerParams }) {
	const [recipeFilterDrawerState, setRecipeFilterDrawerState] = useState(false);
	const [shoppingListDrawerState, setShoppingListDrawerState] = useState(false);
	const [mealPlannerDrawerState, setMealPlannerDrawerState] = useState(false);

	recipeFiltersParams.setRecipeFilterDrawerState = setRecipeFilterDrawerState;
	recipeFiltersParams.recipeFilterDrawerState = recipeFilterDrawerState;

	shoppingListParams.setShoppingListDrawerState = setShoppingListDrawerState;
	shoppingListParams.shoppingListDrawerState = shoppingListDrawerState;

	mealPlannerParams.setMealPlannerDrawerState = setMealPlannerDrawerState;
	mealPlannerParams.mealPlannerDrawerState = mealPlannerDrawerState;

	return (
		<>
			<GreenButton
				className="side-panel-button"
				variant="contained"
				color="primary"
				onClick={() => setShoppingListDrawerState(true)}
				startIcon={<LocalGroceryStoreIcon></LocalGroceryStoreIcon>}
			>
				Shopping List
			</GreenButton>

			<DarkRedButton
				className="side-panel-button"
				variant="contained"
				color="primary"
				onClick={() => setMealPlannerDrawerState(true)}
				startIcon={<ListAltIcon></ListAltIcon>}
			>
				Meal Planner
			</DarkRedButton>

			<LightBlueButton
				className="side-panel-button"
				variant="contained"
				color="primary"
				onClick={() => setRecipeFilterDrawerState(true)}
				startIcon={<FilterListIcon></FilterListIcon>}
			>
				Filter Recipes
			</LightBlueButton>

			<RecipeFilters allRecipes={allRecipes} stateParams={recipeFiltersParams}></RecipeFilters>

			<ShoppingList stateParams={shoppingListParams}></ShoppingList>

			<MealPlanner stateParams={mealPlannerParams}></MealPlanner>
		</>
	);
}

export default RecipeListSidePanel;
