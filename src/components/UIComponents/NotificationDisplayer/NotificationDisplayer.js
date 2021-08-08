import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import EventBus from "../../../helpers/events/EventBus";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NotificationDisplayer({notificationKeys}) {
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
		notificationKeys.forEach(notificationKey => {
			EventBus.on(notificationKey, handleNotificationEvent);
		});
		
		return () => {
			notificationKeys.forEach(notificationKey => {
				EventBus.remove(notificationKey, handleNotificationEvent);
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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