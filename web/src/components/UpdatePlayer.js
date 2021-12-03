import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

function UpdatePlayer(props) {
	const [id, setId] = useState(props.match.params.id);

	async function handleSubmit(firstname, lastname, file) {
		let headers = {};
		const formData = new FormData();
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		if (file) {
			headers = {"Content-Type": "multipart/form-data"};
			formData.append('file', file);
		}
		const response = await axios.put(`players/${id}`, 
			formData,
			{headers}
		);
	}

	return (
		<PlayerForm dataId={id} buttonLabel="Update" handleSubmit={handleSubmit}/>
	)
}

export default UpdatePlayer;
