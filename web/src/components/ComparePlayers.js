import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import PlayerSelect from './PlayerSelect';
import { Controller, useForm } from 'react-hook-form';

function ComparePlayers(props) {
	let history = useHistory();

	useEffect(() => {
	}, []);

	return (
		<div>
			<div className="columns">
				<div className="column">
					<PlayerSelect></PlayerSelect>
					Play together
					Play against
				</div>
				<div className="column">
					<PlayerSelect></PlayerSelect>
					Play together
					Play against
				</div>
			</div>
		</div>
	)
}

export default ComparePlayers
