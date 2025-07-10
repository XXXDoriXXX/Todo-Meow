import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import prisma from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {AuthenticatedRequest} from "../middleware/auth";
export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    console.log('Current user ID:', userId);
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await authService.getUserById(userId);
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error getting user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const signUp = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({message: 'Username and password are required'});
    }
    if(await authService.getUserByUsername(username)) {
        return res.status(409).send({message: 'Username already exists'});
    }
    try{
        await authService.createUser(username, password);
        return res.status(200).send({message: 'User created successfully'});}
    catch(err) {
        console.error('Error creating user:', err);
        return res.status(500).send({message: 'Internal Server Error'});
    }
}
export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({message: 'Username and password are required'});
    }
    try {
        const user= await authService.getUserByUsername(username);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const dbUser = await authService.getFullUserByUsername(username);

        if (!dbUser || !(await bcrypt.compare(password, dbUser.password))) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        const token = authService.generateToken(dbUser);
        return res.status(200).send({message: 'Login successful', token});
    }
    catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send({message: 'Internal Server Error'});
    }
}