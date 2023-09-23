import PlayerForm from "../../components/PlayerForm";
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

export default function Create(props) {
	const router = useRouter();
	const { data: session, status } = useSession();
	
	async function handleSubmit(data) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
		try{
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT_URI}/players/`, options);
			const result = await response.json()
			router.push('/players');
		} catch (error) {
			alert(error);
		}
	}
	if (status == 'loading')
		return <>Loading...</>
	if (status == 'unauthenticated') {
		signIn();
		return
	}
	return (<PlayerForm onSubmit={handleSubmit}></PlayerForm>)
}