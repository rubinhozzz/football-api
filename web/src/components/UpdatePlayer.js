import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

function UpdatePlayer(props) {
	const [id, setId] = useState(props.match.params.id);
	const [firstname1, setFirstname] = useState('');
	const [lastname1, setLastname] = useState('');

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`players/${id}`);
			console.log('Getting data for first time!');
			setFirstname(response.data.firstname);
			setLastname(response.data.lastname);
		}
		fetchData();
	});

	function handleSubmit(firstname, lastname) {
		const data = {
			firstname,
			lastname
		}
		alert('SUBMIT UPDATE!!!');
	}

	return (
		<PlayerForm data={{firstname: firstname1, lastname: lastname1}} buttonLabel="Update" onSubmit={handleSubmit}/>
	)
}

export default UpdatePlayer;
