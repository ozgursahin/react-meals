import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

import RecipeListSidePanel from "../RecipeListSidePanel/RecipeListSidePanel";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeDetail from "../RecipeDetail/RecipeDetail";
import "./RecipeList.scss";

import allRecipes from "../../recipe-db/recipes.json";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 250,
		width: 250,
	},
}));

function RecipeList() {
	const classes = useStyles();

	// Infinite scroll page size
	const PAGE_SIZE = 20;

	// State Hooks
	const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
	const [recipes, setRecipes] = useState([]);
	const [scrollerIndex, setScrollerIndex] = useState(0);
	const [hasMoreItems, setHasMoreItems] = useState(true);
	const [selectedRecipe, setSelectedRecipe] = useState(undefined);
	const [shoppingList, setShoppingList] = useState([]);
	const [mealPlan, setMealPlan] = useState([]);

	/**
	 * Infinite scroll load method
	 * @param {*} page infinite scroll page index parameter
	 * @returns
	 */
	const loadItems = function (page) {
		if (!hasMoreItems) {
			return;
		}

		let incomingRecipes = filteredRecipes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

		if (incomingRecipes.length === 0) {
			setHasMoreItems(false);
		} else if (incomingRecipes.length < PAGE_SIZE) {
			setHasMoreItems(false);
			setRecipes(recipes.concat(incomingRecipes));
		} else {
			setRecipes(recipes.concat(incomingRecipes));
		}
	};

	const addToShoppingList = (item) => {
		setShoppingList([...new Set(shoppingList.concat(item.toLowerCase()))]);
	};

	const addToMealPlan = (recipeObject) => {
		let mealIndex = mealPlan.indexOf(recipeObject);
		if (mealIndex === -1) {
			setMealPlan(mealPlan.concat(recipeObject));
		}
	}

	// State Hooks to pass
	const recipeFiltersParams = {
		setFilteredRecipes: setFilteredRecipes,
		setRecipes: setRecipes,
		setHasMoreItems: setHasMoreItems,
		setScrollerIndex: setScrollerIndex,
		scrollerIndex: scrollerIndex,
	};

	const shoppingListParams = {
		shoppingList: shoppingList,
		setShoppingList: setShoppingList,
	};

	const recipeDetailParams = {
		setSelectedRecipe: setSelectedRecipe,
		addToShoppingList: addToShoppingList,
		addToMealPlan: addToMealPlan
	};

	const mealPlannerParams = {
		mealPlan: mealPlan,
		setMealPlan: setMealPlan
	};

	const recipeCardParams = {
		addToMealPlan: addToMealPlan
	};

	return (
		<div className="forms-container">
			<div className="list-container">
				<div className="list-explorer">
					<RecipeListSidePanel
						allRecipes={allRecipes}
						recipeFiltersParams={recipeFiltersParams}
						shoppingListParams={shoppingListParams}
						mealPlannerParams={mealPlannerParams}
					></RecipeListSidePanel>
				</div>
				<div className="list" key={scrollerIndex}>
					<InfiniteScroll loadMore={loadItems} hasMore={true}>
						<Grid container className={classes.root} spacing={2}>
							<Grid item xs={12}>
								<Grid container justifyContent="center" spacing={6}>
									{recipes.map((recipe, index) => {
										return (
											<Grid key={index} item>
												<Paper
													key={index}
													className={classes.paper}
													onClick={() => setSelectedRecipe(recipe)}
												>
													<RecipeCard key={index} recipeObject={recipe.recipe} stateParams={recipeCardParams}></RecipeCard>
												</Paper>
											</Grid>
										);
									})}
								</Grid>
							</Grid>
						</Grid>
					</InfiniteScroll>

					{selectedRecipe ? (
						<RecipeDetail
							recipeObject={selectedRecipe.recipe}
							stateParams={recipeDetailParams}
						></RecipeDetail>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default RecipeList;
