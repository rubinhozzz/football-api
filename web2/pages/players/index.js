
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Players(props) {
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		async function getPlayers(){
			try {
				const response = await fetch('http://192.168.178.44:8000/players/');
				const players = await response.json();
				console.log(players);
				setPlayers(players);
			} catch (error) {
				alert(error)
			}
		}
		getPlayers();
	},  []);

	async function handleDeleteClick(index, event) {
		try {
			const ok = window.confirm('Do you want to remove this player?');
			if (!ok)
				return
			const el = event.target.closest('tr');
			const playerId = el.getAttribute('data-id');
			if (!playerId)
				return
			const response = await fetch(`http://192.168.178.44:8000/players/${playerId}`, {method: 'DELETE'});	
			setPlayers(players.filter((v, i) => i !== index));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	/*
	function getGameResult(game, playerId) {
		const teamA = game.teamA;
		const teamB = game.teamB;
		let winner = '';
		if (game.teamAScore > game.teamBScore)
			winner = 'A'
		else if (game.teamAScore < game.teamBScore)
			winner = 'B'
		if (teamA.includes(playerId) && winner === 'A' )
			return 'W';
		if (teamA.includes(playerId) && winner ==='B' )
			return 'L';
		if (teamB.includes(playerId) && winner === 'A' )
			return 'L';
		if (teamB.includes(playerId) && winner === 'B' )
			return 'W';
		return 'D';
	}*/
	return (
		<>
		<Link href="/players/create"><button className='btn btn-primary my-2'>New player</button></Link>
		<table className="min-w-full text-left text-sm font-light">
			<thead className='border-b font-medium dark:border-neutral-500'>
				<tr>
					<th className="px-6 py-4">Firstname</th>
					<th className="px-6 py-4">Lastname</th>
					<th className="px-6 py-4">Played</th>
					<th className="px-6 py-4">Won</th>
					<th className="px-6 py-4">Drawn</th>
					<th className="px-6 py-4">Lost</th>
					<th className="px-6 py-4">Form</th>
					<th className="px-6 py-4"></th>
				</tr>
			</thead>
			<tbody>
			{
				players.map((el, index) => 
					<tr className='border-b dark:border-neutral-500' key={el.id} data-id={el.id}>
						<td>{el.firstname}</td>
						<td>{el.lastname}</td>
						<td>{el.totalGames}</td>
						<td>{el.totalGames}</td>
						<td>{el.totalGames}</td>
						<td>{el.totalGames}</td>
						<td>
							{ /*
							el.games.map((game) => {
								const result = getGameResult(game, el._id);
								let className = ''
								if (result === 'W') className = 'is-success';
								if (result === 'L') className = 'is-danger';
								return (<><span className={'tag ' + className}>{result}</span><>&nbsp;</></>)
								}
							)*/}
						</td>
						<td>
							<Link href={`/players/${el.id}`}>
								<button className='btn btn-primary'>Edit</button>
							</Link>&nbsp;
							<button className='btn btn-danger' onClick={e => handleDeleteClick(index, e)}>Remove</button>
						</td>
					</tr>
				)
			}
			</tbody>
		</table>
		</>
	)
}
