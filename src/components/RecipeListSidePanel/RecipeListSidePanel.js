import React, { useReducer } from "react";
import { GreenButton, DarkRedButton, LightBlueButton } from "../UIComponents/Buttons/Buttons";
import FilterListIcon from "@material-ui/icons/FilterList";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import ListAltIcon from "@material-ui/icons/ListAlt";

import "./RecipeListSidePanel.scss";
import RecipeFilters from "../RecipeFilters/RecipeFilters";
import ShoppingList from "../ShoppingList/ShoppingList";
import MealPlanner from "../MealPlanner/MealPlanner";

const initialDrawerState = {
	recipeFilterDrawerState: false,
	shoppingListDrawerState: false,
	mealPlannerDrawerState: false,
};

const drawerReducer = (state, action) => {
	if (action.type === "field") {
		return {
			...state,
			[action.fieldName]: action.payload,
		};
	} else {
		throw new Error("drawerReducer - action type not found");
	}
};

function RecipeListSidePanel({ recipeFiltersParams, shoppingListParams, mealPlannerParams }) {
	const [drawerState, dispatchDrawerState] = useReducer(drawerReducer, initialDrawerState);

	const setDrawerState = (fieldName, payload) => {
		dispatchDrawerState({ type: "field", fieldName: fieldName, payload: payload });
	};

	recipeFiltersParams.drawerStateKey = "recipeFilterDrawerState";
	recipeFiltersParams.setDrawerState = setDrawerState;
	recipeFiltersParams.drawerState = drawerState.recipeFilterDrawerState;

	shoppingListParams.drawerStateKey = "shoppingListDrawerState";
	shoppingListParams.setDrawerState = setDrawerState;
	shoppingListParams.drawerState = drawerState.shoppingListDrawerState;

	mealPlannerParams.drawerStateKey = "mealPlannerDrawerState";
	mealPlannerParams.setDrawerState = setDrawerState;
	mealPlannerParams.drawerState = drawerState.mealPlannerDrawerState;

	return (
		<>
			<GreenButton
				className="side-panel-button"
				variant="contained"
				color="primary"
				onClick={() => setDrawerState("shoppingListDrawerState", true)}
				startIcon={<LocalGroceryStoreIcon></LocalGroceryStoreIcon>}
			>
				Shopping List
			</GreenButton>

			<DarkRedButton
				className="side-panel-button"
				variant="contained"
				color="primary"
				onClick={() => setDrawerState("mealPlannerDrawerState", true)}
				startIcon={<ListAltIcon></ListAltIcon>}
			>
				Meal Planner
			</DarkRedButton>

			<LightBlueButton
				className="side-panel-button"
				variant="contained"
				color="primary"
				onClick={() => setDrawerState("recipeFilterDrawerState", true)}
				startIcon={<FilterListIcon></FilterListIcon>}
			>
				Filter Recipes
			</LightBlueButton>

			<RecipeFilters stateParams={recipeFiltersParams}></RecipeFilters>

			<ShoppingList stateParams={shoppingListParams}></ShoppingList>

			<MealPlanner stateParams={mealPlannerParams}></MealPlanner>
		</>
	);
}

export default RecipeListSidePanel;
