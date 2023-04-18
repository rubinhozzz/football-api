import { useRouter } from "next/router";
import useSWR from 'swr';
import PlayerForm from "../../components/player_form";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UpdatePlayer(props) {
	const router = useRouter();
	const { pid } = router.query
	const { data, error, isLoading } = useSWR(pid ? `http://192.168.178.44:8000/players/${pid}` : null, fetcher);

	function onSubmit(data) {
		alert('UPDATE');
	}

	if (error) return <div>Failed to load</div>
	if (isLoading) return <div>Loading...</div>

	return (<PlayerForm data={data} onSubmit={onSubmit}></PlayerForm>)
}