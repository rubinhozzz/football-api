import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bulma-components';
import axios from 'axios';

function Matches(props) {
	const [matches, setMatches] = useState([]);
	const [locations, setLocations] = useState([]);
	const [players, setPlayers] = useState([]);
	// filters
	const [location, setLocation] = useState(0);
	const [pichichi, setPichichi] = useState(0);
	const [mvp, setMVP] = useState(0);

	useEffect(() => {
		async function fetchMaches() {
			const response = await axios.get('matches', {
				params: {	location: '0',
							pichichi: '0',
							mvp: '0'}});
			setMatches(response.data);
		}
		fetchMaches();

		async function fetchLocations() {
			const response = await axios.get('locations');
			setLocations(response.data);
		}
		fetchLocations();

		async function fetchPlayers() {
			const response = await axios.get('players');
			setPlayers(response.data);
		}
		fetchPlayers();
	}, []);

	async function handleSearch(event){
		const response = await axios.get('matches', {
				params: {	location: location,
							pichichi: pichichi,
							mvp: mvp}});
		setMatches(response.data);
	}

	const styles = {
		border: '1px solid black', 
	};
	
	return (
		<div>
			<fieldset><legend>Search by:</legend>
				Location<select onChange={(e) => setLocation(e.target.value)}>
					<option value="0">---</option>
					{
						locations.map(location => (
							<option key={location._id} value={location._id}>{location.name}</option>	
						))
					}
				</select>
				Pichichi<select onChange={(e) => setPichichi(e.target.value)}>
					<option value="0">---</option>
					{
						players.map(player => (
							<option key={player._id} value={player._id}>{player.firstname}</option>	
						))
					}
				</select>
				MVP<select onChange={(e) => setMVP(e.target.value)}>
					<option value="0">---</option>
					{
						players.map(player => (
							<option key={player._id} value={player._id}>{player.firstname}</option>	
						))
					}
				</select>
				<button className="button is-primary" onClick={handleSearch}>Search</button>
			</fieldset>
			<Button to="/matches/add" color="success" renderAs={Link}>New match</Button>
				{
					matches.map(match =>
						<div key={match._id} className="columns" style={styles}>
							<div className="column">
								{match.location.name}<br/>
								{match.datetime}
							</div>
							<div className="column">
								<b>{match.teamAName}</b>
								<ul>
								{match.teamA.map((player) => (
									<li key={player._id}>{player.firstname}</li>
								))}
								</ul>
							</div>
							<div className="column">
								<b>{match.teamBName}</b>
								<ul>
								{match.teamB.map((player) => (
									<li key={player._id}>{player.firstname}</li>
								))}
								</ul>
							</div>
							<div className="column">
								<div>Pichichi</div>
								<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCjgVv-4Cl9Z-XQT3uCV_KKtjPzSNG-q2XA&usqp=CAU"/>
								
								{match.pichichi.map((player) => (
									<div className="column">{player.firstname}</div>
								))}
							</div>
							<div className="column">
								<div>MVP</div>
								<img src="https://resources.premierleague.com/premierleague/photos/players/110x140/p176297.png"/>
								{match.mvp}
							</div>
					</div>
					)
				}
		</div>
	)
}

export default Matches
