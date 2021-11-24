import React from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Players from './components/Players.js';
import NewPlayer from './components/NewPlayer.js';
import UpdatePlayer from './components/UpdatePlayer.js';
import Matches from './components/Matches.js';
import NewMatch from './components/NewMatch.js';

function App() {
	return (
		<Router>
			<nav class="navbar" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a class="navbar-item" href="https://bulma.io"></a>
					<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<Link to="/matches" className="navbar-item">
						<p>Matches</p>
					</Link>
					<Link to="/players" className="navbar-item">
						<p>Players</p>
					</Link>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
					<div class="buttons">
						<a class="button is-primary">
						<strong>Sign up</strong>
						</a>
						<a class="button is-light">
						Log in
						</a>
					</div>
					</div>
				</div>
				</div>
		</nav>
		<div className="container is-fluid is-family-code is-size-5">
			<section id="div_content">
			<Switch>
				<Route path="/players/add" component={NewPlayer}></Route>
				<Route path="/players/update/:id" component={UpdatePlayer}></Route>
				<Route path="/players" component={Players}></Route>
				<Route path="/matches/add" component={NewMatch}></Route>
				<Route path="/matches" component={Matches}></Route>
				<Route path="/" component={Matches}></Route>
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