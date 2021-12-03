import React, { Component } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

function NewPlayer(props) {

	async function handleSubmit(firstname, lastname, file) {
		let headers = {};
		const formData = new FormData();
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		if (file) {
			headers = {"Content-Type": "multipart/form-data"};
			formData.append('file', file);
		}
		const response = await axios.post('players/add', 
			formData,
			{headers}
		);
	}

	return (
		<PlayerForm buttonLabel="Create" handleSubmit={handleSubmit}/>
	)
}

export default NewPlayer;
