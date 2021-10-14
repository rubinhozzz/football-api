import React, { Component } from 'react';
import { Form, Button } from 'react-bulma-components';
const { Input, Field, Label } = Form;

class NewPlayer extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		alert(1);
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit} method="post">
				<Form.Field>
					<Form.Label>Firstname</Form.Label>
					<Form.Input placeholder="Firstname" name="firstname" />
				</Form.Field>
				<Form.Field>
					<Form.Label>Lastname</Form.Label>
					<Form.Input placeholder="Lastname" name="lastname"  />
				</Form.Field>
				<Button color="success" submit="true">Create</Button>
			</form>
		)
	}
}

export default NewPlayer;
