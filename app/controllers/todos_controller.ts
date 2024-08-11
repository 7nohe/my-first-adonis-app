import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'

class TodoDto {
  constructor(private todo: Todo) {}

  toJson() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      description: this.todo.description,
      isCompleted: this.todo.isCompleted,
    }
  }
}

export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ inertia, auth }: HttpContext) {
    const todos = await Todo.all()
    const user = auth.user
    return inertia.render('todos/index', {
      todos: todos.map((t) => new TodoDto(t).toJson()),
      user: user
        ? {
            id: user.id,
            fullName: user.fullName,
          }
        : null,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('todos/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const result = await createTodoValidator.validate(data)
    const todo = await Todo.create(result)

    return response.redirect(`/todos/${todo.id}`)
  }

  /**
   * Show individual record
   */
  async show({ inertia, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    return inertia.render('todos/show', { todo: new TodoDto(todo).toJson() })
  }

  /**
   * Edit individual record
   */
  async edit({ inertia, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    return inertia.render('todos/edit', { todo: new TodoDto(todo).toJson() })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    const data = request.all()
    const result = await updateTodoValidator.validate(data)
    todo.merge(result)
    await todo.save()
    return response.redirect(`/todos/${todo.id}`)
  }

  /**
   * Delete record
   */
  async destroy({ response, params }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return response.redirect('/todos')
  }
}
