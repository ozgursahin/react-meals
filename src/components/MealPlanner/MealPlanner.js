import React from "react";
import { Drawer } from "@material-ui/core";
import { GreenButton, RedButton } from "../UIComponents/Buttons/Buttons";
import CloseIcon from "@material-ui/icons/Close";

import NutritionDetail from "./NutritionDetail/NutritionDetail";
import MealPreview from "./MealPreview/MealPreview";
import PdfExporter from "../../helpers/pdf-exporter/PdfExporter";
import "./MealPlanner.scss";

export default function MealPlanner({ stateParams }) {
	const items = stateParams.mealPlan;

	const clearMealPlan = () => {
		stateParams.setMealPlan([]);
	};

	const removeMeal = (meal) => {
		stateParams.setMealPlan(
			items.filter((mealItem) => {
				return mealItem.source !== meal.source && mealItem.label !== meal.label;
			})
		);
	};

	const exportToPdf = () => {
		let pdfLines = [];

		items.forEach(recipeObject => {
			pdfLines.push("• " + recipeObject.label);
		});

		PdfExporter.exportToPdf(pdfLines, "mealPlan", "Meal Planner");
	};

	return (
		<Drawer anchor="left" variant="persistent" open={stateParams.drawerState}>
			<div className="meal-planner" id="meal-list">
				<div className="header">
					<span className="label">Meal Planner</span>
					<CloseIcon
						className="close-icon"
						fontSize="large"
						titleAccess="Close"
						onClick={() => stateParams.setDrawerState(stateParams.drawerStateKey, false)}
					/>
				</div>

				{items.length === 0 ? <span className="no-items">There are no meals in your list</span> : null}

				{items.length !== 0 ? <NutritionDetail mealPlan={items}></NutritionDetail> : null}

				<div className="items">
					{items.map((item, index) => {
						return <MealPreview key={item.uri} recipeObject={item} removeMeal={removeMeal}></MealPreview>;
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
						onClick={exportToPdf}
					>
						Export (PDF)
					</GreenButton>
				</div>
			</div>
		</Drawer>
	);
}
