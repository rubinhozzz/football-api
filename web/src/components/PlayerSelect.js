import React, { useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';

function PlayerSelect(props) {
	//const { register, setValue, getValues } = useFormContext(); 
	const players = React.useContext(PlayersContext);

	useEffect(() => {
		//console.log(props.name, props.selected);
		//setValue(props.name, props.selected);
	});

	let className = 'select';
	if (props.multiple) {
		className = 'select is-multiple';
	}
	const options = [];
	players.map(player => 
		options.push({value: player._id , label: player.firstname + ' ' + player.lastname})
	)
	// {...register(props.name)}
	return (
		<div>
			<Select options={options} isMulti={props.multiple ? 'isMulti' : ''} {...props}></Select>
		</div>
	)
}

export default PlayerSelect;
