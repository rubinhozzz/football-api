import React, { Component } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

function NewPlayer(props) {

	async function handleSubmit(firstname, lastname) {
		const response = await axios.post('http://localhost:8000/players/add', {firstname: firstname, lastname: lastname});
	}

	return (
		<PlayerForm buttonLabel="Create" handleSubmit={handleSubmit} data={{firstname: '', lastname: ''}} />
	)
}

export default NewPlayer;
