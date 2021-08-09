import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from "@material-ui/core";

import "./ChipSelect.scss";

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

function ChipSelect({ selectionKey, selectionLabel, params }) {
	const classes = useStyles();
	const theme = useTheme();

	function getStyles(item, theme) {
		return {
			fontWeight:
				params.selectedItems.indexOf(item) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
			backgroundColor: params.selectedItems.indexOf(item) === -1 ? "white" : "#963d3d",
			color: params.selectedItems.indexOf(item) === -1 ? "black" : "white",
		};
	}

	const selectedItemsChanged = (event) => {
		params.setSelectedItems(selectionKey, event.target.value);
	};

	return (
		<div className="chip-selection">
			<FormControl className={classes.formControl}>
				<InputLabel className="form-select-label" id={selectionKey + "-select-label"}>
					Select {selectionLabel}
				</InputLabel>
				<Select
					labelId={selectionKey + "-select-label"}
					id={selectionKey + "-select"}
					multiple
					value={params.selectedItems}
					onChange={selectedItemsChanged}
					input={<Input id={"select-multiple-" + selectionKey} />}
					renderValue={(selected) => (
						<div className={classes.chips}>
							{selected.map((value) => (
								<Chip key={value} label={value} className={classes.chip} />
							))}
						</div>
					)}
				>
					{params.items.map((item) => (
						<MenuItem key={item} value={item} style={getStyles(item, theme)}>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default ChipSelect;
