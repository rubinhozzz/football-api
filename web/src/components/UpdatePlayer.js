import React, { Component } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';
//import axios from '../index';

class UpdatePlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
			firstname: '',
			lastname: ''};
	}

	componentDidMount = async () => {
		try {
			const id = this.state.id;
			const response = await axios.get(`http://localhost:8000/players/${id}`);
			this.setState({'firstname': response.data.firstname, 
				'lastname': response.data.lastname});
		} catch (error) {
			alert(error)
		}
	}

	/*static getDerivedStateFromProps(props, state) {
		return {
			firstname: props.firstname,
			lastname: props.lastname}
	}*/

	handleSubmit = (firstname, lastname) => {
		const data = {
			firstname,
			lastname
		}
	}

	render() {
		console.log('render parent');
		return (
			<PlayerForm data={this.state} buttonLabel="Update" onSubmit={this.handleSubmit}/>
		)
	}
}

export default UpdatePlayer;
