import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "../../images/logo.svg";
import "./App.scss";

import RecipeList from "../RecipeList/RecipeList";

function App() {
	return (
		<HelmetProvider>
			<Helmet>
				<meta charSet="utf-8" />
				<title>React Meals!</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Helmet>

			<div className="App">
				<div className="header">
					<div className="header-inner">
						<div className="logo">
							<img src={logo} className="App-logo" alt="logo" />
							<span>React Meals!</span>
						</div>
					</div>
				</div>

				<div className="body">
					<RecipeList></RecipeList>
				</div>
			</div>
		</HelmetProvider>
	);
}

export default App;
