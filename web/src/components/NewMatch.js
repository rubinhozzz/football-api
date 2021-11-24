import React, { Component } from 'react';
import { Columns, Button, Form, Box } from 'react-bulma-components';
import PlayerSelect from './PlayerSelect';

const { Input, Field, Label } = Form;

class NewMatch extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
	}
	
	render() {
		return (
			<Box>
			Location: <input type="text" className="input"/>	
			Date / time : <input type="date" className="input"/>	
			<Button color="success">Create</Button>
			<Columns>
				<Columns.Column>
					Team 1: <input type="text"/>		
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
				</Columns.Column>
				<Columns.Column>
				Team 2: <input type="text"/>		
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
					<PlayerSelect/>
				</Columns.Column>
			</Columns>
			</Box>

		)
	}
}

export default NewMatch;
