import React, { useEffect, useState } from 'react';
import Team from './Team';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';
import moment from 'moment';
import { useForm } from "react-hook-form";

function Match(props) {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [teamAData, setTeamAData] = useState({});
	const [teamBData, setTeamBData] = useState({});
	const [location, setLocation] = useState(0);
	const [datetime, setDatetime] = useState(moment(Date.now()).format("YYYY-MM-DDTkk:mm"));
	const [locations, setLocations] = useState([]);
	const [teamA, setTeamA] = useState([0,0,0,0,0]);
	const [teamB, setTeamB] = useState([0,0,0,0,0]);
	const [teamAName, setTeamAName] = useState('');
	const [teamBName, setTeamBName] = useState('');
	const [teamAScore, setTeamAScore] = useState(0);
	const [teamBScore, setTeamBScore] = useState(0);
	const [pichichi, setPichichi] = useState([]);
	const [mvp, setMVP] = useState('');

	useEffect(() => {
		async function fetchLocations() {
			const response = await axios.get('locations');
			setLocations(response.data);
		}
		fetchLocations();

		async function fetchMatch(id) {
			const response = await axios.get(`matches/${id}`);
			const match = response.data;
			setLocation(match.location);
			setTeamAData({name: response.data.teamAName, players: response.data.teamA});
			setTeamBData({name: response.data.teamBName, players: response.data.teamB});
			setTeamAScore(match.teamAScore);
			setTeamBScore(match.teamBScore);
			setPichichi(match.pichichi);
			setMVP(match.mvp);
		}
		if (props.match.params.id)
			fetchMatch(props.match.params.id);
	}, []);

	function _getTeams(prefix, data) {
		let team = [];
		const keys = Object.keys(data);
		keys.forEach((key, index) => {
			if ((key.substring(0,1) == prefix) && (data[key] != '0'))
				team.push(data[key]);
		});
		return team;
	}

	async function onSubmit(data) {
		let {location, datetime, pichichi, mvp, teamAName, teamAScore, teamBName, teamBScore} = data;
		const teamA = _getTeams('A', data);
		const teamB = _getTeams('B', data);
		if (props.match.params.id) {
			console.log('UPDATE');
			const response = await axios.put(`matches/${props.match.params.id}`, {
				location: location,
				datetime: datetime,
				teamAName: teamAName,
				teamA: teamA,
				teamAScore: teamAScore,
				teamB: teamB,
				teamBName: teamBName,
				teamBScore: teamBScore,
				pichichi: pichichi,
				mvp: mvp
			});
		} else {
			const response = await axios.post('matches', {
				location: location,
				datetime: datetime,
				teamAName: teamAName,
				teamA: teamA,
				teamAScore: teamAScore,
				teamB: teamB,
				teamBName: teamBName,
				teamBScore: teamBScore,
				pichichi: pichichi,
				mvp: mvp
			});
		}
	}

	async function handleDeleteMatch(event) {
		const response = await axios.delete(`matches/${props.match.params.id}`);
	}

	function handlePlayerChange(teamId, ddId, value) {
		let team = teamA; 
		if (teamId == 'B')
			team = teamB;

		team[ddId[1]] = value;
		if (teamId == 'A')
			setTeamA(team);
		else
			setTeamB(team);
	}

	function handleNameChange(teamId, name) {
		if (teamId == 'A')
			setTeamAName(name);
		else
			setTeamBName(name);
	}
/*
	function handlePichichi(value) {
		setPichichi(value);
	}

	function handleMVP(value) {
		setMVP(value);
	}*/

	return (
		<div>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="field">
				<div className="label">Location</div>
				<div className="control">
				<div className="select">
					<select {...register('location', {required: true})}>
						<option value="">---</option>
						{
							locations.map(location => 
								<option value={location._id} key={location._id}>{location.name}</option>
							)
						}
					</select>
				</div>
				{errors.location?.type === 'required' && (
					<p className="help is-danger">* Location is required</p>)}
				</div>
			</div>
			<div className="field">
				<div className="label">Date / time</div>
				<div className="control">
					<input type="datetime-local" className="input" defaultValue={datetime} {...register('datetime', {required: true})}/>	
				</div>
			</div>
			<div className="columns">
				<div className="column">
					<Team id="A" 
						data={teamAData}
						onNameChange={handleNameChange}
						onPlayerChange={handlePlayerChange}
						register={register}/>
				</div>
				<div className="column">
					<Team id="B" 
						data={teamBData}
						onNameChange={handleNameChange}
						onPlayerChange={handlePlayerChange}
						register={register}/>
				</div>
			</div>
			<div className="field">
				<div className="label">Score A</div>
				<div className="control">
					<input className="input" defaultValue={teamAScore} type="text" {...register('teamAScore', {required: true})} />	
				</div>
			</div>
			<div className="field">
				<div className="label">Score B</div>
				<div className="control">
					<input className="input" defaultValue={teamBScore} type="text" {...register('teamBScore', {required: true})}/>	
				</div>
			</div>
			<div className="field">
				<div className="label">Pichichi</div>
				<div className="control">
					<PlayerSelect name="pichichi" multiple register={register}/>	
				</div>
			</div>
			<div className="field">
				<div className="label">MVP</div>
				<div className="control">
					<PlayerSelect name="mvp" register={register}/>	
				</div>
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button className="button is-primary" type="submit">Create</button>
				</div>
				{(props.match.params.id) ?
					<div className="control">
						<button className="button is-danger" type="button" onClick={handleDeleteMatch}>Delete</button>
					</div>
					: ''}
			</div>
		</form>

		
		</div>
	)
}

export default Match;
