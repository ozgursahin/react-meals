import React from "react";
import { Drawer } from "@material-ui/core";
import { GreenButton, RedButton } from "../UIComponents/Buttons/Buttons";
import CloseIcon from "@material-ui/icons/Close";

import NutritionDetail from "./NutritionDetail/NutritionDetail";
import MealPreview from "./MealPreview/MealPreview";
import "./MealPlanner.scss";

export default function MealPlanner({ stateParams }) {
	const items = stateParams.mealPlan;

	const clearMealPlan = () => {
		stateParams.setMealPlan([]);
	};

	const removeMeal = (meal) => {
		stateParams.setMealPlan(items.filter(mealItem => {
			return mealItem.source !== meal.source && mealItem.label !== meal.label;
		}));
	};

	return (
		<Drawer anchor="left" variant="persistent" open={stateParams.mealPlannerDrawerState}>
			<div className="meal-planner">
				<div className="header">
					<span className="label">Meal Planner</span>
					<CloseIcon
						className="close-icon"
						fontSize="large"
						titleAccess="Close"
						onClick={() => stateParams.setMealPlannerDrawerState(false)}
					/>
				</div>

				{items.length === 0 ? <span className="no-items">There are no meals in your list</span> : null}

				{items.length !== 0 ? <NutritionDetail mealPlan={items}></NutritionDetail> : null}

				<div className="items">
					{items.map((item, index) => {
						return <MealPreview key={index} recipeObject={item} removeMeal={removeMeal}></MealPreview>;
					})}
				</div>

				<div className="buttons">
					<RedButton
						className="clear-button"
						variant="contained"
						color="primary"
						disabled={items.length === 0}
						onClick={() => clearMealPlan()}
					>
						Clear Plan
					</RedButton>
					<GreenButton
						className="apply-button"
						variant="contained"
						color="primary"
						disabled={items.length === 0}
					>
						Export
					</GreenButton>
				</div>
			</div>
		</Drawer>
	);
}
