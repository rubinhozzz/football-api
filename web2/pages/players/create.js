export default function Create(props) {
	const errors = [] 
	return (
		<div>
		<form  method="post">
			<div className="field">
				<label className="label">Firstname</label>
				<input type="text" className="" placeholder="Firstname" name="firstname"/>
			</div>
			<div className="field">
				<label className="label">Lastname</label>
				<input type="text" className="" placeholder="Lastname" name="lastname"/>
			</div>
			<div className="field file is-boxed">
				<label className="file-label">
					<input className="file-input" type="file" name="file"/>
					<span className="file-cta">
						<span className="file-icon">
						<i className="fas fa-upload"></i>
						</span>
						<span className="file-label">
						Choose a photo profile...
						</span>
					</span>
				</label>
			</div>
			<div className="field">
				<button className="btn btn-primary" type="submit">Save</button>
			</div>
		</form>
		{props.dataId ?  <img src={imgSrc} className="image is-128x128"/>: ''}
		</div>
	) 
}