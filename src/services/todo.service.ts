import prisma from "../prisma";
export const createTodo = async (userId: string, title: string, description: string) => {
    return prisma.item.create({
        data: {
            title,
            description,
            userId,
        },
    });
}
export const getTodos = async (userId: string) => {
    return prisma.item.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
}
export const getTodoById = async (id: string) => {
    return prisma.item.findUnique({
        where: { id },
    });
}
export const updateTodo = async (id: string, title: string, description: string) => {
    return prisma.item.update({
        where: { id },
        data: { title, description },
    });
}
export const deleteTodo = async (id: string) => {
    return prisma.item.delete({
        where: { id },
    });
}
export const completeTodo = async (id: string) => {
    return prisma.item.update({
        where: { id },
        data: { isCompleted: true },
    });
}
export const uncompleteTodo = async (id: string) => {
    return prisma.item.update({
        where: { id },
        data: { isCompleted: false },
    });
}