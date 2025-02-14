"use client";

import { useRef } from 'react';
import toast from "react-hot-toast";
import { createTodo } from '../actions/todo.action';
import ButtonForm from './button-form.todo';


const FormTodo = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (data: FormData) => {

        const title = data.get("title") as string;

        // validacion frontend
        if (!title || !title.trim()) {
            return toast.error("Title is required");
        }
        
        const res = await createTodo(title);

        if (res.error) {
            return toast.error(res.error);
        }

        formRef.current?.reset();
        toast.success(title + " Created 👍🎉🎊");
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entry Tittle" />
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