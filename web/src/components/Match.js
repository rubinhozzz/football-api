import React, { useEffect, useState } from 'react';
import Team from './Team';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';
import moment from 'moment';

function Match(props) {
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
			console.log(match);
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

	async function handleSubmit(event) {
		event.preventDefault();
		if (props.match.params.id) {
			console.log(pichichi);
			console.log(mvp);
			const response = await axios.put(`matches/${props.match.params.id}`, {
				//location: location,
				//datetime: datetime,
				//teamAName: teamAName,
				//teamA: teamA,
				teamAScore: teamAScore,
				//teamB: teamB,
				//teamBName: teamBName,
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

	function handlePichichi(value) {
		setPichichi(value);
	}

	function handleMVP(value) {
		setMVP(value);
	}
	return (
		<div>
		<form onSubmit={handleSubmit}>
			<div className="field">
				<div className="label">Location:</div>
				<div className="control">
				<div className="select">
					<select onChange={e=> setLocation(e.target.value)} value={location}>
					<option value="0">---</option>
					{
						locations.map(location => 
							<option value={location._id} key={location._id}>{location.name}</option>
						)
					}
					</select>
				</div>
				</div>
			</div>
			<div className="field">
				<div className="label">Date / time :</div>
				<div className="control">
					<input type="datetime-local" className="input" value={datetime} onChange={(e) => setDatetime(e.target.value)}/>	
				</div>
			</div>
			<div className="columns">
				<div className="column">
					<Team id="A" 
						data={teamAData}
						onNameChange={handleNameChange}
						onPlayerChange={handlePlayerChange}/>
				</div>
				<div className="column">
					<Team id="B" 
						data={teamBData}
						onNameChange={handleNameChange}
						onPlayerChange={handlePlayerChange}/>
				</div>
			</div>
			<div className="field">
				<div className="label">Score A</div>
				<div className="control">
					<input className="input" type="text" value={teamAScore} onChange={e=> setTeamAScore(e.target.value)}/>	
				</div>
			</div>
			<div className="field">
				<div className="label">Score B</div>
				<div className="control">
					<input className="input" type="text" value={teamBScore} onChange={e=> setTeamBScore(e.target.value)}/>	
				</div>
			</div>
			<div className="field">
				<div className="label">Pichichi</div>
				<div className="control">
					<PlayerSelect multiple value={pichichi} onChange={handlePichichi}/>	
				</div>
			</div>
			<div className="field">
				<div className="label">MVP</div>
				<div className="control">
					<PlayerSelect value={mvp} onChange={handleMVP}/>	
				</div>
			</div>
			
			<button className="button is-primary" type="submit">Create</button>
		</form>

		
		</div>
	)
}

export default Match;
