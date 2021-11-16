import React, { Component } from 'react';
import axios from 'axios';

class PlayerForm extends Component {
	constructor(props) {
		super(props);
		console.log('create');
		this.state = {
			firstname: props.data.firstname,
			lastname: props.data.lastname}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { firstname, lastname } = this.state;
		this.props.handleSubmit(firstname, lastname);
	}

	onChange = (event) => {
		console.log(event.target.name, event.target.value);
		this.setState({ 
			[event.target.name]: event.target.value 
		});
	}

	render() {
		console.log('render form!')
		const { firstname, lastname } = this.props.data;
		return (
			<form onSubmit={this.handleSubmit} method="post">
				<div>
					<label>Firstname</label>
					<input className="input" placeholder="Firstname" name="firstname" value={firstname} onChange={this.onChange}/>
				</div>
				<div>
					<label>Lastname</label>
					<input className="input" placeholder="Lastname" name="lastname" value={lastname} onChange={this.onChange}/>
				</div>
				<button className="button is-primary" type="submit=">{this.props.buttonLabel}</button>
			</form>
		)
	}
}

export default PlayerForm;
