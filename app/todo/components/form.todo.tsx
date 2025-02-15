"use client";

import { useRef } from 'react';
import toast from "react-hot-toast";
import { ZodError } from 'zod';
import { createTodo } from '../actions/todo.action';
/* import { TodoZodSchema } from '../schema/todo.zod.schema';
 */
import ButtonForm from './button-form.todo';


const FormTodo = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (data: FormData): Promise<void> => {

        const title = data.get("title") as string;
        
        try {
            // validacion frontend
            // TodoZodSchema.parse({ title });
 
            const responseBackend = await createTodo(title);
            if (!responseBackend.success) {
                toast.error(responseBackend.message);
                return 
            }
            // Opciones para validaciones desde Frontend o Backend
            toast.success(title + " Created 👍🎉🎊");
            toast.success(responseBackend.message + " Created 👍🎉🎊");
        } catch (error) {
            if (error instanceof ZodError) {
                error.issues.map((issue) => toast.error(issue.message));
            }
        } finally { 
            formRef.current?.reset();

        }        
    }

    return (
        <div>
            <form
                ref={formRef}
                action={handleSubmit}
                className=''
            >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <input
                            type="text"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entry Tittle"
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <ButtonForm />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormTodo