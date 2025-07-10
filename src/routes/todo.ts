import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import {authenticate} from "../middleware/auth";
import {createTodo, deleteTodo, getTodoById, getTodos, updateTodo} from "../controllers/todo.controller";

const router = Router();

router.post('/',authenticate,createTodo);
router.get('/', authenticate, getTodos);
router.get('/:id', authenticate, getTodoById)
router.put('/:id', authenticate,updateTodo );
router.delete('/:id', authenticate,deleteTodo );
export default router;