import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import "./ShoppingItem.scss";

export default function ShoppingItem({ item, itemRemoved }) {
	return (
		<div className="shopping-item">
			<span className="label">{item}</span>

			<IconButton
				className="remove-item"
				aria-label="remove item from shopping list"
				color="primary"
				onClick={() => itemRemoved(item)}
			>
				<DeleteIcon />
			</IconButton>
		</div>
	);
}
