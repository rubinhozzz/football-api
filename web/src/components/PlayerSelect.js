import React, { useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

function PlayerSelect(props) {
	const methods = useFormContext();
	console.log(methods);
	const players = React.useContext(PlayersContext);

	useEffect(() => {
		//console.log(props.name, props.selected);
		//methods.setValue(props.name, props.selected);
	});

	let className = 'select';
	if (props.multiple) {
		className = 'select is-multiple';
	}
	const options = [];
	players.map(player => 
		options.push({value: player._id , label: player.firstname + ' ' + player.lastname})
	)
	return ( (methods) ? 
		<div>
			<Controller
				name={props.name}
				control={methods.control}
				render={({ field }) =>
					<Select {...field} options={options} isMulti={props.multiple ? 'isMulti' : ''}></Select>
				}
			/>
		</div>
		:
		<Select options={options} isMulti={props.multiple ? 'isMulti' : ''} {...props}></Select>
	)
}

export default PlayerSelect;
