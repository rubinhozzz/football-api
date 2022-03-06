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
			const ok = window.confirm('Do you want to remove this player?');
			if (!ok)
				return
			const el = event.target.closest('tr');
			const response = await axios.delete(`players/delete/${el.getAttribute('data-id')}`);	
			// remove player from
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	return (
		<div>
		<Link to="/players/add"><button className='button '>New player</button></Link>
		<table className="table is-narrow" width="100%">
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
					<tr key={el._id} data-id={el._id}>
						<td>{el.firstname}</td>
						<td>{el.lastname}</td>
						<td>
							<Link to={`/players/update/${el._id}`}><button className='button is-small is-info is-outlined'>Edit</button></Link>&nbsp;<button className='button is-small is-danger is-outlined' onClick={handleDeleteClick}>Remove</button>
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
