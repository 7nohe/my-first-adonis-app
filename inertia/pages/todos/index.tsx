import Todo from '#models/todo'
import User from '#models/user'

export default function Index(props: { todos: Todo[]; user: User; csrfToken: string }) {
  const { user, csrfToken } = props
  return (
    <div style={{ padding: '6rem' }}>
      <form method="post" action="/logout">
        <input type="hidden" name="_csrf" value={csrfToken} />
        <button type="submit">Logout</button>
      </form>
      <h2>Hi, {user.fullName}!</h2>
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <a href={`/todos/${todo.id}`}>{todo.title}</a> | {todo.description} |{' '}
            {todo.isCompleted ? 'Completed' : 'Not completed'}
          </li>
        ))}
      </ul>
    </div>
  )
}
