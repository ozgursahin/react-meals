import { withStyles } from "@material-ui/core/styles";
import { green, red, lightBlue } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const GreenButton = withStyles((theme) => ({
	root: {
		color: "white",
		fontWeight: "bold",
		fontSize: "115%",
		backgroundColor: green[500],
		"&:hover": {
			backgroundColor: green[700],
		},
		width: "100%",
	},
}))(Button);

const DarkRedButton = withStyles((theme) => ({
	root: {
		color: "white",
		fontWeight: "bold",
		fontSize: "115%",
		backgroundColor: "#963d3d",
		"&:hover": {
			backgroundColor: "#c55353",
		},
		width: "100%",
	},
}))(Button);

const RedButton = withStyles((theme) => ({
	root: {
		color: "white",
		fontWeight: "bold",
		fontSize: "115%",
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700],
		},
		width: "100%",
	},
}))(Button);

const LightBlueButton = withStyles((theme) => ({
	root: {
		color: "white",
		fontWeight: "bold",
		fontSize: "115%",
		backgroundColor: lightBlue[500],
		"&:hover": {
			backgroundColor: lightBlue[700],
		},
		width: "100%",
	},
}))(Button);

export { GreenButton, RedButton, LightBlueButton, DarkRedButton };
