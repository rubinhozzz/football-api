import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../App";

function Layout(props) {
	const [user, setUser] = useState(getUser());
	return (
		<>
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="https://bulma.io"></a>
				<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div id="navbarBasicExample" className="navbar-menu">
			<div className="navbar-start">
				<Link to="/matches" className="navbar-item">
					<p>Matches</p>
				</Link>
				<Link to="/players" className="navbar-item">
					<p>Players</p>
				</Link>
				<Link to="/compare" className="navbar-item">
					<p>Compare</p>
				</Link>
			</div>

			<div className="navbar-end">
				<div className="navbar-item">
				<div className="buttons">
					{(!user) ?
					<Link to="/login" className="button is-primary">
						<p>Log in</p>
					</Link>
					:
					(<>Bienvenido user... <Link to="/logout" className="button is-secondary">
					<p>Log out</p>
					</Link></>)}
				</div>
				</div>
			</div>
			</div>
		</nav>
		<div className="container is-fluid is-family-code">
			<section id="div_content">
			{props.children}
			</section>
		</div>
		<footer className="footer">
			<div className="content has-text-centered">
				<p>Aves @2022</p>
			</div>
		</footer>
		</>
	)
}

export default Layout;