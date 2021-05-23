import React from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import Nav from './components/Menu.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Players from './components/Players.js';
import Matches from './components/Matches.js';

function App() {
	return (
		<Router>
		<div className="container is-fluid is-family-code is-size-5">
			<Nav />
			<section id="div_content">
			<Switch>
				<Route path="/players" component={Players}></Route>
				<Route path="/matches" component={Matches}></Route>
			</Switch>		
			</section>
			<footer className="footer">
				<div className="content has-text-centered">
					<p>Aves @2021</p>
				</div>
			</footer>
		</div>
		</Router>
	);
}

export default App;
