import { useRouter } from "next/router";
import useSWR from 'swr';
import MatchForm from "../../components/MatchForm";
import { signIn, useSession } from 'next-auth/react';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UpdateMatch(props) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { pid } = router.query
	const { data, error, isLoading } = useSWR(pid ? `http://192.168.178.44:8000/matches/${pid}` : null, fetcher);

	async function handleSubmit(data) {
		if (data.location)
			data.location = data.location.id
		if (data.teamA_players) 
			data.teamA_players = data.teamA_players.map(x => x.value)
		if (data.teamB_players) 
			data.teamB_players = data.teamB_players.map(x => x.value)
		if (data.pichichis) 
			data.pichichis = data.pichichis.map(x => x.value);
		if (data.mvp)
			data.mvp = data.mvp.value;
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
	if (status == 'loading')
		return <>Loading...</>
	if (status == 'unauthenticated') {
		signIn();
		return
	}
	return (<MatchForm data={data} onSubmit={handleSubmit}></MatchForm>)
}