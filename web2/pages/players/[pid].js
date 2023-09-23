import { useRouter } from "next/router";
import useSWR from 'swr';
import PlayerForm from "../../components/PlayerForm";
import { signIn, useSession } from 'next-auth/react';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UpdatePlayer(props) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { pid } = router.query
	const { data, error, isLoading } = useSWR(pid ? `${process.env.NEXT_PUBLIC_API_ROOT_URI}/players/${pid}` : null, fetcher);

	async function handleSubmit(data) {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		try{
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT_URI}/players/${pid}`, options);
			const result = await response.json()
			router.push('/players');
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
	return (<PlayerForm data={data} onSubmit={handleSubmit}></PlayerForm>)
}