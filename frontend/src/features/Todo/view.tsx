import React, { useCallback, useEffect, useState } from 'react';
import { Container, Fab, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AddEditTodoModal, TodoList } from '../../components';
import { Todo } from '../../types';
import useStyles from './styles';
import { APIService } from '../../services';

function TodoFeature() {
	const classes = useStyles();
	const [isAddTodoModalOpened, setAddTodoModelOpened] = useState(false);

	const [items, setItems] = useState<Todo[]>([]);
	const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

	useEffect(() => {
		(async () => {
			const todos = await APIService.instance.getTodos();

			if (!todos) return;

			setItems(todos);
		})();
	}, []);

	const onDeleteTodoHandler = useCallback(
		async (id: string) => {
			const deletedTodoId = await APIService.instance.deleteTodo(id);

			if (!deletedTodoId) return;

			setItems(prevItems => prevItems.filter(i => i.id !== deletedTodoId));
		},
		[items, setItems],
	);

	const onEditTodoHandler = useCallback(
		(id: string) => {
			const todoToEdit = items.find(i => i.id === id);

			if (!todoToEdit) return;

			setEditedTodo(todoToEdit);
			setAddTodoModelOpened(true);
		},
		[items, setEditedTodo],
	);

	const onUpdateHandler = useCallback(
		async (todo: Todo) => {
			const existedTodo = items.find(i => i.id === todo.id);

			if (!existedTodo) {
				const createdTodo = await APIService.instance.createTodo(todo);

				if (!createdTodo) return null;

				return setItems(prevValue => [...prevValue, createdTodo]);
			}

			const updatedTodo = await APIService.instance.updateTodo(todo);

			if (!updatedTodo) return null;

			return setItems(prevValue => prevValue.map(i => (i.id === todo.id ? updatedTodo : i)));
		},
		[items, setItems],
	);

	const onCheckHandler = useCallback(
		async (id: string) => {
			const todo = items.find(i => i.id === id);

			if (!todo) return;

			const updatedTodo = await APIService.instance.updateTodo({ ...todo, isCompleted: !todo?.isCompleted });

			if (!updatedTodo) return;

			setItems(preValue => preValue.map(i => (i.id === id ? updatedTodo : i)));
		},
		[items, setItems],
	);

	return (
		<Container className={classes.container}>
			<AddEditTodoModal
				onUpdateHandler={onUpdateHandler}
				isOpened={isAddTodoModalOpened}
				onCloseHandler={() => setAddTodoModelOpened(false)}
				todoToEdit={editedTodo}
			/>
			<Typography variant="h2" component="h1">
				Todo App
			</Typography>
			<TodoList
				onCheckHandler={onCheckHandler}
				onDeleteHandler={onDeleteTodoHandler}
				onEditHandler={onEditTodoHandler}
				items={items}
			/>
			<Fab
				color="primary"
				sx={{
					position: 'absolute',
					bottom: theme => theme.spacing(5),
					right: theme => theme.spacing(5),
				}}
				onClick={() => setAddTodoModelOpened(true)}
			>
				<Add />
			</Fab>
		</Container>
	);
}

export default TodoFeature;
