import React, { useEffect, useState, useId} from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
//import axios from 'axios';
import moment from 'moment';
import PlayerSelect from '../../components/PlayerSelect';
//import Layout from './layouts/MainLayout';
//import { getUser } from '../App';
import { useAppContext } from '../../context/state'; 
import { useRouter } from 'next/router';

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
	const appData = useAppContext();
	const router = useRouter();

	useEffect(() => {
		async function getMatches(){
			try {
				
				const response = await fetch('http://192.168.137.248:8000/matches/');
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
		const el = event.target.closest('.match');
		if (!el)
			return
		const matchId = el.getAttribute('match-id');
		router.push(`/matches/${matchId}`);
	}

	const styles = {
		border: '1px solid black', 
	};

	return (
		<>
			<Link href={`/matches/create`}>				
			<button className="btn btn-secondary mt-2">New match</button>
			</Link>
			
			<form className="w-full max-w-sm mt-2 mb-2">
				<div className="md:flex md:items-center mb-2">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Location</label>
					</div>
					<div className="md:w-2/3">
						<Select 
								instanceId={useId()}
								options={appData.locations} 
								//onChange={(e) => setLocation(e.value)}
								getOptionLabel={(option)=>option.name}
								getOptionValue={(option)=>option.id}
								placeholder='Select location...'
								
						/>						
					</div>
				</div>
				<div className="md:flex md:items-center mb-2">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Pichichi</label>
					</div>
					<div className="md:w-2/3">
						<PlayerSelect name="pichichi" onChange={(e) => setPichichi(e.value)} placeholder='Select pichichi...' multiple/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-2">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">MVP</label>
						</div>
						<div className="md:w-2/3">
							<PlayerSelect name="mvp" onChange={(e) => setMVP(e.value)} placeholder='Select mvp...' multiple/>
						</div>
				</div>
				<div className="md:flex md:items-center">
					<div className="md:w-1/3">
						<button className="btn btn-primary" onClick={handleSearch}>Search</button>
					</div>
					<div className="md:w-2/3">
						{user ? <Link to="/matches/add"><button className="button">New match</button></Link> : ''}
					</div>
				</div>	
			</form>
			{
			
			matches.length === 0 ? 'No matches found.' : 
			matches.map((match) => {
					const datetime = moment(new Date(match.datetime)).format('YYYY-MM-DD HH:mm:ss');
					return ( 
					<div key={match.id} className="flex flex-row match" style={styles} onClick={handleMatchClick} match-id={match.id}>
						<div className="basis-1/3" match-id={match.id} >
							{match.location_id}<br/>
							{match.datetime}
						</div>
						<div className="basis-1/3">
							<b>{match.teamA_name}</b> ({match.teamA_score})
							<ul>
							
							</ul>
						</div>
						<div className="basis-1/3">
							<b>{match.teamB_name}</b> ({match.teamB_score})
							<ul>
							
							</ul>
						</div>
					</div>)
				})
				}
		</>
	)
}