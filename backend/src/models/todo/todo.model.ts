import { model } from 'mongoose';
import TodoSchema from './todo.schema';
import { ITodo, ITodoModel } from './todo.types';

const TodoModel = model<ITodo, ITodoModel>('Todo', TodoSchema);

export default TodoModel;
