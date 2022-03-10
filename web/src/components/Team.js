import React, { Fragment, useEffect, useState } from 'react';
import PlayerSelect from './PlayerSelect';
import { useFormContext } from 'react-hook-form';

function Team(props) {
	const { register, setValue } = useFormContext(); 
	const [numberOfPlayers, setNumberOfPlayers] = useState(6);
	const [players, setPlayers] = useState([]);
	const teamName = `team${props.id}Name`;

	useEffect(() => {
		if (props.data.players)
			setPlayers(props.data.players);
		setValue(teamName, props.data.name);
	}, [props.data]);

	let dds = []
	for (let i = 0; i < numberOfPlayers; ++i) {
		const id = `${props.id}${i}`;
		let value = '0';
		if (players)
			value = players[i];
		dds.push(
			<PlayerSelect key={id} id={id} name={id} selected={value}/>
		)
	}

	const placeholderName = `Team ${props.id}`;
	return (
		<>
			<div className="control">
				<input type="text" name={teamName} className="input" placeholder={placeholderName} {...register(teamName, {required: true})}/>
			</div>
			{/*<button className="button" onClick={addPlayer}>+</button><br/>*/}
			{dds}
		</>
	)
}

export default Team;
