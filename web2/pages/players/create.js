import PlayerForm from "../../components/player_form";

export default function Create(props) {
	
	function onSubmit(data) {
		//props.handleSubmit(data.firstname, data.lastname, data.file);
		alert('CREATE');
		console.log(data);
	}

	return (<PlayerForm onSubmit={onSubmit}></PlayerForm>)
}