import { prisma } from "@/libs/prismadb";
import { auth, currentUser } from '@clerk/nextjs/server';
import FormTodo from "./components/form.todo";
import ListTodo from "./components/list.todo";



const TodoPage = async () => {

  const user = await currentUser()
  if (!user) {
    return <div>Loading...</div>
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    }
  });
  const { userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn()
  
    
  
  return (
    <div className="container mx-auto px-8">
      <h1 className="text-right text-xl">Welcome, ID: {userId}</h1>
      <h1 className="text-right text-2xl">Hello, {user.username}</h1>
      <h1 className="text-center text-3xl my-10">Todos</h1>
      <FormTodo />
      <ListTodo todos={todos} />
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
    </div>
  )
};

export default TodoPage;