import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import "./LoadingPanel.scss";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

function LoadingPanel({ loadingText }) {
	const classes = useStyles();

	return (
		<div className="loading-panel">
			<div className={classes.root}>
				<span className="loading-text">{loadingText}</span>
				<div className="progress-bar-container">
					<LinearProgress color="secondary" className="progress-bar" />
				</div>
			</div>
		</div>
	);
}

export default LoadingPanel;
