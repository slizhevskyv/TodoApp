import { ITodo } from '../models/todo/todo.types';

export default (data: any): data is ITodo => data?.name && (!data?.isCompleted || data?.isCompleted) && data?.dueDate;
