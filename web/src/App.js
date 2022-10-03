import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Players from './components/Players.js';
import NewPlayer from './components/NewPlayer.js';
import UpdatePlayer from './components/UpdatePlayer.js';
import Matches from './components/Matches.js';
import Match from './components/Match.js';
import ComparePlayers from './components/ComparePlayers';
import Login from './components/Login';
import axios from 'axios';

const PlayersContext = React.createContext(null);

function App() {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		console.log('use effect');
		async function fetchPlayers() {
			const response = await axios.get('players');
			setPlayers(response.data);
		}
		fetchPlayers();
		return () => {}
	}, []);

	return (
		<Router>
			<PlayersContext.Provider value={players}>
			<Switch>
				<Route path="/players/add" component={NewPlayer}></Route>
				<Route path="/players/update/:id" component={UpdatePlayer}></Route>
				<Route path="/players" component={Players}></Route>
				<Route path="/matches/add" component={Match}></Route>
				<Route path="/matches/:id" component={Match}></Route>
				<Route path="/matches" component={Matches}></Route>
				<Route path="/compare" component={ComparePlayers}></Route>
				<Route path="/login" component={Login}></Route>
				<Route path="/" component={Matches}></Route>
			</Switch>
			</PlayersContext.Provider>
		</Router>
	);
}

export default App;
export {PlayersContext};