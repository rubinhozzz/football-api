import { useEffect } from 'react';
import { useRouter} from 'next/router';

function Logout(props) {
	const { push } = useRouter();

	useEffect(() => {
		sessionStorage.clear();
		push('/matches');
	}, [push]);

	return <></>;
}

export default Logout;