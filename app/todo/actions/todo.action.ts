"use server"
import { prisma } from "@/libs/prismadb";
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { TodoZodSchema } from "../schema/todo.zod.schema";


interface CreateTodoResponse {
    success: boolean;
    message: string;
  }

export const createTodo = async (title: string): Promise<CreateTodoResponse> => {


    const authData = await auth();
    const { userId }: { userId: string | null } = authData;

    if (!userId)
        return {
            success: false,
            message: "No user id (backend)",
        };

    try {
        TodoZodSchema.parse({ title });

        await prisma.todo.create({
            data: {
                title: title.trim(),
                userId,
            },
        });
        revalidatePath("/todo");
        return {
            success: true,
            message: "Todo created successfully (Backend)",
        }
    } catch (error) {
         if (error instanceof ZodError) {
             return {
                 success: false,
                 message: error.issues[0].message,
             };
        }
        return {
            success: false,
            message: "Error creating Todo (Backend)",
        };
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