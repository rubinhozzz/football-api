import React, { Component } from 'react';
import { Form, Button } from 'react-bulma-components';
import axios from 'axios';
import PlayerForm from './PlayerForm';
const { Input, Field, Label } = Form;

class NewPlayer extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = async(firstname, lastname) => {
		const response = await axios.post('http://localhost:8000/players/add', {firstname: firstname, lastname: lastname});
	}

	render() {
		return (
			<PlayerForm buttonLabel="Create" handleSubmit={this.handleSubmit} data=""/>
		)
	}
}

export default NewPlayer;
