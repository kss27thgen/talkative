import React from "react";
import "./App.sass";
import Home from "./pages/Home";
import Top from "./pages/Top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/top" component={Top} />
					<Route exact path="/" component={Home} />
				</Switch>
			</Router>
		</>
	);
};

export default App;
