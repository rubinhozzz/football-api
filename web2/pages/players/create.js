import PlayerForm from "../../components/PlayerForm";
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
			const response = await fetch('http://localhost:8000/players/', options);
			const result = await response.json()
			router.push('/players');
		} catch (error) {
			alert(error);
		}
	}

	return (<PlayerForm onSubmit={handleSubmit}></PlayerForm>)
}