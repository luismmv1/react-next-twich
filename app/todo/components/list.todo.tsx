import { TodoInterface } from "../interfaces/todo.interface";
import ItemTodo from "./item.todo";


interface ListTodoProps {
    todos: TodoInterface[];
}
const ListTodo = ({ todos }: ListTodoProps) => {
    
    if (!todos.length) return (<div className="text-center text-2xl">No hay Tareas</div>)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Todo Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo) => (
                            <ItemTodo
                                key={todo.id}
                                todo={todo}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListTodo