import React, { useEffect, useState, useId} from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
//import axios from 'axios';
//import moment from 'moment';
import PlayerSelect from '../../components/PlayerSelect';
//import Layout from './layouts/MainLayout';
//import { getUser } from '../App';
import Link from 'next/link';

export default function Matches(props) {
	//const [user,] = useState(getUser())
	const [user,] = useState(null)
	const [matches, setMatches] = useState([]);
	const [locations, setLocations] = useState([]);
	const [, setPlayers] = useState([]);
	// filters
	const [location, setLocation] = useState(0);
	const [pichichi, setPichichi] = useState(0);
	const [mvp, setMVP] = useState(0);
	//let navigate = useNavigate();

	useEffect(() => {
		async function getMatches(){
			try {
				const response = await fetch('http://192.168.178.44:8000/matches/');
				const matches = await response.json();
				console.log(matches);
				setMatches(matches);
			} catch (error) {
				alert(error)
			}
		}
		getMatches();
	},  []);

	async function handleSearch(event){
		console.log(pichichi, mvp, location);
		/*const response = await axios.get('matches', {
				params: {	location: location,
							pichichi: pichichi,
							mvp: mvp}});*/
		//setMatches(response.data);
	}

	async function handleMatchClick(event) {
		const el = event.target.closest('.columns');
		if (!el)
			return
		const matchId = el.getAttribute('match-id');
		navigate(`/matches/${matchId}`);
	}

	const styles = {
		border: '1px solid black', 
	};

	let options = [];
	locations.map(loc => (
		options.push({value: loc._id, label: loc.name})	
	))

	return (
		<>
			<Link href={`/matches/create`}>				
			<button className="btn btn-primary">New match</button>
			</Link>
			
			<div className="field is-horizontal">
			<div className="field-body">
				<div className="field is-narrow">
					<div className="control">
						<Select 
							instanceId={useId()}
							options={options} 
							onChange={(e) => setLocation(e.value)}
							placeholder='Select location...'
							defaultValue={location}
						/>						
					</div>
				</div>
				<div className="field is-narrow">
					<div className="control">
						<PlayerSelect name="pichichi" onChange={(e) => setPichichi(e.value)} placeholder='Select pichichi...' />
					</div>
				</div>
				<div className="field is-narrow">
					<div className="control">
						<PlayerSelect name="mvp" onChange={(e) => setMVP(e.value)} placeholder='Select mvp...'/>
					</div>
				</div>
				<div className="field is-narrow">
					<button className="btn btn-primary" onClick={handleSearch}>Search</button>
				</div>
				<div className="field is-narrow">
					{user ? <Link to="/matches/add"><button className="button">New match</button></Link> : ''}
					
				</div>
				</div>
			</div>
			<br/>
			{
			
			matches.length === 0 ? 'No matches found.' : 
			matches.map((match) => {
					const datetime = moment(new Date(match.datetime)).format('YYYY-MM-DD HH:mm:ss');
					return ( 
					<div key={match._id} className="columns tile" style={styles} onClick={handleMatchClick} match-id={match._id}>
						<div className="column" match-id={match._id} >
							{match.location.name}<br/>
							{datetime}
						</div>
						<div className="column">
							<b>{match.teamAName}</b> ({match.teamAScore})
							<ul>
							{match.teamA.map((player, index) => {
								const id = `${match._id}_teamA_${index}_${player._id}`;
								return (<li key={id}>{player.firstname}</li>)
							})}
							</ul>
						</div>
						<div className="column">
							<b>{match.teamBName}</b> ({match.teamBScore})
							<ul>
							{match.teamB.map((player, index) => {
								const id = `${match._id}_teamB_${index}_${player._id}`;
								return (<li key={id}>{player.firstname}</li>)
							})}
							</ul>
						</div>
						<div className="column">
							<div>Pichichi</div>
							{
							match.pichichi.length ? 
							match.pichichi.map((player) => (
								<div className="column" key={player._id}>{player.firstname}</div>
							)) : '---'
							}
						</div>
						<div className="column">
							<div>MVP</div>
							{match.mvp ? match.mvp.firstname : '----'}
						</div>
					</div>)
				})
				}
		</>
	)
}