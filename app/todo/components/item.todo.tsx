"use client";

import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { removeTodo } from "../actions/todo.action";
import { TodoInterface } from "../interfaces/todo.interface";

interface ItemTodoProps {
    todo: TodoInterface
}
const ItemTodo = ({ todo }: ItemTodoProps) => {

    let [isPending, startTrasnition] = useTransition();

    const handleClickRemove = async (id: string): Promise<void> => {
        const res = await removeTodo(id);
        if (res.error) {
            toast.error(res.error);
            return;
        }
        toast.success(todo.title + " Removed successfully 🗑️");
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {todo.id}
            </th>
            <td className="px-6 py-4">
                {todo.title}
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-4 text-center">
                    {/* Boton Edit Crear funcion */} 
                    {/* <div>
                        <Link
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            <BsFileEarmarkDiff />Edit
                        </Link>
                    </div> */}
                    <div>
                        <Link
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => startTrasnition(() => handleClickRemove(todo.id))}
                        >
                            {
                                isPending ? (
                                    <span className="block animate-spin">
                                        <FaSpinner className="transform rotate-90" />
                                    </span>) : (<span>
                                        <BsFillTrash3Fill />
                                        Delete
                                    </span>)
                            }
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ItemTodo;