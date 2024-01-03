import { randomUUID } from 'crypto';
import { ITodo, ITodoModel } from './todo.types';

export async function createTodo(this: ITodoModel, todoToCreate: ITodo, userId: string): Promise<ITodo | null> {
	try {
		const { name, dueDate, isCompleted } = todoToCreate;

		const todo = new this({
			id: randomUUID(),
			userId,
			name,
			dueDate,
			isCompleted,
		});

		return await todo.save();
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getTodos(this: ITodoModel, userId: string): Promise<ITodo[] | null> {
	try {
		return await this.find({ userId });
	} catch (e) {
		return null;
	}
}

export async function updateTodo(
	this: ITodoModel,
	id: ITodo['id'],
	userId: string,
	data: ITodo,
): Promise<ITodo | null> {
	try {
		return await this.findOneAndUpdate({ id, userId }, data, { new: true });
	} catch (e) {
		return null;
	}
}

export async function deleteTodo(this: ITodoModel, userId: string, id: ITodo['id']): Promise<ITodo | null> {
	try {
		return await this.findOneAndDelete({ id, userId });
	} catch (e) {
		return null;
	}
}
