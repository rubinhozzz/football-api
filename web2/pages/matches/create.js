import React from 'react';
import { useRouter } from 'next/router';
import MatchForm from '../../components/MatchForm';

export default function CreateMatch(props) {
	const router = useRouter();

	async function handleSubmit(data) {
		let {location, datetime, pichichi, mvp, teamAPlayers, teamAName, teamBPlayers, teamAScore, teamBName, teamBScore} = data;
		/*if (id) {
			console.log('UPDATE');
			const response = await axios.put(`matches/${id}`, {
				location: location,
				datetime: datetime,
				teamAName: teamAName,
				teamA: (teamA) ? teamA.map(x => x.value) : null,
				teamAScore: teamAScore,
				teamB: (teamB) ? teamB.map(x => x.value) : null,
				teamBName: teamBName,
				teamBScore: teamBScore,
				pichichi: (pichichi) ? pichichi.map(x => x.value) : null,
				mvp: (mvp) ? mvp.value : null
			});
		} else {*/
		console.log('CREATE');
		const jsonData = {
			location: location.id,
			datetime: datetime,
			teamA_name: teamAName,
			teamA_players: (teamAPlayers) ? teamAPlayers.map(x => x.value) : null,
			teamA_score: teamAScore,
			//teamB: (teamB) ? teamB.map(x => x.value) : null,
			teamB_name: teamBName,
			teamB_players: (teamBPlayers) ? teamBPlayers.map(x => x.value) : null,
			teamB_score: teamBScore,
			//pichichi: (pichichi) ? pichichi.map(x => x.value) : null,
			pichichis: (pichichi) ? pichichi.map(x => x.value) : null,
			mvp: (mvp) ? mvp.value : null
		}
		console.log(jsonData);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jsonData)
		}
		try{
			const response = await fetch('http://192.168.178.44:8000/matches/', options);
			const result = await response.json();
			//router.push('/matches');
		} catch (error) {
			alert(error);
		}
		/*const response = await axios.post('matches', {
			location: location,
			datetime: datetime,
			teamAName: teamAName,
			teamA: (teamA) ? teamA.map(x => x.value) : null,
			teamAScore: teamAScore,
			teamB: (teamB) ? teamB.map(x => x.value) : null,
			teamBName: teamBName,
			teamBScore: teamBScore,
			pichichi: (pichichi) ? pichichi.map(x => x.value) : null,
			mvp: (mvp) ? mvp.value : null
		});*/
		//}
	}

	async function handleDeleteMatch(event) {
		//const response = await axios.delete(`matches/${id}`);
	}

	return (<MatchForm onSubmit={handleSubmit}></MatchForm>)
}