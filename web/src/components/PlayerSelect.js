import React, { Component, useEffect, useState } from 'react';
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

	return (
		<div>
		<div className="select">
			<select>{
				players.map(player => 
					<option>{player.firstname}</option>
				)
			}</select>
		</div>
		</div>
	)
}

export default PlayerSelect;
