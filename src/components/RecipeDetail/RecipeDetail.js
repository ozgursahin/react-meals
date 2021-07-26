import { React, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import { GreenButton, DarkRedButton } from "../UIComponents/Buttons/Buttons";
import ImagePlaceholder from "../UIComponents/ImagePlaceholder/ImagePlaceholder";
import RecipeQuickInfo from "./RecipeQuickInfo/RecipeQuickInfo";
import IngredientDisplayer from "./IngredientDisplayer/IngredientDisplayer";
import NutrientDisplayer from "./NutrientDisplayer/NutrientDisplayer";
import "./RecipeDetail.scss";

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h4">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

function RecipeDetail({ recipeObject, stateParams }) {
	const [recipeImageLoaded, setRecipeImageLoaded] = useState(false);

	const handleClose = () => {
		stateParams.setSelectedRecipe(undefined);
	};

	const addToMealPlan = () => {
		stateParams.addToMealPlan(recipeObject);
	};

	const dialogTitle = recipeObject.label;

	return (
		<>
			<Dialog
				className="recipe-details-dialog"
				maxWidth="md"
				onClose={handleClose}
				aria-labelledby="recipe detail dialog"
				open={true}
			>
				<DialogTitle className="dialog-title" id="recipe-detail-dialog" onClose={handleClose}>
					{dialogTitle}
				</DialogTitle>
				<DialogContent dividers>
					<div className="recipe-details">
						<div className="row center">
							<div className="recipe-info">
								<div className="quick-info">
									<RecipeQuickInfo
										value={recipeObject.ingredients.length}
										label="Ingredients"
									></RecipeQuickInfo>

									<RecipeQuickInfo value={recipeObject.totalTime} label="Minutes"></RecipeQuickInfo>

									<RecipeQuickInfo
										value={recipeObject.perServing.calories}
										label="Calories"
									></RecipeQuickInfo>
								</div>
							</div>
							<div className="recipe-image">
								{!recipeImageLoaded && <ImagePlaceholder width="400" height="400" />}
								<img
									className={`${recipeImageLoaded ? "d-block" : "d-none"}`}
									alt="recipe"
									src={recipeObject.image}
									onLoad={() => setRecipeImageLoaded(true)}
								/>
							</div>
						</div>

						<div className="row">
							<div className="ingredients">
								<span className="title">Ingredients</span>
								{recipeObject.ingredients.map((ingredient) => {
									return (
										<IngredientDisplayer
											key={ingredient.food}
											ingredientObject={ingredient}
											addToShoppingList={stateParams.addToShoppingList}
										></IngredientDisplayer>
									);
								})}
							</div>
						</div>

						<div className="row center">
							<div className="nutrients">
								<span className="title">Nutrients</span>
								<div className="nutrients-container">
									{Object.keys(recipeObject.perServing.totalDaily).map((nutrient) => {
										return (
											<NutrientDisplayer
												key={nutrient}
												totalDaily={recipeObject.perServing.totalDaily[nutrient]}
												totalNutrient={recipeObject.perServing.totalNutrients[nutrient]}
											></NutrientDisplayer>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<DarkRedButton
						className="add-to-meal-plan"
						variant="contained"
						color="primary"
						style={{ width: "initial" }}
						onClick={addToMealPlan}
					>
						Add To Meal Plan
					</DarkRedButton>

					<GreenButton
						className="go-to-recipe"
						variant="contained"
						color="primary"
						style={{ width: "initial" }}
						href={recipeObject.url}
						rel="noreferrer"
						target="_blank"
					>
						Go To Recipe
					</GreenButton>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default RecipeDetail;
