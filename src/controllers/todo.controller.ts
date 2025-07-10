import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import * as authService from '../services/todo.service';
export const getTodos = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    console.log(userId);
    if (!userId) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    console.log('userId ', userId);
    try {
        const todos = await authService.getTodos(userId);
        return res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
export const getTodoById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    if( !userId) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    if (!id) {
        return res.status(400).send({ message: 'Todo ID is required' });
    }
    try {
        const todo = await authService.getTodoById(id);
        if (!todo) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        if (todo.userId !== userId) {
            return res.status(403).send({ message: 'Access denied' });
        }

        return res.json(todo);
    } catch (error) {
        console.error('Error fetching todo:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
export const createTodo = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send({ message: 'Title and description are required' });
    }
    try {

        const todo = await authService.createTodo(userId, title, description);
        return res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
export const updateTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send({ message: 'Title and description are required' });
    }
    try {
        const todo = await authService.getTodoById(id);
        if (!todo) {
            return res.status(404).send({ message: 'Todo not found' });
        }

        if (todo.userId !== userId) {
            return res.status(403).send({ message: 'Access denied' });
        }

        const updated = await authService.updateTodo(id, title, description);
        return res.json(updated);
    }  catch (error) {
        console.error('Error updating todo:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
export const deleteTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    try {
        const todo = await authService.getTodoById(id);
        if (!todo) {
            return res.status(404).send({ message: 'Todo not found' });
        }

        if (todo.userId !== userId) {
            return res.status(403).send({ message: 'Access denied' });
        }

        await authService.deleteTodo(id);
        return res.status(204).send();
    }catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}