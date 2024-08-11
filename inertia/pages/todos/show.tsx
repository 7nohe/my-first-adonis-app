import { Link } from '@inertiajs/react'
import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

export default function Show(props: InferPageProps<TodosController, 'show'>) {
  const { todo } = props
  return (
    <div
      style={{
        padding: '6rem',
      }}
    >
      <h2>Todo {todo.id}</h2>
      <p>{todo.title}</p>
      <p>{todo.description}</p>
      <p>{todo.isCompleted ? 'Completed' : 'Not completed'}</p>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Link href="/todos">Back</Link>
        <Link href={`/todos/${todo.id}/edit`}>Edit</Link>
        <Link href={`/todos/${todo.id}`} method="delete" as="button">
          Delete
        </Link>
      </div>
    </div>
  )
}
