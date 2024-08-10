import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Todo from '#models/todo'

export default class extends BaseSeeder {
  async run() {
    // ↓追加
    await Todo.createMany([
      {
        title: 'Learn AdonisJS',
        description: 'Learn AdonisJS from the official documentation',
      },
      {
        title: 'Develop a new project',
        description: 'Develop a new project using AdonisJS',
      },
    ])
  }
}
