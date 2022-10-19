import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Players from './components/Players.js';
import NewPlayer from './components/NewPlayer.js';
import UpdatePlayer from './components/UpdatePlayer.js';
import Matches from './components/Matches.js';
import Match from './components/Match.js';
import ComparePlayers from './components/ComparePlayers';
import Login from './components/Login';
import Logout from './components/Logout.js';
import axios from 'axios';

const PlayersContext = React.createContext(null);

function getUser() {
	const obj = sessionStorage.getItem('user');
	if (!obj)
		return null;
	return JSON.parse(obj);
}

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
			<Routes>
				<Route path="/players/add" element={<AuthWrapper><NewPlayer/></AuthWrapper>}/>
				<Route path="/players/update/:id" element={<UpdatePlayer/>}></Route>
				<Route path="/players" element={<Players/>}></Route>
				<Route path="/matches/add" element={<Match></Match>}/>
				<Route path="/matches/:id" element={<Match/>}></Route>
				<Route path="/matches" element={<Matches/>}></Route>
				<Route path="/compare" element={<ComparePlayers/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/logout" element={<Logout/>}></Route>
				<Route path="/" element={<Matches/>}></Route>
			</Routes>
			</PlayersContext.Provider>
		</Router>
	);
}

function AuthWrapper(props) {
	const [user,] = useState(getUser());
	const location = useLocation();
	return (!user) ?
		<Login next={location.pathname}></Login> :
		props.children;
}

export default App;
export {PlayersContext, getUser};
