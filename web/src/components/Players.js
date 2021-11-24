import React, { Component, useEffect, useState } from 'react';
import { Link, Button } from 'react-router-dom';
import axios from 'axios';

function Players(props) {
	const [players, setPlayers] = useState([]);
	
	useEffect(() => {
		async function getPlayers(){
			try {
				console.log(axios.defaults.baseURL)
				const response = await axios.get('players');
				setPlayers(response.data);
			} catch (error) {
				alert(error)
			}
		}
		getPlayers();
	}, []);

	async function handleDeleteClick(event) {
		try {
			const id = event.target.getAttribute('data-id');
			const response = await axios.delete(`players/delete/${id}`);
		} catch (error) {
			alert(error)
		}
	}

	return (
		<div>
		<Link to="/players/add">New player</Link>
		<table className="table" width="100%">
			<thead>
				<tr>
					<th>Firstname</th>
					<th>Lastname</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{
				players.map(el => 
					<tr key={el._id}>
						<td>{el.firstname}</td>
						<td>{el.lastname}</td>
						<td>
							<Link to={`/players/update/${el._id}`}>Edit</Link>&nbsp;<Link to="" data-id={el._id} onClick={handleDeleteClick}>Remove</Link>
						</td>
					</tr>
				)
			}
			</tbody>
		</table>
		</div>
		)
}

export default Players;
