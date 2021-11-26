import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';

function PlayerSelect(props) {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		async function fetchPlayers() {
			const response = await axios.get('players');
			setPlayers(response.data);
		}
		fetchPlayers();
	});

	function handleChange(event) {
		event.preventDefault();
		if ('onChange' in props)
			props.onChange(props.id, event.target.value);
	}

	return (
		<div>
		<div className="select">
			<select onChange={handleChange}>
				<option value="0">---</option>
				{
				players.map(player => 
					<option value={player._id} key={player._id}>{player.firstname} {player.lastname}</option>
				)
			}</select>
		</div>
		</div>
	)
}

export default PlayerSelect;
