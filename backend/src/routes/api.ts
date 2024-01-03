import express from 'express';
import { firewallMiddleware, validateSessionMiddleware } from '../middlewares';
import { TodoController, UsersController } from '../controllers';

const router = express.Router();

// MARK: Users
router.post('/users', firewallMiddleware, UsersController.createUser);
router.get('/users', firewallMiddleware, validateSessionMiddleware, UsersController.getUser);

// MARK: Todo
router.post('/todos', firewallMiddleware, validateSessionMiddleware, TodoController.createTodo);
router.get('/todos', firewallMiddleware, validateSessionMiddleware, TodoController.getTodos);
router.put('/todos/:id', firewallMiddleware, validateSessionMiddleware, TodoController.updateTodo);
router.delete('/todos/:id', firewallMiddleware, validateSessionMiddleware, TodoController.deleteTodo);

export default router;
