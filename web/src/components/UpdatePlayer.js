import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

function UpdatePlayer(props) {
	const [id, setId] = useState(props.match.params.id);

	async function handleSubmit(firstname, lastname, file) {
		const data = {
			firstname,
			lastname,
			file
		}
		const formData = new FormData();
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		formData.append('file', file);
		const response = await axios.put(`players/${id}`, {firstname: firstname, lastname: lastname});
		console.log(response);
	}

	return (
		<PlayerForm dataId={id} buttonLabel="Update" handleSubmit={handleSubmit}/>
	)
}

export default UpdatePlayer;
