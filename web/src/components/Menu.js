import React from 'react'
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'

function Nav() {
	return (
		<nav className="level">
			<div className="level-left">
				<div className="level-item"></div>
			</div>
			<div className="level-right">
				<Link to="/players" className="level-item">
					<p>Players</p>
				</Link>
				<Link to="/matches" className="level-item">
					<p>Matches</p>
				</Link>
			</div>
		</nav>
	)
}

export default Nav
