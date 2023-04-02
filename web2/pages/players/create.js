export default function Create(props) {
	const errors = [] 
	return (
		<div className="w-full max-w">
		<form className="bg-white px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" for="username">
					Firstname
				</label>
				<input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Firstname"/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" for="password">
					Lastname
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="text" placeholder="Lastname"/>
				<p className="text-red-500 text-xs italic">Please choose a password.</p>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" for="password">
					Phone number
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="text" placeholder="Phone number"/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" for="password">
					Country code
				</label>
				<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" type="text" placeholder="Country code"/>
			</div>
			<div className="flex flex-row">
				<button className="btn btn-primary mr-2" type="button">
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