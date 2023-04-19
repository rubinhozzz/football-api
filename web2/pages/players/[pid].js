import { useRouter } from "next/router";
import useSWR from 'swr';
import PlayerForm from "../../components/player_form";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UpdatePlayer(props) {
	const router = useRouter();
	const { pid } = router.query
	const { data, error, isLoading } = useSWR(pid ? `http://192.168.178.44:8000/players/${pid}` : null, fetcher);

	async function handleSubmit(data) {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		try{
			const response = await fetch(`http://192.168.178.44:8000/players/${pid}`, options);
			const result = await response.json()
			router.push('/players');
		} catch (error) {
			alert(error);
		}
	}

	if (error) return <div>Failed to load</div>
	if (isLoading) return <div>Loading...</div>

	return (<PlayerForm data={data} onSubmit={handleSubmit}></PlayerForm>)
}