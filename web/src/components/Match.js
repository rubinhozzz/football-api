import React, { useEffect, useState } from 'react';
import Team from './Team';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';
import moment from 'moment';
import { useForm, FormProvider } from "react-hook-form";

function Match(props) {
	const methods = useForm({
		defaultValues: {
			teamA: {},
			teamB: {},			
			pichichi: {},
			mvp: {},

		}
	});
	const [teamAData, setTeamAData] = useState([]);
	const [teamBData, setTeamBData] = useState([]);
	const [datetime, setDatetime] = useState(moment(Date.now()).format("YYYY-MM-DDTkk:mm"));
	const [locations, setLocations] = useState([]);
	const [mvp, setMVP] = useState('');
	const [pichichi, setPichichi] = useState([]);

	useEffect(() => {
		async function fetchLocations() {
			const response = await axios.get('locations');
			setLocations(response.data);
		}
		fetchLocations();

		async function fetchMatch(id) {
			const response = await axios.get(`matches/${id}`);
			const match = response.data;
			console.log(match);
			methods.setValue('location', match.location._id);
			let dt = moment(Date.parse(match.datetime)).format("YYYY-MM-DDTkk:mm");
			methods.setValue('datetime', dt);
			methods.setValue('teamAName', match.teamAName);
			//methods.setValue('teamAData', match.teamA);
			methods.setValue('teamAScore', match.teamAScore);
			methods.setValue('teamBName', match.teamBName);
			//methods.setValue('teamBData', match.teamB);
			methods.setValue('teamBScore', match.teamBScore);
			setPichichi(match.pichichi);
			setMVP(match.mvp);
			setTeamAData(match.teamA);
			setTeamBData(match.teamB);
		}
		if (props.match.params.id)
			fetchMatch(props.match.params.id);
	}, []);

	async function onSubmit(data) {
		let {location, datetime, pichichi, mvp, teamA, teamAName, teamB, teamAScore, teamBName, teamBScore} = data;
		if (props.match.params.id) {
			console.log('UPDATE');
			const response = await axios.put(`matches/${props.match.params.id}`, {
				location: location,
				datetime: datetime,
				teamAName: teamAName,
				teamA: (teamA) ? teamA.map(x => x.value) : null,
				teamAScore: teamAScore,
				teamB: (teamB) ? teamB.map(x => x.value) : null,
				teamBName: teamBName,
				teamBScore: teamBScore,
				pichichi: (pichichi) ? pichichi.map(x => x.value) : null,
				mvp: (mvp) ? mvp.value : null
			});
		} else {
			console.log('CREATE');
			const response = await axios.post('matches', {
				location: location,
				datetime: datetime,
				teamAName: teamAName,
				teamA: (teamA) ? teamA.map(x => x.value) : null,
				teamAScore: teamAScore,
				teamB: (teamB) ? teamB.map(x => x.value) : null,
				teamBName: teamBName,
				teamBScore: teamBScore,
				pichichi: (pichichi) ? pichichi.map(x => x.value) : null,
				mvp: (mvp) ? mvp.value : null
			});
		}
	}

	async function handleDeleteMatch(event) {
		const response = await axios.delete(`matches/${props.match.params.id}`);
	}

	const validateTeams = {
		validateEqualPlayers: (value) => {
			console.log(value);
			return true;
		}, 
		validateDifferentPlayers: (value) => {
			console.log(value);
			return true;
		}
	}
	const errors = methods.formState.errors;
	return (
		<div>
		<FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			<div className="field">
				<div className="label">Location</div>
				<div className="control">
				<div className="select">
					<select name="location" {...methods.register('location', {required: true})}>
						<option value="">---</option>
						{
							locations.map(loc => 
								<option value={loc._id} key={loc._id}>{loc.name}</option>
							)
						}
					</select>
					
				</div>
				</div>
				{errors.location?.type === 'required' && <p className="help is-danger">Location is required</p>}
			</div>
			<div className="field">
				<div className="label">Date / time</div>
				<div className="control">
					<input type="datetime-local" className="input" {...methods.register('datetime', {required: true})} defaultValue={datetime}/>	
				</div>
				{errors.datetime?.type === 'required' && <p className="help is-danger">Datetime is required</p>}
			</div>
			<div className="columns">
				<div className="column">
					<h1>Team A</h1>
					<input type="text" className="input" placeholder="Team A" {...methods.register('teamAName', {required: true})}/>
					{errors.teamAName?.type === 'required' && <p className="help is-danger">Name is required</p>}
					<PlayerSelect name="teamA" selected={teamAData} multiple validate={validateTeams} oponent="teamB" required/>
					{errors.teamA?.type === 'required' && <p className="help is-danger">Team is required</p>}
					<div className="field">
						<div className="control">
							<input className="input" placeholder="Score A" type="text" {...methods.register('teamAScore', {required: true})} />	
						</div>
					</div>
				</div>
				<div className="column">
					<h1>Team B</h1>
					<input type="text" className="input" placeholder="Team B" {...methods.register('teamBName', {required: true})}/>
					{errors.teamBName?.type === 'required' && <p className="help is-danger">Name is required</p>}
					<PlayerSelect name="teamB" selected={teamBData} multiple validate={validateTeams} required/>
					{errors.teamB?.type === 'required' && <p className="help is-danger">Team is required</p>}
					<div className="field">
					<div className="control">
						<input className="input" placeholder="Score B" type="text" {...methods.register('teamBScore', {required: true})}/>	
					</div>
					</div>
				</div>
			
			</div>
			
			<div className="field">
				<div className="label">Pichichi</div>
				<div className="control">
					<PlayerSelect name="pichichi" multiple selected={pichichi}/>	
				</div>
			</div>
			<div className="field">
				<div className="label">MVP</div>
				<div className="control">
					<PlayerSelect name="mvp" selected={mvp}/>	
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
		</FormProvider>
		</div>
	)
}

export default Match;
