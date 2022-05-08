import React, { useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

function PlayerSelect(props) {
	const methods = useFormContext();
	const players = React.useContext(PlayersContext);

	useEffect(() => {
		
		if ((methods) && (props.selected)) {
			
			if (Array.isArray(props.selected)) {
				let data = [];
				//console.log(props.selected);
				props.selected.forEach(item => {
					//console.log(`${item.firstname} ${item.lastname}`);
					data.push({value: item._id, label: `${item.firstname} ${item.lastname}`})
				});
				console.log(data);
				methods.setValue(props.name, data);
			}
			else
				methods.setValue(props.name, {value: props.selected.id, label: `${props.selected.firstname} ${props.selected.lastname}`});
		}
	});

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
					<Select {...field} options={options} isMulti={props.multiple ? 'isMulti' : ''} defaultValue={methods.getValues(props.name)}></Select>
				}
			/>
		</div>
		:
		<Select options={options} isMulti={props.multiple ? 'isMulti' : ''} {...props}></Select>
	)
}

export default PlayerSelect;
