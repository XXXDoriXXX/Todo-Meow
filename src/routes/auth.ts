import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'MewMewMew';

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({message: 'Username and password are required'});
    }
    if(await prisma.user.findUnique({where: {username}})) {
        return res.status(409).send({message: 'Username already exists'});
    }
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
    return res.status(200).send({message: 'User created successfully'});}
    catch(err) {
        console.error('Error creating user:', err);
        return res.status(500).send({message: 'Internal Server Error'});
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({message: 'Username and password are required'});
    }
    try {


        const user = await prisma.user.findUnique({where: {username}});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).send({message: 'User not found or password does not match'});
        }
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).send({message: 'Login successful', token});
    }
    catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send({message: 'Internal Server Error'});
    }
});
export default router;