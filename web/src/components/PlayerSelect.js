import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { App, PlayersContext } from '../App';

function PlayerSelect(props) {
	//const [players, setPlayers] = useState([]);
	const players = React.useContext(PlayersContext);

	useEffect(() => {
		/*console.log('use effect');
		async function fetchPlayers() {
			const response = await axios.get('players');
			setPlayers(response.data);
		}
		fetchPlayers();
		return () => {
			setPlayers([]);
		}*/
	}, []);

	function handleChange(event) {
		event.preventDefault();
		if ('onChange' in props)
			props.onChange(props.id, event.target.value);
	}
	let multiple = false;
	let className = 'select';
	if (props.multiple) {
		multiple = true;
		className = 'select is-multiple';
	}
	return (
		<div>
		<div className={className}>
			<select onChange={handleChange} multiple={multiple}>
				{!multiple &&
				<option value="0">---</option>
				}		
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
