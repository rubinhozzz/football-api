import React, { useEffect, useState, useId } from 'react';
import { useForm, Controller, FormProvider } from "react-hook-form";
import moment from 'moment/moment';
import PlayerSelect from '../../components/PlayerSelect';
import { useAppContext } from '../../context/state'; 
import Select from 'react-select';
import { useRouter } from 'next/router';

export default function CreateMatch(props) {
	const methods = useForm({
		defaultValues: {
			location: null,
			datetime: moment(Date.now()).format("YYYY-MM-DDTkk:mm"),
			teamAName: '',
			teamAScore: 0,
			teamAPlayers: [],
			teamBName: '',
			teamBScore: 0,
			teamBPlayers: [],			
			pichichi: null,
			mvp: null,
		}
	});
	const appData = useAppContext();
	const router = useRouter();

	useEffect(() => {
		async function fetchMatch(id) {
			const response = [];//await axios.get(`matches/${id}`);
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
		//if (id)
		//	fetchMatch(id);
	}, []);

	async function onSubmit(data) {
		let {location, datetime, pichichi, mvp, teamAPlayers, teamAName, teamBPlayers, teamAScore, teamBName, teamBScore} = data;
		/*if (id) {
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
		} else {*/
		console.log('CREATE');
		const jsonData = {
			location: location.id,
			datetime: datetime,
			teamA_name: teamAName,
			teamA_players: (teamAPlayers) ? teamAPlayers.map(x => x.value) : null,
			teamA_score: teamAScore,
			//teamB: (teamB) ? teamB.map(x => x.value) : null,
			teamB_name: teamBName,
			teamB_players: (teamBPlayers) ? teamBPlayers.map(x => x.value) : null,
			teamB_score: teamBScore,
			//pichichi: (pichichi) ? pichichi.map(x => x.value) : null,
			pichichis: (pichichi) ? pichichi.map(x => x.value) : null,
			mvp: (mvp) ? mvp.value : null
		}
		console.log(jsonData);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		}
		try{
			const response = await fetch('http://192.168.178.44:8000/matches/', options);
			const result = await response.json();
			//router.push('/matches');
		} catch (error) {
			alert(error);
		}
		/*const response = await axios.post('matches', {
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
		});*/
		//}
	}

	async function handleDeleteMatch(event) {
		//const response = await axios.delete(`matches/${id}`);
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
		<div className="w-full max-w">
		<FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label className="form-label">Location</label>
				<Controller
					name='location'
					control={methods.control}
					rules={{ 
						required: true, 
					}}
					render={({ field }) =>
						<Select 
							instanceId={useId()}
							options={appData.locations}
							getOptionLabel={(option)=>option.name}
							getOptionValue={(option)=>option.id}
							{...field}
						></Select>
					}
				/>
				{errors.location?.type === 'required' && <p className="help is-danger">Location is required</p>}
			</div>
			<div className="mb-4">
				<label className="form-label">Date</label>
				<input type="datetime-local" className="form-control" {...methods.register('datetime', {required: true})}/>	
				{errors.datetime?.type === 'required' && <p className="help is-danger">Date is required</p>}
			</div>
			<div className="mb-4 flex flex-row">
				<div className="basis-1/2">
					<label className="form-label">Team A</label>
					<input type="text" className="form-control" placeholder="Team A" {...methods.register('teamAName', {required: true})}/>
					{errors.teamAName?.type === 'required' && <p className="help is-danger">Name is required</p>}
					
					<PlayerSelect name="teamAPlayers"  multiple/>
					{errors.teamA?.type === 'required' && <p className="help is-danger">Team is required</p>}
					{errors.teamA?.type === 'validateEqualPlayers' && <p className="help is-danger">Different amount of players</p>}
					{errors.teamA?.type === 'validateDifferentPlayers' && <p className="help is-danger">Players just one team</p>}
					<input className="form-control" placeholder="Score A" type="text" {...methods.register('teamAScore', {required: true})} />	
					
				</div>

				<div className="basis-1/2">
					<label className="form-label">Team B</label>
					<input type="text" className="form-control" placeholder="Team B" {...methods.register('teamBName', {required: true})}/>
					{errors.teamBName?.type === 'required' && <p className="help is-danger">Name is required</p>}
					<PlayerSelect name="teamBPlayers" multiple />
					{errors.teamB?.type === 'required' && <p className="help is-danger">Team is required</p>}
					<input className="form-control" placeholder="Score B" type="text" {...methods.register('teamBScore', {required: true})}/>	
				</div>
			
			</div>
			
			<div className="mb-4">
				<label className="form-label">Pichichi</label>
				<PlayerSelect name="pichichi" multiple />	
			</div>
			<div className="mb-4">
				<label className="form-label">MVP</label>
				<PlayerSelect name="mvp" />	
			</div>
			<div className="flex flex-row">
				<button className="btn btn-primary" type="submit">Save</button>
				<button className="btn btn-danger" type="button" onClick={handleDeleteMatch}>Delete</button>
			</div>
		</form>
		</FormProvider>
		</div>
	)
}