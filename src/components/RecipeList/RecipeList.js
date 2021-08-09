import React, { useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { EJSON } from "bson";

import RecipeListSidePanel from "../RecipeListSidePanel/RecipeListSidePanel";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeDetail from "../RecipeDetail/RecipeDetail";
import LoadingPanel from "../UIComponents/LoadingPanel/LoadingPanel";
import NotificationDisplayer from "../UIComponents/NotificationDisplayer/NotificationDisplayer";
import EventBus from "../../helpers/events/EventBus";
import "./RecipeList.scss";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 250,
		width: 250,
	},
}));

const GET_RECIPES_BY_FILTER_API =
	"https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/react-meals-fqsnj/service/ReactMealsHttp/incoming_webhook/getRecipesByFilters?secret=reactmeals89";

const scrollerParamsInitialState = {
	scrollerIndex: 0,
	scrollerPageIndex: 1,
	hasMoreItems: true,
	isRecipesLoading: false,
	recipeLoadingError: undefined,
};

const scrollerParamsReducer = (state, action) => {
	if (action.type === "filtersApplied") {
		return {
			scrollerIndex: state.scrollerIndex + 1,
			scrollerPageIndex: 1,
			hasMoreItems: true,
			isRecipesLoading: false,
			recipeLoadingError: undefined
		};
	} 
	else if (action.type === "fetchCompleted") {
		return {
			...state,
			hasMoreItems: action.payload.hasMoreItems,
			recipeLoadingError: action.payload.recipeLoadingError,
			scrollerPageIndex: action.payload.scrollerPageIndex,
			isRecipesLoading: action.payload.isRecipesLoading,
		};
	} 
	else if (action.type === "field") {
		return {
			...state,
			[action.fieldName]: action.payload,
		};
	} 
	else {
		throw new Error("scrollerParamsReducer - action type not found");
	}
};

