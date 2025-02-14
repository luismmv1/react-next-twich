"use server"
import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

export const createTodo = async (title: string) => {

    // validacion backend
    if (!title || !title.trim()) {
        return {
            error: "Title is required (backend)",
        }
    }
    try {
        await prisma.todo.create({
            data: {
                title,
            },
        });
        revalidatePath("/todo");
        return {
            success: true,
        }
    } catch (error) {
        return {
            error: "Error creating Todo (Backend)",
        }
    }
    
    
};

export const removeTodo = async (id: string) => {

    if (!id || !id.trim()) {
        return {
            error: "ID is required (backend)",
        }
    }
    try {
        await prisma.todo.delete({
            where: {
                id,
            },
        });
        revalidatePath("/todo");
        return {
            success: true,
        }
    } catch (error) {
        return {
            error: "Error removing Todo (Backend)",
        }
    }
};