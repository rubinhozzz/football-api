import React, { useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import { useFormContext } from 'react-hook-form';

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
}

function PlayerSelect(props) {
	const { register, setValue } = useFormContext(); 
	const players = React.useContext(PlayersContext);
	const [selected, setSelected] = useState([]);

	/*useEffect(() => {
		if (props.multiple)
			setSelected([props.selected]);
		else
			setSelected(props.selected);
	}, [props.selected]);*/

	/*function handleChange(event) {
		event.preventDefault();
		if ('onChange' in props)
			if (props.multiple)
				props.onChange(props.id, getSelectValues(event.target));
			else
				props.onChange(props.id, event.target.value);
	}*/
	let multiple = false;
	let className = 'select';
	let value = '0';
	
	
	if (props.multiple) {
		multiple = true;
		className = 'select is-multiple';
		//value = selected;
		//props.setValue(props.name, props.selected);
	} 
	//else 
		//props.setValue(props.name, props.selected[0]);
		//value = selected[0];

	return (
		<div>
		<div className={className}>
			<select multiple={multiple} {...register(props.name)} value={props.selected}>
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
