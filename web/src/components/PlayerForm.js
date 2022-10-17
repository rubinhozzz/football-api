import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useForm } from "react-hook-form";

function PlayerForm(props) {
	const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
	const [imgSrc, setImgSrc] = useState('https://image.shutterstock.com/image-vector/prohibition-sign-no-photography-600w-209270626.jpg');

	function onSubmit(data) {
		props.handleSubmit(data.firstname, data.lastname, data.file);
	}

	useEffect(() => {
		if (!props.dataId)
			return 
		async function fetchData() {
			const response = await axios.get(`players/${props.dataId}`);
			setValue('firstname', response.data.firstname);
			setValue('lastname', response.data.lastname);
			if (response.data.profilePhoto) {
				let buff = Buffer.from(response.data.profilePhoto.data.data);
				setImgSrc('data:image/png;base64, ' + buff.toString('base64'));
			}
		}
		fetchData();
	}, []);

	return (
		<div>
		<form onSubmit={handleSubmit(onSubmit)} method="post">
			<div className="field">
				<label className="label">Firstname</label>
				<input type="text" className={errors.firstname ? 'input is-danger' : 'input'} placeholder="Firstname" name="firstname" {...register('firstname', { required: true })}/>
				{errors.firstname?.type === 'required' && (
					<p className="help is-danger">* Firstname is required</p>)}
			</div>
			<div className="field">
				<label className="label">Lastname</label>
				<input type="text" className={errors.lastname ? 'input is-danger' : 'input'} placeholder="Lastname" name="lastname" {...register('lastname', { required: true })}/>
				{errors.lastname?.type === 'required' && (
					<p className="help is-danger">* Lastname is required</p>
					)}
			</div>
			<div className="field file is-boxed">
				<label className="file-label">
					<input className="file-input" type="file" name="file" {...register('file')}/>
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
		{props.dataId ?  <img src={imgSrc} className="image is-128x128"/>: ''}
		</div>
	) 
}

export default PlayerForm;
