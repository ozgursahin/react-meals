import React from "react";
import { Slider, Typography } from "@material-ui/core";

import "./FilterSlider.scss";

function FilterSlider({stateKey, label, sliderOptions, params}) {
	const onSliderChange = (event, newValue) => {
		params.setSliderValue(stateKey, newValue);
	};

	return (
		<div className="slider-container">
			<Typography id={stateKey + "-slider"} gutterBottom>
				{label}
			</Typography>
			<Slider
				defaultValue={0}
				value={params.sliderValue}
				onChange={onSliderChange}
				aria-labelledby={stateKey + "-slider"}
				valueLabelDisplay="auto"
				marks
				step={sliderOptions.step}
				min={0}
				max={sliderOptions.max}
			/>
		</div>
	);
}

export default FilterSlider;
