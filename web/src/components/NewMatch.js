import React, { useEffect, useState } from 'react';
import Team from './Team';
import axios from 'axios';
import moment from 'moment';

function NewMatch(props) {
	const [location, setLocation] = useState(0);
	const [datetime, setDatetime] = useState(moment(Date.now()).format("YYYY-MM-DDTkk:mm"));
	const [locations, setLocations] = useState([]);
	const [teamA, setTeamA] = useState([0,0,0,0,0]);
	const [teamB, setTeamB] = useState([0,0,0,0,0]);
	const [teamAName, setTeamAName] = useState(['']);
	const [teamBName, setTeamBName] = useState(['']);

	useEffect(() => {
		async function fetchLocations() {
			const response = await axios.get('locations');
			setLocations(response.data);
		}
		fetchLocations();
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		const response = await axios.post('matches', {
			location: location,
			datetime: datetime,
			teamAName: teamAName,
			teamA: teamA,
			teamB: teamB,
			teamBName: teamBName,
		});
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

	return (
		<div>
		<form onSubmit={handleSubmit}>
			<div className="field">
				<div className="label">Location:</div>
				<div className="control">
				<div className="select">
					<select onChange={e=> setLocation(e.target.value)}>
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
						onNameChange={handleNameChange}
						onPlayerChange={handlePlayerChange}/>
				</div>
				<div className="column">
					<Team id="B" 
						onNameChange={handleNameChange}
						onPlayerChange={handlePlayerChange}/>
				</div>
			</div>
			<button className="button is-primary" type="submit">Create</button>
		</form>
		</div>
	)
}

export default NewMatch;
