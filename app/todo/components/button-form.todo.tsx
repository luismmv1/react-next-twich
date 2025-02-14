"use client";

import { useFormStatus } from 'react-dom';
import { FaSpinner } from "react-icons/fa";

const ButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      disabled={pending}
    >
      {pending ? (
        <span className="block animate-spin">
          <FaSpinner className="transform rotate-90" />
        </span>
      ) : (
        "Add"
      )}
    </button>
  );
};
export default ButtonForm