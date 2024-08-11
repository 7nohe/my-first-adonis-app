import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import Todo from '#models/todo'

export default function Edit(
  props: InferPageProps<TodosController, 'edit'> & {
    errors?: { [key in keyof Pick<Todo, 'title' | 'description' | 'isCompleted'>]: string[] }
  }
) {
  const { todo, errors } = props

  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.put(`/todos/${todo.id}`, {
      title,
      description,
      isCompleted,
    })
  }

  return (
    <div
      style={{
        padding: '6rem',
      }}
    >
      <h2>Edit Todo {todo.id}</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '400px',
        }}
      >
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors?.title && (
          <ul style={{ color: 'red' }}>
            {errors.title.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors?.description && (
          <ul style={{ color: 'red' }}>
            {errors.description.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <label>Completed</label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        <button type="submit">Update</button>
      </form>
      <Link href={`/todos/${todo.id}`}>Back</Link>
    </div>
  )
}
