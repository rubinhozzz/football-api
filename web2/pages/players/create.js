import PlayerForm from "../../components/player_form";
import { useRouter } from 'next/router';

export default function Create(props) {
	const router = useRouter();
	
	async function handleSubmit(data) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		try{
			const response = await fetch('http://192.168.178.44:8000/players/', options);
			const result = await response.json()
			router.push('/players');
		} catch (error) {
			alert(error);
		}
	}

	return (<PlayerForm onSubmit={handleSubmit}></PlayerForm>)
}