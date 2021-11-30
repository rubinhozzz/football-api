import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Columns } from 'react-bulma-components';
import axios from 'axios';

function Matches(props) {
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		async function fetchMaches() {
			const response = await axios.get('matches');
			console.log(response.data);
			setMatches(response.data);
		}
		fetchMaches();
	}, []);
	
	return (
		<div>
			<Button to="/matches/add" color="success" renderAs={Link}>New match</Button>
				{
					matches.map(match =>
						<div key={match._id}>
							Location: {match.location.name}<br/>
							Date:{match.datetime}
							<div className="columns" style={{border:"3px"}}>
								<div className="column" style={{border:"32px"}}>{match.teamAName}</div>
									{match.teamA.map((player) => (
										<div className="column">{player.firstname}</div>
									))}
								
							</div>
							<div className="columns">
								<div className="column">{match.teamBName}</div>
									{match.teamB.map((player) => (
										<div className="column">{player.firstname}</div>
									))}
								
							</div>
							<div>
								<div>Pichichi</div>
									{match.pichichi.map((player) => (
										<div className="column">{player.firstname}</div>
									))}
							</div>
							<div>
								<div>MVP</div>
									{match.mvp.map((player) => (
										<div className="column">{player.firstname}</div>
									))}
							</div>
					</div>
					)
				}
		</div>
	)
}

export default Matches
