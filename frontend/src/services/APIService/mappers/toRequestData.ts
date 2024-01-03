import { Todo } from '../../../types';
import { parseDate } from '../../../utils/date';

export default (todo: Todo) => ({
	...todo,
	dueDate: parseDate(todo.dueDate).toISOString(),
});
