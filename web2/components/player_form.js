import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PlayerForm(props) {
	const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
	
	useEffect(() => {
		if (!props.data)
			return
		setValue('firstname', props.data.firstname);
		setValue('lastname', props.data.lastname);
		setValue('phone_number', props.data.phone_number);
		setValue('country_code', props.data.country_code);
	}, [props.data]);

	function onSubmit(data) {
		props.onSubmit(data);
	}

	return (
		<div className="w-full max-w">
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
					Firstname
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Firstname" {...register('firstname', { required: true })}/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
					Lastname
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="text" placeholder="Lastname" {...register('lastname', { required: true })}/>
				<p className="text-red-500 text-xs italic">Please choose a password.</p>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
					Phone number
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="text" placeholder="Phone number" {...register('phone_number', { required: true })}/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
					Country code
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="text" placeholder="Country code" {...register('country_code', { required: true })}/>
			</div>
			<div className="flex flex-row">
				<button className="btn btn-primary mr-2" type="submit">
					Save
				</button>
				<button className="btn btn-danger" type="button">
					Cancel
				</button>
			</div>
		</form>
		</div>
	) 
}

