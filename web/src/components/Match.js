import React, { useEffect, useState } from 'react';
import Team from './Team';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';
import moment from 'moment';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

function Match(props) {
	const methods = useForm();
	const [teamAData, setTeamAData] = useState({});
	const [teamBData, setTeamBData] = useState({});
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
			methods.setValue('location', match.location);
			let dt = moment(Date.parse(match.datetime)).format("YYYY-MM-DDTkk:mm");
			methods.setValue('datetime', dt);
			methods.setValue('teamAScore', match.teamAScore);
			methods.setValue('teamBScore', match.teamBScore);
			setPichichi(match.pichichi);
			alert(match.mvp);
			setMVP(match.mvp);
			setTeamAData({name: response.data.teamAName, players: response.data.teamA});
			setTeamBData({name: response.data.teamBName, players: response.data.teamB});
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
			console.log('CREATE');
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
			</div>
			<div className="field">
				<div className="label">Date / time</div>
				<div className="control">
					<input type="datetime-local" className="input" {...methods.register('datetime', {required: true})} defaultValue={datetime}/>	
				</div>
			</div>
			<div className="columns">
				<div className="column">
					<Team id="A" data={teamAData}/>
				</div>
				<div className="column">
					<Team id="B" data={teamBData}/>
				</div>
			</div>
			<div className="field">
				<div className="label">Score A</div>
				<div className="control">
					<input className="input" type="text" {...methods.register('teamAScore', {required: true})} />	
				</div>
			</div>
			<div className="field">
				<div className="label">Score B</div>
				<div className="control">
					<input className="input" type="text" {...methods.register('teamBScore', {required: true})}/>	
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
