import React, { Component } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

function NewPlayer(props) {

	async function handleSubmit(firstname, lastname, file) {
		//let data = {firstname: firstname, lastname: lastname}
		let headers = {};
		const formData = new FormData();
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		if (file) {
			//data['file'] = file;
			headers = {"Content-Type": "multipart/form-data"};
			formData.append('file', file);
		}
		console.log(headers);
		const response = await axios.post('players/add', 
			formData,
			headers
		);
	}

	return (
		<PlayerForm buttonLabel="Create" handleSubmit={handleSubmit}/>
	)
}

export default NewPlayer;
