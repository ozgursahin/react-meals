import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./NutritionDetail.scss";

export default function NutritionDetail({ mealPlan }) {
	const getNutritionData = () => {
		let fat = 0;
		let protein = 0;
		let carbs = 0;

		mealPlan.forEach((recipe) => {
			fat += recipe.totalNutrients.FAT.quantity;
			protein += recipe.totalNutrients.PROCNT.quantity;
			carbs += recipe.totalNutrients.CHOCDF.quantity;
		});

		let total = fat + protein + carbs;

		return [
			{
				name: "Protein",
				y: parseInt((protein / total) * 100),
			},
			{
				name: "Carbs",
				y: parseInt((carbs / total) * 100),
			},
			{
				name: "Fat",
				y: parseInt((fat / total) * 100),
			},
		];
	};

	const chartOptions = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: "pie",
			height: "90%",
		},
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		tooltip: {
			pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
		},
		accessibility: {
			point: {
				valueSuffix: "%",
			},
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: "pointer",
				dataLabels: {
					enabled: false,
				},
				showInLegend: true,
			},
		},
		series: [
			{
				name: "percentage",
				colorByPoint: true,
				data: getNutritionData(),
			},
		],
	};

	return (
		<div className="nutrition-detail">
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography className="accordion-header">Nutritional Details</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div className="nutrition-chart-container">
						<HighchartsReact highcharts={Highcharts} options={chartOptions} />
						<span className="information">
							These percentages represent the sum of all nutritional info in your meal plan
						</span>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
