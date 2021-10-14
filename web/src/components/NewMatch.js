import React, { Component } from 'react';
import { Columns, Button, Form, Box } from 'react-bulma-components';
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
			<Button color="success">Create</Button>
			<Columns>
				<Columns.Column>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
				</Columns.Column>
				<Columns.Column>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
					<Form.Input/>
				</Columns.Column>
			</Columns>
			</Box>

		)
	}
}

export default NewMatch;
