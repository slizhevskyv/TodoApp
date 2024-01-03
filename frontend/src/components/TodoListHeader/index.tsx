import React from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ButtonBase, Grid, Typography } from '@mui/material';
import { SortField, SortOrder } from '../../enums';
import { useSort } from '../../hooks';
import useStyles from './styles';

function SortOrderIconComponent(props: { order: SortOrder }) {
	const { order } = props;

	const componentToSortOrderMap = {
		[SortOrder.asc]: <KeyboardArrowUp fontSize="small" />,
		[SortOrder.desc]: <KeyboardArrowDown fontSize="small" />,
		[SortOrder.none]: null,
	};

	return componentToSortOrderMap[order];
}

interface IProps {
	sortFields: ReturnType<typeof useSort>[1];
	onSortHandler: (field: SortField) => void;
}

function TodoListHeader(props: IProps) {
	const classes = useStyles();

	const { sortFields, onSortHandler } = props;

	return (
		<Grid container spacing={2} alignItems="flex-end" wrap="nowrap" marginTop={2}>
			<Grid item xs={1} />
			<Grid item xs={8}>
				<ButtonBase onClick={() => onSortHandler(SortField.name)} disableRipple>
					<Typography className={classes.caption} variant="caption">
						Name
					</Typography>
					<SortOrderIconComponent order={sortFields.name.value} />
				</ButtonBase>
			</Grid>
			<Grid item xs={3}>
				<ButtonBase onClick={() => onSortHandler(SortField.dueDate)} disableRipple>
					<Typography className={classes.caption} variant="caption">
						Due Date
					</Typography>
					<SortOrderIconComponent order={sortFields.dueDate.value} />
				</ButtonBase>
			</Grid>
			<Grid item flex={1} />
			<Grid item flex={1} />
		</Grid>
	);
}

export default TodoListHeader;
