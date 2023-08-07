
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function Players(props) {
	const { data:session, status} = useSession();
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		async function getPlayers(){
			try {
				const response = await fetch('http://192.168.178.44:8000/players/');
				const players = await response.json();
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


	function getMatchesInfo(matches) {
		const totalGames = matches.length;
		if (!totalGames)
			return [0, 0, 0, 0, []];
		let won = 0, lost = 0, draw = 0;
		let results = [];
		for (let index = 0; index < totalGames; index++) {
			const player_match = matches[index];
			const team = player_match.team;
			const match = player_match.match;
			if (match.teamA_score == match.teamB_score) {
				draw += 1;
				results.push('D');
				continue;
			}
			if (((match.teamA_score > match.teamB_score) && (team == 'A')) ||
			((match.teamB_score > match.teamA_score) && (team == 'B'))){
				won += 1;
				results.push('W')
			}
			else {
				lost += 1;
				results.push('L');
			}			
		}
		return [totalGames, won, lost, draw, results];
	}
	console.log(status);
	return (
		<>
		{(session) ? <Link href="/players/create"><button className='btn btn-primary my-2'>New player</button></Link> : null}
		<table className="min-w-full text-left text-sm font-light">
			<thead className='border-b font-medium dark:border-neutral-500'>
				<tr>
					<th className="px-6 py-4">Firstname</th>
					<th className="px-6 py-4">Lastname</th>
					<th className="px-6 py-4">Played</th>
					<th className="px-6 py-4">Won</th>
					<th className="px-6 py-4">Lost</th>
					<th className="px-6 py-4">Draw</th>
					<th className="px-6 py-4">Form</th>
					<th className="px-6 py-4"></th>
				</tr>
			</thead>
			<tbody>
			{
				players.map((el, index) => {
					const [total, won, lost, draw, results] = getMatchesInfo(el.matches); 
					return (
					<tr className='border-b dark:border-neutral-500' key={index} data-id={el.id}>
						<td>{el.firstname}</td>
						<td>{el.lastname}</td>
						<td className="text-center">{total}</td>
						<td className="text-center">{won}</td>
						<td className="text-center">{lost}</td>
						<td className="text-center">{draw}</td>
						<td>
							<div>
							{ 
							[...Array(5)].map((x, i) => {
								if (i >= results.length)
									return (<span key={i} className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full`}>-</span>)
								const result = results[i];
								let bgColor = 'bg-gray-200';
								let textColor = 'text-gray-700';
								if (result == 'W') {
									bgColor = 'bg-green-200';
									textColor = 'text-green-700';
								}
								else if (result == 'L') {
									bgColor = 'bg-red-200';
									textColor = 'text-red-700';
								}
								return (<span key={i} className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${bgColor} ${textColor} rounded-full`}>{result}</span>)
							}
							)}
							</div>
						</td>
						<td>
							{(session) ?
							<>
							<Link href={`/players/${el.id}`}>
								<button className='btn btn-primary'>Edit</button>
							</Link>
							<button className='btn btn-danger' onClick={e => handleDeleteClick(index, e)}>Remove</button></> : null
							}
						</td>
					</tr>)
				})
			}
			</tbody>
		</table>
		</>
	)
}
