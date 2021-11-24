import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

function PlayerForm(props) {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		props.handleSubmit(firstname, lastname);
	}

	useEffect(() => {
		if (!props.dataId)
			return 
		async function fetchData() {
			const response = await axios.get(`players/${props.dataId}`);
			setFirstname(response.data.firstname);
			setLastname(response.data.lastname);
		}
		fetchData();
	}, []);

	return (
		<form onSubmit={handleSubmit} method="post">
			<div>
				<label>Firstname</label>
				<input type="text" className="input" placeholder="Firstname" name="firstname" value={firstname} onChange={e => setFirstname(e.target.value)}/>
			</div>
			<div>
				<label>Lastname</label>
				<input type="text" className="input" placeholder="Lastname" name="lastname" value={lastname} onChange={e => setLastname(e.target.value)}/>
			</div>
			<button className="button is-primary" type="submit">{props.buttonLabel}</button>
		</form>
	) 
}

export default PlayerForm;
