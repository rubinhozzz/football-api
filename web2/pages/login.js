
export default function Login() {
	return (
		<div className="bg-black p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
		<h1 className="text-3xl font-bold underline">
      	Hello world!
    	</h1>
		Username:<input name="username" />
		Password:<input name="password" />
		<button type="submit" className="bg-red">Log in</button>
		</div>
	)
}