import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from 'react-router-dom'

function Login(props) {
	const methods = useForm({
		defaultValues: {
			username: '',
			password: '',			
		}
	});
	let navigate = useNavigate();

	useEffect(() => {
	}, []);

	async function onSubmit(data) {
		const {username, password} = data;
		/*const response = await axios.post('login', {
			username: username,
			password: password
		});*/
		const json = {'user_id':1, 'username': 'ruben'}
		sessionStorage.setItem('user', JSON.stringify(json))
		const next = (!props.next) ? '/' : props.next;
		navigate(next);
		window.location.reload();
	}

	const errors = methods.formState.errors;
	return (
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			<div className="field">
				<div className="label">Username</div>
				<div className="control">
					<input type="text" className="input" {...methods.register('username', {required: true})}/>
				</div>
				{errors.username?.type === 'required' && <p className="help is-danger">Username is required</p>}
			</div>
			<div className="field">
				<div className="label">Password</div>
				<div className="control">
					<input type="password" className="input" {...methods.register('password', {required: true})}/>	
				</div>
				{errors.password?.type === 'required' && <p className="help is-danger">Password is required</p>}
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button className="button is-primary" type="submit">Log in</button>
				</div>
			</div>
		</form>
	)
}

export default Login;
