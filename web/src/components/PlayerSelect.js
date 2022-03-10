import React, { useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import { useFormContext } from 'react-hook-form';
/*
function getSelectValues(select) {
	var result = [];
	var options = select && select.options;
	var opt;

	for (var i=0, iLen=options.length; i<iLen; i++) {
		opt = options[i];
		if (opt.selected) {
			result.push(opt.value);
		}
	}
	return result;
}*/

function PlayerSelect(props) {
	const { register, setValue, getValues } = useFormContext(); 
	const players = React.useContext(PlayersContext);

	useEffect(() => {
		//console.log(props.name, props.selected);
		setValue(props.name, props.selected);
	});

	let multiple = false;
	let className = 'select';
	if (props.multiple) {
		multiple = true;
		className = 'select is-multiple';
	} 
	return (
		<div>
		<div className={className}>
			<select multiple={multiple} {...register(props.name)}>
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
