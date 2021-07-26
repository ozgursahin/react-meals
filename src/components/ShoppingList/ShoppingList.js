import React from "react";
import { Drawer } from "@material-ui/core";
import { GreenButton, RedButton } from "../UIComponents/Buttons/Buttons";
import CloseIcon from "@material-ui/icons/Close";

import ShoppingItem from "./ShoppingItem/ShoppingItem";
import "./ShoppingList.scss";

function ShoppingList({ stateParams }) {
	const items = stateParams.shoppingList;

	const clearShoppingList = () => {
		stateParams.setShoppingList([]);
	};

	const itemRemoved = (item) => {
		stateParams.setShoppingList(items.filter(shoppingItem => shoppingItem !== item));
	};

	return (
		<Drawer anchor="left" variant="persistent" open={stateParams.shoppingListDrawerState}>
			<div className="shopping-list">
				<div className="header">
					<span className="label">Shopping List</span>
					<CloseIcon
						className="close-icon"
						fontSize="large"
						titleAccess="Close"
						onClick={() => stateParams.setShoppingListDrawerState(false)}
					/>
				</div>

				{items.length === 0 ? <span className="no-items">There are no items in your list</span> : null}

				<div className="items">
					{items.map((item) => {
						return <ShoppingItem key={item} item={item} itemRemoved={itemRemoved}></ShoppingItem>;
					})}
				</div>

				<div className="buttons">
					<RedButton
						className="clear-button"
						variant="contained"
						color="primary"
						disabled={items.length === 0}
						onClick={() => clearShoppingList()}
					>
						Clear
					</RedButton>
					<GreenButton
						className="apply-button"
						variant="contained"
						color="primary"
						disabled={items.length === 0}
					>
						Export
					</GreenButton>
				</div>
			</div>
		</Drawer>
	);
}

export default ShoppingList;