function RecipeList() {
	const classes = useStyles();

	// Infinite scroll related hooks and variables
	const PAGE_SIZE = 20;
	const [loadedRecipes, setLoadedRecipes] = useState([]);
	const [scrollerParams, dispatchScrollerParams] = useReducer(scrollerParamsReducer, scrollerParamsInitialState);

	const setScrollerParamsState = (fieldName, payload) => {
		dispatchScrollerParams({ type: "field", fieldName: fieldName, payload: payload });
	};

	// Recipe filter hooks
	const [recipeFilters, setRecipeFilters] = useState({});

	// Recipe detail hooks
	const [selectedRecipe, setSelectedRecipe] = useState(undefined);

	// Shopping list hooks
	const [shoppingList, setShoppingList] = useState([]);

	// Meal plan hooks
	const [mealPlan, setMealPlan] = useState([]);

	const applyRecipeFilters = (filters) => {
		setRecipeFilters(filters);
		setLoadedRecipes([]);
		
		// Reset the infinite scroll states
		dispatchScrollerParams({type: "filtersApplied"});
	};

	const fetchRecipes = (page) => {
		return axios
			.post(GET_RECIPES_BY_FILTER_API, {
				filters: recipeFilters,
				startIndex: (page - 1) * PAGE_SIZE,
				limit: PAGE_SIZE,
			})
			.then(function (response) {
				let result = response.data;
				return EJSON.parse(EJSON.stringify(result, { relaxed: true }));
			});
	};

	/**
	 * Infinite scroll load method
	 */
	const loadItems = function () {
		if (!scrollerParams.hasMoreItems || scrollerParams.isRecipesLoading) {
			return;
		}

		setScrollerParamsState("isRecipesLoading", true)

		console.debug("FETCH PAGE!: ", scrollerParams.scrollerPageIndex);

		let hasMoreItems = scrollerParams.hasMoreItems;
		let errorMessage;
		let scrollerPageIndex = scrollerParams.scrollerPageIndex;
		fetchRecipes(scrollerPageIndex)
			.then((incomingRecipes) => {
				if (incomingRecipes) {
					if (incomingRecipes.length === 0) {
						hasMoreItems = false;
					} else if (incomingRecipes.length < PAGE_SIZE) {
						hasMoreItems = false;
						loadedRecipes.push(...incomingRecipes);
						setLoadedRecipes(loadedRecipes);
					} else {
						loadedRecipes.push(...incomingRecipes);
						setLoadedRecipes(loadedRecipes);
					}
				}
				scrollerPageIndex += 1;
			})
			.catch(function (error) {
				errorMessage = error.message || error;
				console.error(error);
				hasMoreItems = false;
			})
			.finally(() => {
				dispatchScrollerParams({type: "fetchCompleted", payload: {
					hasMoreItems: hasMoreItems,
					recipeLoadingError: errorMessage,
					scrollerPageIndex: scrollerPageIndex,
					isRecipesLoading: false
				}});
			});
	};

	const shoppingNotificationKey = "shoppingListChanged";

	/**
	 * Add item to shopping list
	 * @param {*} item item to add
	 */
	const addToShoppingList = (items) => {
		items.forEach((item) => {
			let lowercasedItem = item.toLowerCase();
			if (shoppingList.indexOf(lowercasedItem) < 0) {
				shoppingList.push(lowercasedItem);
			}
		});

		setShoppingList(shoppingList);

		EventBus.dispatch(shoppingNotificationKey, { message: "Items added to shopping list." });
	};

	const mealPlanNotificationKey = "mealPlanChanged";

	/**
	 * Add recipe to meal plan
	 * @param {*} recipeObject recipe object to add
	 */
	const addToMealPlan = (recipeObject) => {
		let mealFound = mealPlan.some((recipe) => recipeObject.uri === recipe.uri);
		if (!mealFound) {
			mealPlan.push(recipeObject);
			setMealPlan(mealPlan);
			EventBus.dispatch(mealPlanNotificationKey, { message: "Recipe added to meal plan." });
		} else {
			EventBus.dispatch(mealPlanNotificationKey, { message: "Recipe already added to meal plan." });
		}
	};

	const recipeFiltersParams = {
		applyRecipeFilters: applyRecipeFilters,
	};

	const shoppingListParams = {
		shoppingList: shoppingList,
		setShoppingList: setShoppingList,
	};

	const recipeDetailParams = {
		setSelectedRecipe: setSelectedRecipe,
		addToShoppingList: addToShoppingList,
		addToMealPlan: addToMealPlan,
	};

	const mealPlannerParams = {
		mealPlan: mealPlan,
		setMealPlan: setMealPlan,
	};

	const recipeCardParams = {
		addToMealPlan: addToMealPlan,
		addToShoppingList: addToShoppingList,
	};

	return (
		<div className="forms-container">
			<div className="list-container">
				<div className="list-explorer">
					<RecipeListSidePanel
						recipeFiltersParams={recipeFiltersParams}
						shoppingListParams={shoppingListParams}
						mealPlannerParams={mealPlannerParams}
					></RecipeListSidePanel>
				</div>
				<div className="list" key={scrollerParams.scrollerIndex}>
					<InfiniteScroll
						loadMore={loadItems}
						hasMore={true}
						threshold={150}
						className={`is-container ${loadedRecipes.length ? "" : "list-not-loaded"}`}
					>
						<Grid container className={classes.root} spacing={2}>
							<Grid item xs={12}>
								<Grid container justifyContent="center" spacing={6}>
									{loadedRecipes.map((recipe) => {
										return (
											<Grid key={recipe.recipe.uri} item>
												<Paper
													key={recipe.recipe.uri}
													className={classes.paper}
													onClick={() => setSelectedRecipe(recipe)}
												>
													<RecipeCard
														key={recipe.recipe.uri}
														recipeObject={recipe.recipe}
														stateParams={recipeCardParams}
													></RecipeCard>
												</Paper>
											</Grid>
										);
									})}
								</Grid>
							</Grid>
						</Grid>
					</InfiniteScroll>

					{scrollerParams.isRecipesLoading ? (
						<LoadingPanel loadingText="loading recipes..."></LoadingPanel>
					) : loadedRecipes.length ? null : (
						<div className="no-results-warning">No results matched your search criteria</div>
					)}

					{scrollerParams.recipeLoadingError ? <div className="recipe-loading-error">{scrollerParams.recipeLoadingError}</div> : null}

					{selectedRecipe ? (
						<RecipeDetail
							recipeObject={selectedRecipe.recipe}
							stateParams={recipeDetailParams}
						></RecipeDetail>
					) : null}
				</div>
				<NotificationDisplayer
					notificationKeys={[shoppingNotificationKey, mealPlanNotificationKey]}
				></NotificationDisplayer>
			</div>
		</div>
	);
}

export default RecipeList;
