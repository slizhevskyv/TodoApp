import React from 'react';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Todo } from '../../types';

interface IProps {
	todo: Omit<Todo, 'id'>;
	onEditHandler: () => void;
	onDeleteHandler: () => void;
	onCheckHandler: () => void;
}

function TodoListItem(props: IProps) {
	const {
		todo: { isCompleted, name, dueDate },
		onDeleteHandler,
		onEditHandler,
		onCheckHandler,
	} = props;

	return (
		<Grid container spacing={2} alignItems="center" wrap="nowrap">
			<Grid item xs={1}>
				<Checkbox onChange={onCheckHandler} checked={isCompleted} />
			</Grid>
			<Grid item xs={8}>
				<Typography>{name}</Typography>
			</Grid>
			<Grid item xs={3}>
				<Typography>{dueDate}</Typography>
			</Grid>
			<Grid item flex={1}>
				<IconButton color="primary" onClick={onEditHandler}>
					<Edit />
				</IconButton>
			</Grid>
			<Grid item flex={1}>
				<IconButton color="error" onClick={onDeleteHandler}>
					<Delete />
				</IconButton>
			</Grid>
		</Grid>
	);
}

export default TodoListItem;
