import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import EventBus from "../../../helpers/events/EventBus";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NotificationDisplayer({notificationKey}) {
	const [isNotificationVisible, setNotificationVisible] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");

	const handleToastClose = () => {
		setNotificationVisible(false);
	};

	const handleNotificationEvent = (event) => {
		setNotificationMessage(event.message);
		setNotificationVisible(true);
	};

	useEffect(() => {
		EventBus.on(notificationKey, handleNotificationEvent);

		return () => {
			EventBus.remove(notificationKey, handleNotificationEvent);
		};
	}, [notificationKey]);

	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={isNotificationVisible}
				autoHideDuration={1000}
				onClose={handleToastClose}
			>
				<Alert onClose={handleToastClose} severity="success">
					{notificationMessage}
				</Alert>
			</Snackbar>
		</>
	);
}

export default NotificationDisplayer;