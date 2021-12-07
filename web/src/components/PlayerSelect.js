import React, { Component, Fragment, useEffect, useState } from 'react';
import { PlayersContext } from '../App';

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
	const players = React.useContext(PlayersContext);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		setSelected(props.value);
	}, [props.value]);

	function handleChange(event) {
		event.preventDefault();
		if ('onChange' in props)
			if (props.multiple)
				props.onChange(getSelectValues(event.target));
			else
				props.onChange(event.target.value);
	}
	let multiple = false;
	let className = 'select';

	if (props.multiple) {
		multiple = true;
		className = 'select is-multiple';
	}
	//console.log(multiple, selected);

	return (
		<div>
		<div className={className}>
			<select onChange={handleChange} multiple={multiple} value={selected}>
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
