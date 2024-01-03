import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

interface IProps {
	onSearchHandler: (query: string) => void;
}

function TodoListSearch(props: IProps) {
	const { onSearchHandler } = props;

	return (
		<TextField
			margin="none"
			fullWidth
			variant="standard"
			color="primary"
			size="small"
			placeholder="Task name..."
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Search fontSize="small" />
					</InputAdornment>
				),
			}}
			onChange={({ target: { value } }) => onSearchHandler(value)}
		/>
	);
}

export default TodoListSearch;
