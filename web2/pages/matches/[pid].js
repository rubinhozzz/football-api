import { useRouter } from "next/router";
import useSWR from 'swr';
import MatchForm from "../../components/MatchForm";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UpdateMatch(props) {
	const router = useRouter();
	const { pid } = router.query
	const { data, error, isLoading } = useSWR(pid ? `http://192.168.178.44:8000/matches/${pid}` : null, fetcher);

	async function handleSubmit(data) {
		if (data['mvp'])
			data['mvp_id'] = data.mvp.value; 
		console.log(data);
		if (data['pichichis'])
			data['pichichis'] = data.pichichis.map(item => item.value);
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		try{
			const response = await fetch(`http://192.168.178.44:8000/matches/${pid}`, options);
			const result = await response.json()
			router.push('/matches');
		} catch (error) {
			alert(error);
		}
	}

	if (error) return <div>Failed to load</div>
	if (isLoading) return <div>Loading...</div>

	return (<MatchForm data={data} onSubmit={handleSubmit}></MatchForm>)
}