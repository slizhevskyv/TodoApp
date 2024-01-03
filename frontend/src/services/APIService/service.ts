import axios, { AxiosInstance } from 'axios';
import { Todo, User } from '../../types';
import { APIResponse } from './types/APIResponse';
import toRequestData from './mappers/toRequestData';
import { toViewData } from './mappers';

interface IAPI {
	createUser: () => Promise<User | null>;
	getUser: () => Promise<User | null>;

	createTodo: (todo: Todo) => Promise<Todo | null>;
	updateTodo: (todo: Todo) => Promise<Todo | null>;
	deleteTodo: (id: Todo['id']) => Promise<Todo['id'] | null>;
	getTodos: () => Promise<Todo[] | null>;
}

class API implements IAPI {
	static instance = new API();

	private client: AxiosInstance;

	private readonly apiUrl: string;

	private constructor() {
		if (!process.env.REACT_APP_API_ENDPOINT || !process.env.REACT_APP_BACKEND_API_KEY) {
			throw new Error('REACT_APP_API_ENDPOINT or REACT_APP_API_KEY is missing. Please add them to .env file.');
		}

		this.apiUrl = process.env.REACT_APP_API_ENDPOINT;

		const headers: Record<string, string> = {
			Accept: 'application/json',
			apikey: process.env.REACT_APP_BACKEND_API_KEY,
		};

		this.client = axios.create({
			baseURL: this.apiUrl,
			headers,
			withCredentials: true,
		});
	}

	async createTodo(todo: Todo): Promise<Todo | null> {
		try {
			const { id, ...todoToCreate } = toRequestData(todo);

			const {
				data: { data: createdTodo = null },
			} = await this.client.post<APIResponse<Todo>>('/todos', todoToCreate);

			return createdTodo && toViewData(createdTodo);
		} catch (e) {
			return null;
		}
	}

	async updateTodo(todo: Todo): Promise<Todo | null> {
		try {
			const { id } = todo;

			const {
				data: { data: updatedTodo = null },
			} = await this.client.put<APIResponse<Todo>>(`/todos/${id}`, toRequestData(todo));

			return updatedTodo && toViewData(updatedTodo);
		} catch (e) {
			return null;
		}
	}

	async deleteTodo(id: Todo['id']): Promise<Todo['id'] | null> {
		try {
			const {
				data: { data: deletedTodo = null },
			} = await this.client.delete<APIResponse<{ id: Todo['id'] }>>(`/todos/${id}`);

			return deletedTodo?.id ?? null;
		} catch (e) {
			return null;
		}
	}

	async getTodos(): Promise<Todo[] | null> {
		try {
			const {
				data: { data: todos = null },
			} = await this.client.get<APIResponse<Todo[]>>(`/todos`);

			return todos && todos.map(toViewData);
		} catch (e) {
			return null;
		}
	}

	async createUser(): Promise<User | null> {
		try {
			const {
				data: { data: user = null },
			} = await this.client.post<APIResponse<User>>('/users');

			return user;
		} catch (e) {
			return null;
		}
	}

	async getUser(): Promise<User | null> {
		try {
			const { data: { data: user = null } = {} } = await this.client.get<APIResponse<User>>('/users');

			return user;
		} catch (e) {
			return null;
		}
	}
}

export default API;
