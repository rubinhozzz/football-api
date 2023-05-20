import { useState, useEffect } from "react";

function useSessionStorage(name) {
	const [value, setValue] = useState('')

	useEffect(() => {
		setValue(sessionStorage.getItem(name))
	}, [])
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
}

export default useSessionStorage