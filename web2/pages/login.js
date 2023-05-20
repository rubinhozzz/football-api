
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Login() {
	const methods = useForm({
		defaultValues: {
			username: '',
			password: '',			
		}
	});
	const router = useRouter();

	async function onSubmit(data) {
		const {username, password} = data;
		/*const response = await axios.post('login', {
			username: username,
			password: password
		});*/
		const json = {"user_id":1, "username": "ruben"};
		sessionStorage.setItem('user', JSON.stringify(json));
		//const next = (!props.next) ? '/' : props.next;
		//navigate(next);
		router.push('/matches');
		window.location.reload();
	}

	return (
		<div className="w-full max-w-xs center">
		<form className="px-8 pt-6 pb-8 mb-4" onSubmit={methods.handleSubmit(onSubmit)}>
			<div className="mb-4">
			<label className="form-label" htmlFor="username">
				Username
			</label>
			<input className="form-control" type="text" placeholder="Username" {...methods.register('username', {required: true})}/>
			</div>
			<div className="mb-6">
			<label className="form-label" htmlFor="password">
				Password
			</label>
			<input className="form-control" type="password" placeholder="Password" {...methods.register('password', {required: true})}/>
			{/*--<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
			</div>
			<div className="flex items-center justify-between">
			<button className="btn btn-primary" type="submit">
				Sign In
			</button>
			</div>
		</form>
		<p className="text-center text-gray-500 text-xs">
			&copy;2023 rubinhozzz @ all rights reserved.
		</p>
		</div>
	)
}