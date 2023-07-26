import { useForm, Controller, FormProvider } from "react-hook-form";
import { useId, useEffect, useState } from "react";
import moment from 'moment/moment';
import PlayerSelect from "./PlayerSelect";
import Select from "react-select";
import { useAppContext } from '../context/state'; 

export default function MatchForm(props) {
	const id = useId();
	const appData = useAppContext();
	const [mvp, setMVP] = useState();
	const [pichichis, setPichichis] = useState();
	const [playersA, setPlayersA] = useState();
	const [playersB, setPlayersB] = useState();
	const methods = useForm({
		defaultValues: {
			location: 1,
			datetime: moment(Date.now()).format("YYYY-MM-DD"),
			teamA_name: '',
			teamA_score: 0,
			teamA_players: [],
			teamB_name: '',
			teamB_score: 0,
			teamB_players: [],			
			pichichis: null,
			mvp: null,
		}
	});

	useEffect(() => {
		if (!props.data)
			return
		methods.setValue('location', {name: props.data.location.name, id: props.data.location_id}, { shouldValidate: true});
		let dt = moment(Date.parse(props.data.datetime)).format("YYYY-MM-DD");
		methods.setValue('datetime', dt);
		methods.setValue('teamA_name', props.data.teamA_name);
		methods.setValue('teamA_score', props.data.teamA_score);
		methods.setValue('teamB_name', props.data.teamB_name);
		methods.setValue('teamB_score', props.data.teamB_score);
		methods.setValue('mvp', props.data.mvp);
		setPichichis(props.data.pichichis);
		setMVP(props.data.mvp);
		const playersA = props.data.players.filter(m => m.team == 'A').map(item => item.player);
		setPlayersA(playersA);
		const playersB = props.data.players.filter(m => m.team == 'B').map(item => item.player);
		setPlayersB(playersB);
		setPichichis(props.data.players.filter(m => m.pichichi == true).map(item => item.player));
	}, [props.data]);

	async function handleDeleteMatch(event) {
		//const response = await axios.delete(`matches/${id}`);
	}

	const validateTeams = {
		validatePlayers: () => {
			const playersA = methods.getValues('teamA_players').map(item => item.value);
			const playersB = methods.getValues('teamB_players').map(item => item.value);
			const result = playersA.filter(value => playersB.includes(value));
			if (result.length > 0)
				return false;
			return true;
		}, 
		validateAmountPlayers: () => {
			const playersA = methods.getValues('teamA_players');
			const playersB = methods.getValues('teamB_players');
			if ((playersA.length && playersB.length) && (playersA.length != playersB.length))
				return false;
			return true
		}
	}

	const validatePichichis = (items) => {
		const playersA = methods.getValues('teamA_players')?.map(item => item.value);
		const playersB = methods.getValues('teamB_players')?.map(item => item.value); 
		const pichichis = items.map(item => item.value); 
		const players = [...playersA, ... playersB];
		const diff = pichichis.filter(x => !players.includes(x));
		if (diff.length > 0)
			return false;
		return true;
	}

	const validateMVP = (item) => {
		const playersA = methods.getValues('teamA_players').map(item => item.value);
		const playersB = methods.getValues('teamB_players').map(item => item.value); 
		if ([...playersA, ... playersB].includes(item.value))
			return true;
		return false;
	}

	const errors = methods.formState.errors;
	return (
		<FormProvider {...methods}>
		<div className="w-full max-w">
		<form onSubmit={methods.handleSubmit(props.onSubmit)} className="bg-white px-8 pt-6 pb-8 mb-4">
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
							{...field} 
							instanceId={useId()}
							options={appData.locations}
							getOptionLabel={(option)=>option.name}
							getOptionValue={(option)=>option.id}
							
						/>
					}
				/>
				{errors.location?.type === 'required' && <p className="help is-danger">Location is required</p>}
			</div>
			<div className="mb-4">
				<label className="form-label">Date</label>
				<input type="date" className="form-control" {...methods.register('datetime', {required: true})}/>	
				{errors.datetime?.type === 'required' && <p className="help is-danger">Date is required</p>}
			</div>
			<div className="mb-4 flex flex-row">
				<div className="basis-1/2">
					<label className="form-label">Team A</label>
					<input type="text" className="form-control" placeholder="Team A" {...methods.register('teamA_name', {
						required: true,
						validate: validateTeams
					})}/>
					{errors.teamA_name?.type === 'required' && <p className="help is-danger">Name is required</p>}
					
					<PlayerSelect name="teamA_players"  multiple selected={playersA} validate={validateTeams}/>
					{errors.teamA_players?.type === 'required' && <p className="help is-danger">Team is required</p>}
					{errors.teamA_players?.type === 'validatePlayers' && <p className="help is-danger">Players cannot be in both teams</p>}
					{errors.teamA_players?.type === 'validateAmountPlayers' && <p className="help is-danger">Teams must have same amount of players</p>}
					<input className="form-control" placeholder="Score A" type="text" {...methods.register('teamA_score', {required: true})} />	
					
				</div>

				<div className="basis-1/2">
					<label className="form-label">Team B</label>
					<input type="text" className="form-control" placeholder="Team B" {...methods.register('teamB_name', {
						required: true,
						validate: validateTeams})}/>
					{errors.teamB_name?.type === 'required' && <p className="help is-danger">Name is required</p>}
					<PlayerSelect name="teamB_players" multiple selected={playersB} validate={validateTeams}/>
					{errors.teamB_players?.type === 'required' && <p className="help is-danger">Team is required</p>}
					{errors.teamB_players?.type === 'validatePlayers' && <p className="help is-danger">Players cannot be in both teams</p>}
					{errors.teamB_players?.type === 'validateAmountPlayers' && <p className="help is-danger">Teams must have same amount of players</p>}
					<input className="form-control" placeholder="Score B" type="text" {...methods.register('teamB_score', {required: true})}/>	
				</div>
			
			</div>
			
			<div className="mb-4">
				<label className="form-label">Pichichi</label>
				<PlayerSelect name="pichichis" multiple selected={pichichis} validate={validatePichichis}/>
				{errors.pichichis?.type === 'validate' && <p className="help is-danger">Pichichis must be part of one of the teams</p>}
			</div>
			<div className="mb-4">
				<label className="form-label">MVP</label>
				<PlayerSelect name="mvp" selected={mvp} validate={validateMVP} />
				{errors.mvp?.type === 'validate' && <p className="help is-danger">MVP must be part of one of the teams</p>}
			</div>
			<div className="flex flex-row">
				<button className="btn btn-primary" type="submit">Save</button>
				{props.data && 
				(<button className="btn btn-danger" type="button" onClick={handleDeleteMatch}>Delete</button>)
				}
			</div>
		</form>
		</div>
		</FormProvider>
	)
}
