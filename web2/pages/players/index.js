
//import axios from 'axios';
//import Layout from './layouts/MainLayout';
import Link from 'next/link'

export default function Players(props) {
	/*
	useEffect(() => {
		async function getPlayers(){
			try {
				//console.log(axios.defaults.baseURL)
				const response = await axios.get('players');
				setPlayers(response.data);
			} catch (error) {
				alert(error)
			}
		}
		getPlayers();
	}, []);

	async function handleDeleteClick(event) {
		try {
			const ok = window.confirm('Do you want to remove this player?');
			if (!ok)
				return
			const el = event.target.closest('tr');
			const response = await axios.delete(`players/delete/${el.getAttribute('data-id')}`);	
			// remove player from
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

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
	const players = [];
	return (
		<>
		<Link href="/players/create"><button className='btn btn-primary'>New player</button></Link>
		<table className="table w-full table-auto border-collapse border border-slate-400">
			<thead>
				<tr>
					<th className="border border-slate-300">Firstname</th>
					<th className="border border-slate-300">Lastname</th>
					<th className="border border-slate-300">Played</th>
					<th className="border border-slate-300">Won</th>
					<th className="border border-slate-300">Drawn</th>
					<th className="border border-slate-300">Lost</th>
					<th className="border border-slate-300">Form</th>
					<th className="border border-slate-300"></th>
				</tr>
			</thead>
			<tbody>
			{
				players.map(el => 
					<tr key={el._id} data-id={el._id}>
						<td>{el.firstname}</td>
						<td>{el.lastname}</td>
						<td>{el.totalGames}</td>
						<td>{el.totalGames}</td>
						<td>30</td>
						<td>30</td>
						<td>
							{
							el.games.map((game) => {
								const result = getGameResult(game, el._id);
								let className = ''
								if (result === 'W') className = 'is-success';
								if (result === 'L') className = 'is-danger';
								return (<><span className={'tag ' + className}>{result}</span><>&nbsp;</></>)
								}
							)}
						</td>
						<td>
							<Link to={`/players/update/${el._id}`}><button className='button is-small is-info is-outlined'>Edit</button></Link>&nbsp;<button className='button is-small is-danger is-outlined' onClick={handleDeleteClick}>Remove</button>
						</td>
					</tr>
				)
			}
			</tbody>
		</table>
		</>
	)
}
