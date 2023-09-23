import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const [ players, setPlayers ] = useState([]);
	const [ locations, setLocations ] = useState([]);

	useEffect(() => {
		async function getPlayers(){
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT_URI}/players/`);
				const players = await response.json();
				console.log(players);
				setPlayers(players);
			} catch (error) {
				alert(error)
			}
		}
		getPlayers();
		async function getLocations(){
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT_URI}/locations/`);
				const locations = await response.json();
				setLocations(locations);
			} catch (error) {
				alert(error)
			}
		}
		getLocations();
	}, []);

	const data = {
		players: players,
		locations: locations
	}

	return (
    	<AppContext.Provider value={data}>
    	 {children}
    	</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
