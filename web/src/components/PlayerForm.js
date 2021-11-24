import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

function PlayerForm(props) {
	console.log(props.data)
	//const [firstname, setFirstname] = useState((props.data != null) ? props.data.firstname : '');
	//const [lastname, setLastname] = useState((props.data != null) ? props.data.lastname : '');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		props.handleSubmit(firstname, lastname);
	}

	useEffect(() => {
		//setFirstname(props.data.firstname);
		//setLastname(props.data.lastname);

	});

	return (
		<form onSubmit={handleSubmit} method="post">
			<div>
				<label>Firstname</label>
				<input type="text" className="input" placeholder="Firstname" name="firstname" value={firstname} onChange={e => setFirstname(e.target.value)}/>
			</div>
			<div>
				<label>Lastname</label>
				<input type="text" className="input" placeholder="Lastname" name="lastname" value={lastname} onChange={e => setLastname(e.target.value)}/>
			</div>
			<button className="button is-primary" type="submit">{props.buttonLabel}</button>
		</form>
	) 
}

/*
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
}*/

export default PlayerForm;
