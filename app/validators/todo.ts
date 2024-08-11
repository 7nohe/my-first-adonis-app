import vine from '@vinejs/vine'

/**
 * Validates the todo's creation action
 */
export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1),
    description: vine.string().trim().escape().minLength(1),
  })
)

/**
 * Validates the todo's update action
 */
export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1),
    description: vine.string().trim().escape().minLength(1),
    isCompleted: vine.boolean(),
  })
)
