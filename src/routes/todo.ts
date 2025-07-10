import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import {getCurrentUser, login, signUp} from "../controllers/auth.controller";
import {authenticate} from "../middleware/auth";

const router = Router();

router.post('/',  signUp);
router.get('/', authenticate, getCurrentUser);
router.put('/:id', authenticate, signUp);
router.delete('/:id', authenticate, signUp);
export default router;