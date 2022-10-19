import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlayerForm from './PlayerForm';
import Layout from './layouts/MainLayout';

function UpdatePlayer(props) {
	const { id } = useParams();

	async function handleSubmit(firstname, lastname, file) {
		let headers = {};
		const formData = new FormData();
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		if (file.length) {
			headers = {"Content-Type": "multipart/form-data"};
			formData.append('file', file[0]);
		}
		try {
			const response = await axios.put(`players/${id}`, formData, {headers});	
		} catch (error) {
			alert(error);
		} finally {
			props.history.push('/players');
		}
	}

	return (
		<Layout>
		<PlayerForm dataId={id} buttonLabel="Update" handleSubmit={handleSubmit}/>
		</Layout>
	)
}

export default UpdatePlayer;
