import React, { Fragment, useEffect, useState } from 'react';
import PlayerSelect from './PlayerSelect';

function Team(props) {
	const [numberOfPlayers, setNumberOfPlayers] = useState(6);
	const [players, setPlayers] = useState([]);
	const [name, setName] = useState(props.id);

	useEffect(() => {
		if (props.data.name)
			setName(props.data.name);
		if (props.data.players)
			setPlayers(props.data.players);
	}, [props.data]);

	/*function handlePlayerChange(ddId, value) {
		setPlayers([...players, value]);
		props.onPlayerChange(props.id, ddId, value);
	}

	function addPlayer(event) {
		setNumberOfPlayers(numberOfPlayers+1);
	}

	function removePlayer(event) {
		setNumberOfPlayers(numberOfPlayers-1);
	}

	function handleNameChange(event) {
		event.preventDefault();
		setName(event.target.value);
		props.onNameChange(props.id, event.target.value);
	}*/

	let dds = []
	for (let i = 0; i < numberOfPlayers; ++i) {
		const id = `${props.id}${i}`;
		let value = '0';
		if (players)
			value = players[i];
		dds.push(
			<PlayerSelect key={id} id={id} name={id} register={props.register} value={value}/>
		)
	}
	const placeholderName = `Team ${props.id}`;
	const teamName = `team${props.id}Name`;
	return (
		<>
			<div className="control">
				<input type="text" name={teamName} value={name} className="input" placeholder={placeholderName} {...props.register(teamName, {required: true})}/>
			</div>
			{/*<button className="button" onClick={addPlayer}>+</button><br/>*/}
			{dds}
		</>
	)
}

export default Team;
