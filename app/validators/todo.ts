import vine from '@vinejs/vine'

/**
 * Validates the todo's creation action
 */
export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
  })
)

/**
 * Validates the todo's update action
 */
export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
    isCompleted: vine.boolean(),
  })
)
