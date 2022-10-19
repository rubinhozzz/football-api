import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Team from './Team';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';
import moment from 'moment';
import { useForm, FormProvider } from "react-hook-form";
import Layout from './layouts/MainLayout';

function Match(props) {
	const { id } = useParams();
	const methods = useForm({
		defaultValues: {
			teamA: {},
			teamB: {},			
			pichichi: {},
			mvp: null,
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
			methods.setValue('teamAScore', match.teamAScore);
			methods.setValue('teamBName', match.teamBName);
			methods.setValue('teamBScore', match.teamBScore);
			setPichichi(match.pichichi);
			setMVP(match.mvp);
			setTeamAData(match.teamA);
			setTeamBData(match.teamB);
		}
		if (id)
			fetchMatch(id);
	}, []);

	async function onSubmit(data) {
		let {location, datetime, pichichi, mvp, teamA, teamAName, teamB, teamAScore, teamBName, teamBScore} = data;
		if (id) {
			console.log('UPDATE');
			const response = await axios.put(`matches/${id}`, {
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
		const response = await axios.delete(`matches/${id}`);
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
		<Layout>
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
					<p>Team A</p>
					<div className="field">
						<div className="control">
							<input type="text" className="input" placeholder="Team A" {...methods.register('teamAName', {required: true})}/>
						</div>
						{errors.teamAName?.type === 'required' && <p className="help is-danger">Name is required</p>}
					</div>
					<div className="field">
						<div className="control">
							<PlayerSelect name="teamA" selected={teamAData} multiple 
								validate={{
									validateEqualPlayers: (value) => value.length == methods.getValues('teamB').length, 
									validateDifferentPlayers: (value) => {
										const teamA = value.map(x => x.value);
										const teamB = methods.getValues('teamB').map(x => x.value);
										const intersection = teamA.filter(x => teamB.includes(x));
										if (intersection.length == 0)
											return true;
										return false;
									}
								}} 
								required/>
						</div>
						{errors.teamA?.type === 'required' && <p className="help is-danger">Team is required</p>}
						{errors.teamA?.type === 'validateEqualPlayers' && <p className="help is-danger">Different amount of players</p>}
						{errors.teamA?.type === 'validateDifferentPlayers' && <p className="help is-danger">Players just one team</p>}
					</div>
					<div className="field">
						<div className="control">
							<input className="input" placeholder="Score A" type="text" {...methods.register('teamAScore', {required: true})} />	
						</div>
					</div>
				</div>
				<div className="column">
					<p>Team B</p>
					<div className="field">
						<div className="control">
							<input type="text" className="input" placeholder="Team B" {...methods.register('teamBName', {required: true})}/>
						</div>
						{errors.teamBName?.type === 'required' && <p className="help is-danger">Name is required</p>}
					</div>
					<div className="field">
						<div className="control">
							<PlayerSelect name="teamB" selected={teamBData} multiple required/>
						</div>
						{errors.teamB?.type === 'required' && <p className="help is-danger">Team is required</p>}
					</div>
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
					<button className="button is-primary" type="submit">
						{id ? 'Update' : 'Create'}
					</button>
				</div>
				{(id) ?
					<div className="control">
						<button className="button is-danger" type="button" onClick={handleDeleteMatch}>Delete</button>
					</div>
					: ''}
			</div>
		</form>
		</FormProvider>
		</Layout>
	)
}

export default Match;
