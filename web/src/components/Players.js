import React from 'react'
import { Box, Table, Button, Field, Control, Select } from 'react-bulma-components';

function Players() {
	return (
		<Box>
		<Button color="primary">New player</Button>
		<Table className="table" width="100%">
			<thead>
				<tr>
					<th>Player</th>
					<th>Nationality</th>
					<th>Skills</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
			<tr>
				<td>Ruben</td>
				<td>Peruvian</td>
				<td></td>
				<td>
					<Button color="info">Edit</Button>&nbsp;<Button color="danger">Remove</Button>
				</td>
			</tr>
			</tbody>
		</Table>
		</Box>
	)
}

export default Players;
