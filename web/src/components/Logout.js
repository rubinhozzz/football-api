import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Logout(props) {
	let navigate = useNavigate();

	useEffect(() => {
		sessionStorage.clear();
		navigate("/");
		window.location.reload();
	}, []);

	return null;
}

export default Logout;
