import { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer'

const initialState = []

// init es la función con la que se inicializa el useReducer
const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {
  const [todos, dispatchTodo] = useReducer(
    todoReducer,
    initialState, // Acá se puede poner un array vacio. Se dejá así para entender a que hace referencia
    init,
  )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    }
    // Acá se envía la acción a todoReducer, es decir, se envía el todo con el tipo de acción que se va a ejecutar:
    dispatchTodo(action)
  }

  const handleDeleteTodo = (id) => {
    dispatchTodo({
      type: '[TODO] Remove Todo',
      payload: id,
    })
  }

  const handleToggleTodo = (id) => {
    dispatchTodo({
      type: '[TODO] Toggle Todo',
      payload: id,
    })
  }

  const todosCount = todos.length
  const pendingTodosCount = todos.filter((todo) => !todo.done).length

  return {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  }
}
