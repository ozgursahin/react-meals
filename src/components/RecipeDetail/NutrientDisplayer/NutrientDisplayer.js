import React from "react";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
import "./NutrientDisplayer.scss";

function NutrientDisplayer({ totalDaily, totalNutrient }) {
	return (
		<div className="nutrient-displayer" title={parseFloat(totalNutrient.quantity).toFixed(2) + totalNutrient.unit}>
			<span className="label">{totalDaily.label}</span>
			<CircularProgressWithLabel className="value" value={totalDaily.quantity} />
		</div>
	);
}

export default NutrientDisplayer;
