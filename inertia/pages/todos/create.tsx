import Todo from '#models/todo'
import { Link, router } from '@inertiajs/react'
import { useState } from 'react'
import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

export default function Create(
  props: InferPageProps<TodosController, 'create'> & {
    errors?: { [key in keyof Pick<Todo, 'title' | 'description'>]: string[] }
  }
) {
  const { errors } = props
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    router.post(`/todos`, {
      title,
      description,
    })
  }

  return (
    <div
      style={{
        padding: '6rem',
      }}
    >
      <h2>Create Todo</h2>
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

        <button type="submit">Create</button>
      </form>
      <Link href="/todos">Back</Link>
    </div>
  )
}
