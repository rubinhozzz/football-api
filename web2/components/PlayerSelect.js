import React, { useEffect, useState, useId } from 'react';
//import { PlayersContext } from '../App';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { useAppContext } from '../context/state';

export default function PlayerSelect(props) {
	const methods = useFormContext();
	const appData = useAppContext();

	useEffect(() => {
		if (!methods)
			return
		if (!props.selected)
			return
		if (Array.isArray(props.selected)) {
				let data = [];
				props.selected.forEach(item => {
					data.push({value: item.id, label: `${item.firstname} ${item.lastname}`})
				});
				methods.setValue(props.name, data);
			}
			else
				methods.setValue(props.name, {value: props.selected.id, label: `${props.selected.firstname} ${props.selected.lastname}`});
		
	});

	const options = [];
	appData.players.map(player => 
		options.push({value: player.id , label: player.firstname + ' ' + player.lastname})
	)
	
	const onChangeFirst = (e)=> {
		//console.log(e);
	}
	return ( (methods) ? 
		<div>
			<Controller
				name={props.name}
				defaultValue={methods.getValues(props.name) ?? ''}
				control={methods.control}
				rules={{ 
					required: props.required ? true : false, 
					validate: props.validate ? props.validate : null}}
				render={({ field : { onChange, onBlur, value, ref } }) =>
					<Select 
						instanceId={useId()}
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
		<Select options={options} isMulti={props.multiple ? 'isMulti' : ''} value={props.selected} onChange={props.onChange} instanceId={useId()} isClearable="true"></Select>
	)
}
