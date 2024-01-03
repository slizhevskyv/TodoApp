import React, { useEffect, useState } from 'react';
import { Button, Grid, Modal, Paper, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useStyles from './styles';
import { Todo } from '../../types';
import { parseDate, formatDate } from '../../utils/date';

interface IProps {
	todoToEdit: Todo | null;
	isOpened: boolean;
	onUpdateHandler: (todo: Todo) => void;
	onCloseHandler: () => void;
}

function AddTodoModal(props: IProps) {
	const { isOpened, onCloseHandler, onUpdateHandler, todoToEdit } = props;
	const classes = useStyles();

	const [name, setName] = useState('');
	const [dueDate, setDueDate] = useState<Date | null>(null);
	const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
		if (!todoToEdit) return;

		const { name: todoToEditName, dueDate: todoToEditDueDate } = todoToEdit;

		setIsEditMode(true);
		setName(todoToEditName);
		setDueDate(parseDate(todoToEditDueDate));
	}, [todoToEdit, setIsEditMode, setName, setDueDate]);

	const onSaveHandler = () => {
		const todo: Todo = {
			isCompleted: isEditMode ? todoToEdit!.isCompleted : false,
			name,
			dueDate: dueDate ? formatDate(dueDate) : '',
			id: isEditMode ? todoToEdit!.id : '',
		};

		onUpdateHandler(todo);
		onCloseHandler();

		setName('');
		setDueDate(null);
		setIsEditMode(false);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Modal className={classes.modal} open={isOpened} onClose={onCloseHandler}>
				<Paper className={classes.container}>
					<Typography variant="h5">Add a new Todo Task</Typography>
					<Grid container spacing={2} marginTop={1} flexDirection="column">
						<Grid item>
							<TextField value={name} onChange={e => setName(e.target.value)} fullWidth label="Task Name" autoFocus />
						</Grid>
						<Grid item>
							<DateTimePicker
								value={dueDate}
								sx={{ width: '100%' }}
								label="Due Date"
								onChange={newValue => setDueDate(newValue)}
							/>
						</Grid>
						<Grid item>
							<Button onClick={onSaveHandler} fullWidth variant="contained" disabled={!name || !dueDate}>
								{isEditMode ? 'Save' : 'Add'}
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Modal>
		</LocalizationProvider>
	);
}

export default AddTodoModal;
