import React, { useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

function PlayerSelect(props) {
	const methods = useFormContext();
	const players = React.useContext(PlayersContext);

	useEffect(() => {
		if (!methods)
			return
		if (!props.selected)
			return		//console.log(props.selected);
		if (Array.isArray(props.selected)) {
				let data = [];
				props.selected.forEach(item => {
					data.push({value: item._id, label: `${item.firstname} ${item.lastname}`})
				});
				console.log(data);
				methods.setValue(props.name, data);
			}
			else
				methods.setValue(props.name, {value: props.selected.id, label: `${props.selected.firstname} ${props.selected.lastname}`});
		
	});

	const options = [];
	players.map(player => 
		options.push({value: player._id , label: player.firstname + ' ' + player.lastname})
	)

	const onChangeFirst = (e)=> {
		console.log(e);
	}
	return ( (methods) ? 
		<div>
			<Controller
				name={props.name}
				defaultValue={methods.getValues(props.name) ?? ''}
				control={methods.control}
				rules={{ required: true }}
				render={({ field : { onChange, onBlur, value, ref } }) =>
					<Select 
						options={options}
						onChange={(e) => {
							onChangeFirst(value);
							onChange(e);}
						}
						value={value}
						isMulti={props.multiple ? 'isMulti' : ''}></Select>
				}
			/>
		</div>
		:
		<Select options={options} isMulti={props.multiple ? 'isMulti' : ''} ></Select>
	)
}

export default PlayerSelect;
