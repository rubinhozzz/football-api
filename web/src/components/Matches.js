import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Box, Table, Button, Field, Control, Select, Columns } from 'react-bulma-components';
import axios from 'axios';

class Matches extends Component {
	constructor() {
		super();
		this.state = { data: [] };
	}

	async componentDidMount() {
		const response = await axios.get('matches');
		const json = await response.json();
		this.setState({ data: json });
	}
	
	render() {
		return (
		<div>
		<Button to="/matches/add" color="success" renderAs={Link}>New match</Button>
		<div>
			Location: XXX
			Date:XXX
			<Columns>
				<Columns.Column>Team 1</Columns.Column>
				<Columns.Column>Player 1</Columns.Column>
				<Columns.Column>Player 2</Columns.Column>
				<Columns.Column>Player 3</Columns.Column>
				<Columns.Column>Player 4</Columns.Column>
				<Columns.Column>Player 5</Columns.Column>
				<Columns.Column>Player 6</Columns.Column>
			</Columns>
			<Columns>
				<Columns.Column>Team 2</Columns.Column>
				<Columns.Column>Player 1</Columns.Column>
				<Columns.Column>Player 2</Columns.Column>
				<Columns.Column>Player 3</Columns.Column>
				<Columns.Column>Player 4</Columns.Column>
				<Columns.Column>Player 5</Columns.Column>
				<Columns.Column>Player 6</Columns.Column>
			</Columns>
		</div>


		<div>
			Location: XXX
			Date:XXX
			<Columns>
				<Columns.Column>Team 1</Columns.Column>
				<Columns.Column>Player 1</Columns.Column>
				<Columns.Column>Player 2</Columns.Column>
				<Columns.Column>Player 3</Columns.Column>
				<Columns.Column>Player 4</Columns.Column>
				<Columns.Column>Player 5</Columns.Column>
				<Columns.Column>Player 6</Columns.Column>
			</Columns>
			<Columns>
				<Columns.Column>Team 2</Columns.Column>
				<Columns.Column>Player 1</Columns.Column>
				<Columns.Column>Player 2</Columns.Column>
				<Columns.Column>Player 3</Columns.Column>
				<Columns.Column>Player 4</Columns.Column>
				<Columns.Column>Player 5</Columns.Column>
				<Columns.Column>Player 6</Columns.Column>
			</Columns>
		</div>
		</div>
		)
	}
}

export default Matches
