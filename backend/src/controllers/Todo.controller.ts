import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TodoModel } from '../models';
import RespondWith from '../utils/generateResponse';
import { isTodoTypeguard } from '../typeguards';

const createTodo = async (req: Request, res: Response) => {
	const user = req.session?.user;
	const { body } = req;

	if (!user) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to detect user.'));
	}

	if (!isTodoTypeguard(body)) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Incorrect body format.'));
	}

	const { userId } = user;
	const createdTodo = await TodoModel.createTodo(body, userId);

	if (!createdTodo) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to create Todo.'));
	}

	return res.status(StatusCodes.OK).json(
		RespondWith.success({
			id: createdTodo.id,
			name: createdTodo.name,
			isCompleted: createdTodo.isCompleted,
			dueDate: createdTodo.dueDate,
		}),
	);
};

const updateTodo = async (req: Request, res: Response) => {
	const user = req.session?.user;
	const { body, params } = req;
	const { id } = params;

	if (!user) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to detect user.'));
	}

	if (!isTodoTypeguard(body)) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Incorrect body format.'));
	}

	const { userId } = user;
	const updatedTodo = await TodoModel.updateTodo(id, userId, body);

	if (!updatedTodo) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to update Todo.'));
	}

	return res.status(StatusCodes.OK).json(
		RespondWith.success({
			id: updatedTodo.id,
			name: updatedTodo.name,
			isCompleted: updatedTodo.isCompleted,
			dueDate: updatedTodo.dueDate,
		}),
	);
};

const deleteTodo = async (req: Request, res: Response) => {
	const user = req.session?.user;
	const { params } = req;
	const { id } = params;

	if (!user) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to detect user.'));
	}

	const { userId } = user;
	const deletedTodo = await TodoModel.deleteTodo(userId, id);

	if (!deletedTodo) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to delete Todo.'));
	}

	return res.status(StatusCodes.OK).json(
		RespondWith.success({
			id: deletedTodo.id,
		}),
	);
};

const getTodos = async (req: Request, res: Response) => {
	const user = req.session?.user;

	if (!user) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to detect user.'));
	}

	const { userId } = user;
	const todos = await TodoModel.getTodos(userId);

	if (!todos) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to query Todos.'));
	}

	return res.status(StatusCodes.OK).json(RespondWith.success(todos));
};

export { createTodo, updateTodo, deleteTodo, getTodos };
