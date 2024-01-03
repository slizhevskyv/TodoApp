import React from 'react';
import { Box, Grid } from '@mui/material';
import { Todo } from '../../types';
import { useSearchQuery, useSort } from '../../hooks';
import { isPropertyValueString } from '../../typeguards';
import { SortField, SortOrder } from '../../enums';
import TodoListItem from '../TodoListItem';
import TodoListHeader from '../TodoListHeader';
import TodoListSearch from '../TodoListSearch';
import { parseDate } from '../../utils/date';

interface IProps {
	items: Todo[];
	onDeleteHandler: (id: string) => void;
	onEditHandler: (id: string) => void;
	onCheckHandler: (id: string) => void;
}

function TodoList(props: IProps) {
	const { items, onDeleteHandler, onEditHandler, onCheckHandler } = props;

	const [filteredItems, setQuery] = useSearchQuery(items, 'name');
	const [sortedItems, sortFields, updatedSortFieldConfiguration] = useSort(filteredItems, {
		[SortField.name]: {
			value: SortOrder.none,
			sortF: (field: keyof Todo, order: SortOrder) => (todo1: Todo, todo2: Todo) => {
				const todo1Field = todo1[field];
				const todo2Field = todo2[field];

				if (!isPropertyValueString(todo1Field) || !isPropertyValueString(todo2Field)) return 1;

				return order === SortOrder.desc ? todo2Field.localeCompare(todo1Field) : todo1Field.localeCompare(todo2Field);
			},
		},
		[SortField.dueDate]: {
			value: SortOrder.none,
			sortF: (field: keyof Todo, order: SortOrder) => (todo1: Todo, todo2: Todo) => {
				const todo1Field = todo1[field];
				const todo2Field = todo2[field];

				if (!isPropertyValueString(todo1Field) || !isPropertyValueString(todo2Field)) return 1;

				const todo1DueDate = parseDate(todo1Field).getTime();
				const todo2DueDate = parseDate(todo2Field).getTime();

				return order === SortOrder.desc ? todo2DueDate - todo1DueDate : todo1DueDate - todo2DueDate;
			},
		},
	});

	return (
		<Box paddingY={3}>
			<TodoListSearch onSearchHandler={setQuery} />
			<TodoListHeader sortFields={sortFields} onSortHandler={updatedSortFieldConfiguration} />
			<Grid container flexDirection="column">
				{sortedItems.map(({ id, ...todo }) => (
					<Grid item key={id}>
						<TodoListItem
							todo={todo}
							onDeleteHandler={() => onDeleteHandler(id)}
							onEditHandler={() => onEditHandler(id)}
							onCheckHandler={() => onCheckHandler(id)}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default TodoList;
