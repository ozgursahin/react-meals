import React from "react";

function RecipeQuickInfo({value, label}) {
	return (
		<div className="info">
			<span className="info-value">{value}</span>
			<span className="info-label">{label}</span>
		</div>
	);
}

export default RecipeQuickInfo;