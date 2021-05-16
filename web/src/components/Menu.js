import React from 'react'
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'

function Nav() {
	return (
		<nav className="level">
			<div className="level-right">
				<Link to="/players">
					<p className="level-item">Players</p>
				</Link>
				<Link to="/matches">
					<p className="level-item">Matches</p>
				</Link>
			</div>
		</nav>
	)
}

export default Nav
