import { Todo } from '../../../types';
import { formatDate } from '../../../utils/date';

export default (todo: Todo) => ({
	...todo,
	dueDate: formatDate(new Date(todo.dueDate)),
});
