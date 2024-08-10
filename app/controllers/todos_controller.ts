import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'

export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ inertia, auth }: HttpContext) {
    const todos = await Todo.all()
    return inertia.render('todos/index', { todos, user: auth.user })
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
  async store({ inertia, request }: HttpContext) {
    const data = request.all()
    const result = await createTodoValidator.validate(data)
    const todo = await Todo.create(result)

    return inertia.render('todos/show', { todo })
  }

  /**
   * Show individual record
   */
  async show({ inertia, params }: HttpContext) {
    const todo = await Todo.find(params.id)
    return inertia.render('todos/show', { todo })
  }

  /**
   * Edit individual record
   */
  async edit({ inertia, params }: HttpContext) {
    const todo = await Todo.find(params.id)
    return inertia.render('todos/edit', { todo })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ inertia, params, request }: HttpContext) {
    const todo = await Todo.find(params.id)
    const data = request.all()
    const result = await updateTodoValidator.validate(data)
    todo?.merge(result)
    await todo?.save()
    return inertia.render('todos/show', { todo })
  }

  /**
   * Delete record
   */
  async destroy({ inertia, params }: HttpContext) {
    const todo = await Todo.find(params.id)
    await todo?.delete()
    return inertia.render('/todos')
  }
}
