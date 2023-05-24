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
	const [location, setLocation] = useState(0);
	const [pichichi, setPichichi] = useState(0);
	const [mvp, setMVP] = useState(0);
	const appData = useAppContext();
	const router = useRouter();

	useEffect(() => {
		async function getMatches(){
			try {
				const response = await fetch('http://localhost:8000/matches/');
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
		try {
			const response = await fetch('http://localhost:8000/matches/?' + new URLSearchParams({ location: location, pichichi: pichichi, mvp: mvp}));
			const matches = await response.json();
			setMatches(matches);	
		} catch (error) {
			alert(error);
		}	
	}

	async function handleMatchClick(event) {
		const el = event.target.closest('.match');
		if (!el)
			return
		const matchId = el.getAttribute('match-id');
		router.push(`/matches/${matchId}`);
	}
	console.log(matches);
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
								onChange={(e) => (e == null) ? setLocation(0) : setLocation(e.id)}
								getOptionLabel={(option)=>option.name}
								getOptionValue={(option)=>option.id}
								placeholder='Select location...'
								isClearable="true"
								
						/>						
					</div>
				</div>
				<div className="md:flex md:items-center mb-2">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Pichichi</label>
					</div>
					<div className="md:w-2/3">
						<PlayerSelect name="pichichi"  onChange={(e) => {(e == null) ? setPichichi(0) : setPichichi(e.value)}} placeholder='Select pichichi...'/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-2">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">MVP</label>
						</div>
						<div className="md:w-2/3">
							<PlayerSelect name="mvp" onChange={(e) => {(e == null) ? setMVP(0) : setMVP(e.value)}} placeholder='Select mvp...' />
						</div>
				</div>
				<div className="md:flex md:items-center">
					<div className="md:w-1/3">
						<button className="btn btn-primary" onClick={handleSearch} type="button">Search</button>
					</div>
					<div className="md:w-2/3">
						{user ? <Link to="/matches/add"><button className="button">New match</button></Link> : ''}
					</div>
				</div>	
			</form>
			{
			(matches.length === 0) ? 
				'No matches found.' :	
						(	
							<>
							<h1>Records: {matches.length}</h1>
							<div>
							{matches.map((match) => { 
								const datetime = moment(new Date(match.datetime)).format('YYYY-MM-DD HH:mm:ss');
								return (
								<div key={match.id} className="flex flex-row border match" onClick={handleMatchClick} match-id={match.id}>
									<div className="basis-1/3" match-id={match.id}>
										{match.location.name}<br />
										{datetime}
									</div>
									<div className="basis-1/3">
										<b>{match.teamA_name}</b> ({match.teamA_score})
										<ul>
											{
												match.players.filter(m => m.team == 'A').map( player => (
													<li key={player.player_id}><div className="flex">
														{player.player.firstname}
														{(match.mvp_id == player.player_id) ?  <img className="w-5 h-5" src="https://cdn-icons-png.flaticon.com/512/625/625393.png?w=1380&t=st=1684924236~exp=1684924836~hmac=22f5a425d4a06c7fc205ab73d89c733f815b9159ac1236fdf788e55e65d86d05" alt="MVP"/>: ''}
														{(player.pichichi) ? <img className="w-6 h-6" src="https://img.freepik.com/premium-vector/football-logo-design-vector-icon-template_185004-615.jpg?w=1380" alt="MVP"/>: ''}</div>
													</li>
												))												
											}
										</ul>
									</div>
									<div className="basis-1/3">
										<b>{match.teamB_name}</b> ({match.teamB_score})
										<ul>
										{
												match.players.filter(m => m.team == 'B').map( player => (
													<li key={player.player_id}>{player.player.firstname} {(match.mvp_id == player.player_id) ? 'MVP': ''}</li>
												))												
											}

										</ul>
									</div>
								</div>)
							})}
							</div>
							</>
						)
			}	
			
		</>
	)
}