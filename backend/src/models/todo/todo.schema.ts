import { Schema } from 'mongoose';
import { createTodo, deleteTodo, getTodos, updateTodo } from './todo.statics';
import { ITodo, ITodoModel } from './todo.types';

const TodoSchema = new Schema<ITodo, ITodoModel>({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
});

TodoSchema.static('createTodo', createTodo);
TodoSchema.static('updateTodo', updateTodo);
TodoSchema.static('deleteTodo', deleteTodo);
TodoSchema.static('getTodos', getTodos);

export default TodoSchema;
