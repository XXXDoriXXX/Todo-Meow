import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import {getCurrentUser, login, signUp} from "../controllers/auth.controller";
import {authenticate} from "../middleware/auth";

const router = Router();

router.post('/signup',  signUp);
router.get('/me', authenticate, getCurrentUser);
router.post('/login', login);
export default router;