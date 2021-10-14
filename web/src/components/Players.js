import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'
import { Box, Table, Button, Field, Control, Select } from 'react-bulma-components';

class Players extends Component {
	constructor() {
		super();
		this.state = { data: [] };
	}

	async componentDidMount() {
		const response = await fetch('http://localhost:8000/players/');
		const json = await response.json();
		this.setState({data: json})
	}
	
	render() {
		return (
		<Box>
		<Link to="/players" className="level-item">New player</Link>
		<Table className="table" width="100%">
			<thead>
				<tr>
					<th>Firstname</th>
					<th>Lastname</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{
				this.state.data.map(el => 
					<tr key={el._id}>
						<td>{el.firstname}</td>
						<td>{el.lastname}</td>
						<td>
							<Button color="info">Edit</Button>&nbsp;<Button color="danger">Remove</Button>
						</td>
					</tr>
				)
			}
			</tbody>
		</Table>
		</Box>
		)
	}
}

export default Players;
