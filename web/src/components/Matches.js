import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Box, Table, Button, Field, Control, Select } from 'react-bulma-components';

class Matches extends Component {
	constructor() {
		super();
		this.state = { data: [] };
	}

	async componentDidMount() {
		const response = await fetch('http://localhost:8000/matches/');
		const json = await response.json();
		console.log(json);
		this.setState({ data: json });
	}
	
	render() {
		return (
		<Box>
		<Button color="primary">New match</Button>
		<Table className="table" width="100%">
			<thead>
				<tr>
					<th>Date</th>
					<th>Location</th>
					<th>Active</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
			{this.state.data.map(el => (
			<tr key={el.id}>
				<td>{el.played_on}</td>
				<td>{el.played_on}</td>
				<td></td>
				<td>
					<Button color="info">Edit</Button>&nbsp;<Button color="danger">Remove</Button>
				</td>
			</tr>
			))}
			</tbody>
		</Table>
		</Box>
		)
	}
}

export default Matches
