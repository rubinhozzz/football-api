import React, { Component } from 'react';
import { Link, Button } from 'react-router-dom';
import axios from 'axios';

class Players extends Component {
	constructor() {
		super();
		this.state = { data: [] };
	}

	componentDidMount = async () => {
		try {
			console.log(axios.defaults.baseURL)
			const response = await axios.get('http://localhost:8000/players');
			this.setState({data: response.data})	
		} catch (error) {
			alert(error)
		}
	}

	handleDeleteClick = async (event) => {
		try {
			const id = event.target.getAttribute('data-id');
			alert(id);
			const response = await axios.delete(`/players/delete/${id}`);
		} catch (error) {
			alert(error)
		}
	}

	render() {
		return (
		<div>
		<Link to="/players/add">New player</Link>
		<table className="table" width="100%">
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
							<Link to={`/players/update/${el._id}`}>Edit</Link>&nbsp;<Link to="" data-id={el._id} onClick={this.handleDeleteClick}>Remove</Link>
						</td>
					</tr>
				)
			}
			</tbody>
		</table>
		</div>
		)
	}
}

export default Players;
