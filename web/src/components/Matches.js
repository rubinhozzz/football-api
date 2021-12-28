import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

function Matches(props) {
	const [matches, setMatches] = useState([]);
	const [locations, setLocations] = useState([]);
	const [players, setPlayers] = useState([]);
	// filters
	const [location, setLocation] = useState(0);
	const [pichichi, setPichichi] = useState(0);
	const [mvp, setMVP] = useState(0);
	let history = useHistory();

	useEffect(() => {
		async function fetchMatches() {
			const response = await axios.get('matches', {
				params: {	location: '0',
							pichichi: '0',
							mvp: '0'}});
			setMatches(response.data);
		}
		fetchMatches();

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

	async function handleMatchClick(event) {
		const el = event.target.closest('.columns');
		if (!el)
			return
		const matchId = el.getAttribute('match-id');
		history.push(`/matches/${matchId}`);
	}

	const styles = {
		border: '1px solid black', 
	};
	
	return (
		<div>
			<div className="field is-horizontal">
			<div className="field-body">
				<div className="field is-narrow">
					<div className="control">
						<div className="select">
						<select onChange={(e) => setLocation(e.target.value)}>
							<option value="0">---</option>
							{
								locations.map(location => (
									<option key={location._id} value={location._id}>{location.name}</option>	
								))
							}
						</select>
						</div>
					</div>
				</div>
				<div className="field is-narrow">
					<div className="control">
						<div className="select">
						<select onChange={(e) => setPichichi(e.target.value)}>
							<option value="0">---</option>
							{
								players.map(player => (
									<option key={player._id} value={player._id}>{player.firstname}</option>	
								))
							}
						</select>
						</div>
					</div>
				</div>
				<div className="field is-narrow">
					<div className="control">
						<div className="select">
						<select onChange={(e) => setMVP(e.target.value)}>
						<option value="0">---</option>
						{
							players.map(player => (
								<option key={player._id} value={player._id}>{player.firstname}</option>	
							))
						}
						</select>
						</div>
					</div>
				</div>
				<div className="field is-narrow">
					<button className="button is-primary" onClick={handleSearch}>Search</button>
				</div>
				<div className="field is-narrow">
					<Link to="/matches/add"><button className="button">New match</button></Link>
				</div>
				</div>
			</div>
			<br/>
			{
			matches.length == 0 ? 'No matches found.' : 
			matches.map((match) => {
					const datetime = moment(new Date(match.datetime)).format('YYYY-MM-DD HH:mm:ss');
					return ( 
					<div key={match._id} className="columns" style={styles} onClick={handleMatchClick} match-id={match._id}>
						<div className="column" match-id={match._id} >
							{match.location.name}<br/>
							{datetime}
						</div>
						<div className="column">
							<b>{match.teamAName}</b> ({match.teamAScore})
							<ul>
							{match.teamA.map((player, index) => {
								const id = `teamA_${index}_${player._id}`;
								return (<li key={id}>{player.firstname}</li>)
							})}
							</ul>
						</div>
						<div className="column">
							<b>{match.teamBName}</b> ({match.teamBScore})
							<ul>
							{match.teamB.map((player, index) => {
								const id = `teamB_${index}_${player._id}`;
								return (<li key={id}>{player.firstname}</li>)
							})}
							</ul>
						</div>
						<div className="column">
							<div>Pichichi</div>
							{
							match.pichichi.length ? 
							match.pichichi.map((player) => (
								<div className="column">{player.firstname}</div>
							)) : '---'
							}
						</div>
						<div className="column">
							<div>MVP</div>
							{match.mvp ? match.mvp : '----'}
						</div>
					</div>)
				})
				}
		</div>
	)
}

export default Matches
