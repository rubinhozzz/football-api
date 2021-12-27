import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

function PlayerForm(props) {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [file, setFile] = useState(null);
	const [imgSrc, setImgSrc] = useState('https://image.shutterstock.com/image-vector/prohibition-sign-no-photography-600w-209270626.jpg');

	function handleFile(event) {
		setFile(event.target.files[0])
	}

	function handleSubmit(event) {
		event.preventDefault();
		props.handleSubmit(firstname, lastname, file);
	}

	useEffect(() => {
		if (!props.dataId)
			return 
		async function fetchData() {
			const response = await axios.get(`players/${props.dataId}`);
			setFirstname(response.data.firstname);
			setLastname(response.data.lastname);
			if (response.data.profilePhoto) {
				let buff = Buffer.from(response.data.profilePhoto.data.data);
				setImgSrc('data:image/png;base64, ' + buff.toString('base64'));
			}
		}
		fetchData();
	}, []);
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
		<img src={imgSrc} className="image is-128x128"/>
		
		</div>
	) 
}

export default PlayerForm;
