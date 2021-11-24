import React, { Component, useEffect, useState } from 'react';
import { Columns, Button } from 'react-bulma-components';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';

function NewMatch(props) {
	const [locations, setLocations] = useState([]);
	const [teamA, setTeamA] = useState([]);
	const [teamB, setTeamB] = useState([]);

	useEffect(() => {
		async function fetchLocations() {
			const response = await axios.get('locations');
			setLocations(response.data);
		}
		fetchLocations();
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		const response = await axios.post('matches/add', {
			location: '',
			date: '',
			teamA: [],
			teamB: []
		});
	}

	function handlePlayerChange(id, value) {
		alert(id);
		alert(value);
	}

	return (
		<div>
		<form onSubmit={handleSubmit}>
			<div className="field">
				<div className="label">Location:</div>
				<div className="control">
				<div className="select">
					<select>
					{
						locations.map(location => 
							<option>{location.name}</option>
						)
					}
					</select>
				</div>
				</div>
			</div>
			<div className="field">
				<div className="label">Date / time :</div>
				<div className="control">
					<input type="date" className="input"/>	
				</div>
			</div>
			<Columns>
				<Columns.Column>
					<div className="control">
						<input type="text" className="input" placeholder="Team 1"/>
					</div>
					<PlayerSelect id="A1" onChange={handlePlayerChange}/>
					<PlayerSelect id="A2" onChange={handlePlayerChange}/>
					<PlayerSelect id="A3" onChange={handlePlayerChange}/>
					<PlayerSelect id="A4" onChange={handlePlayerChange}/>
					<PlayerSelect id="A5" onChange={handlePlayerChange}/>
					<PlayerSelect id="A6" onChange={handlePlayerChange}/>
				</Columns.Column>
				<Columns.Column>
					<div className="control">
						<input type="text" className="input" placeholder="Team 2"/>		
					</div>
					<PlayerSelect id="B1" onChange={handlePlayerChange}/>
					<PlayerSelect id="B2" onChange={handlePlayerChange}/>
					<PlayerSelect id="B3" onChange={handlePlayerChange}/>
					<PlayerSelect id="B4" onChange={handlePlayerChange}/>
					<PlayerSelect id="B5" onChange={handlePlayerChange}/>
					<PlayerSelect id="B6" onChange={handlePlayerChange}/>
				</Columns.Column>
			</Columns>
			<button className="button is-primary" type="submit">Create</button>
		</form>
		</div>
	)
}

export default NewMatch;
