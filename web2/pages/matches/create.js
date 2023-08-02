import React from 'react';
import { useRouter } from 'next/router';
import MatchForm from '../../components/MatchForm';

export default function CreateMatch(props) {
	const router = useRouter();

	async function handleSubmit(data) {
		if (data.location)
			data.location = data.location.id
		if (data.teamA_players) 
			data.teamA_players = data.teamA_players.map(x => x.value)
		if (data.teamB_players) 
			data.teamB_players = data.teamB_players.map(x => x.value)
		if (data.pichichis) 
			data.pichichis = data.pichichis.map(x => x.value);
		if (data.mvp)
			data.mvp = data.mvp.value;
		console.log(data);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		try{
			const response = await fetch('http://192.168.178.44:8000/matches/', options);
			const result = await response.json();
			router.push('/matches');
		} catch (error) {
			alert(error);
		}
	}

	return (<MatchForm onSubmit={handleSubmit}></MatchForm>)
}