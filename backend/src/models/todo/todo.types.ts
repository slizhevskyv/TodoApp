import { Model } from 'mongoose';

export interface ITodo {
	id: string;
	name: string;
	dueDate: Date;
	isCompleted: boolean;
	userId: string;
}

export interface ITodoModel extends Model<ITodo> {
	createTodo: (this: ITodoModel, todo: ITodo, userId: string) => Promise<ITodo | null>;
	getTodos: (this: ITodoModel, userId: string) => Promise<ITodo[] | null>;
	updateTodo: (this: ITodoModel, userId: string, id: ITodo['id'], data: ITodo) => Promise<ITodo | null>;
	deleteTodo: (this: ITodoModel, userId: string, id: ITodo['id']) => Promise<ITodo | null>;
}
