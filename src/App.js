import React from "react";
import "./App.sass";
import Home from "./pages/Home";
import Top from "./pages/Top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./pages/User";

const App = () => {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/top" component={Top} />
					<Route exact path="/" component={Home} />
					<Route exact path="/users/:id" component={User} />
				</Switch>
			</Router>
		</>
	);
};

export default App;
