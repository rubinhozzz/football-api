import React, { Fragment, useState } from 'react';
import PlayerSelect from './PlayerSelect';

function Team(props) {
	const [numberOfPlayers, setNumberOfPlayers] = useState(6);
	const [players, setPlayers] = useState([]);
	const [name, setName] = useState('');

	function handlePlayerChange(id, value) {
		let p = players;
		p.push(value)
		setPlayers(p);
		props.onPlayerChange(props.id, id, value);
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
	}

	let dds = []
	for (let i = 0; i < numberOfPlayers; ++i) {
		const id = `${props.id}${i}`;
		dds.push(
			<PlayerSelect key={id} id={id} onChange={handlePlayerChange}/>
		)
	}
	const placeholderName = `Team ${props.id}`;
	return (
		<Fragment>
			<div className="control">
				<input type="text" onChange={handleNameChange} className="input" placeholder={placeholderName}/>
			</div>
			{/*<button className="button" onClick={addPlayer}>+</button><br/>*/}
			{dds}
		</Fragment>
	)
}

export default Team;
