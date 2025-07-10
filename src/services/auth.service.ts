import prisma from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || 'MewMewMew';
export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },select:{id: true, username: true}
    })
}
export const getUserByUsername = async (username: string) => {
    return prisma.user.findUnique({
        where: { username },select:{id: true, username: true}
    })
}
export const getFullUserByUsername = async (username: string) => {
    return prisma.user.findUnique({ where: { username } });
};
export const createUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
}
export const generateToken = (user: { id: string; username: string }) => {
    return jwt.sign(
        {
            userId: user.id,
            username: user.username,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};