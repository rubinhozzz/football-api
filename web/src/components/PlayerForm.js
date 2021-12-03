import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

function PlayerForm(props) {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [file, setFile] = useState(null);

	function handleFile(event) {
		setFile(event.target.files[0])
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(file);
		props.handleSubmit(firstname, lastname, file);
	}

	useEffect(() => {
		if (!props.dataId)
			return 
		async function fetchData() {
			const response = await axios.get(`players/${props.dataId}`);
			setFirstname(response.data.firstname);
			setLastname(response.data.lastname);
			let  buff = Buffer.from(response.data.profilePhoto.data.data);
			setFile(buff.toString('base64'));
			console.log(response.data);
		}
		fetchData();
	}, []);

	const img = `data:image/png;base64, ${file}`;
	//console.log(img);

	return (
		<div>
		<form onSubmit={handleSubmit} method="post">
			<div className="field">
				<label className="label">Firstname</label>
				<input type="text" className="input" placeholder="Firstname" name="firstname" value={firstname} onChange={e => setFirstname(e.target.value)}/>
			</div>
			<div className="field">
				<label className="label">Lastname</label>
				<input type="text" className="input" placeholder="Lastname" name="lastname" value={lastname} onChange={e => setLastname(e.target.value)}/>
			</div>
			<div className="field file is-boxed">
				<label className="file-label">
					<input className="file-input" type="file" name="file" onChange={handleFile}/>
					<span className="file-cta">
						<span className="file-icon">
						<i className="fas fa-upload"></i>
						</span>
						<span className="file-label">
						Choose a photo profile...
						</span>
					</span>
				</label>
			</div>
			<div className="field">
				<button className="button is-primary" type="submit">{props.buttonLabel}</button>
			</div>
		</form>
		<img src={img}/>
		</div>
	) 
}

export default PlayerForm;
