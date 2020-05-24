import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar.component';
import PlayersList from './components/players-list.component';

function App() {
	return (
	<Router>
		<Navbar />
		<br/>
		<Route path="/" exact component={PlayersList} />
	</Router>
	);
}

export default App;
