import { Link } from '@inertiajs/react'
import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

export default function Index(props: InferPageProps<TodosController, 'index'>) {
  const { todos, user } = props
  return (
    <div style={{ padding: '6rem' }}>
      <Link href="/logout" method="post" as="button">
        Logout
      </Link>
      <h2>Hi, {user?.fullName}!</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link> | {todo.description} |{' '}
            {todo.isCompleted ? 'Completed' : 'Not completed'}
          </li>
        ))}
      </ul>
      <Link href="/todos/create">Create a new todo</Link>
    </div>
  )
}
