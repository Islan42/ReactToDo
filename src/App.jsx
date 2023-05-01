import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState('All')

  return (
    <>
      <NewToDo />
      <Filter />
      <TodoList todos={todos}/>
    </>
  )
}

function NewToDo() {
  return (
    <form>
      <input type="text" placeholder="A fazer" />
      <input type="submit" value="Inserir" />
    </form>
  )
}

function Filter() {
  return (
    <form>
      <input type="radio" name="filter" value="Todos" />
      <input type="radio" name="filter" value="Em aberto" />
      <input type="radio" name="filter" value="Concluidos" />
    </form>
  )
}

function TodoList({ todos }) {
  const todoList = todos.map((todo) => {
    return <Todo key={todo.id} todo={todo}/>
  })
  return(
    <ul>
      {todoList}
    </ul>
  )
}

function Todo({ todo }) {
  return (
    <li>{todo.string}: {todo.finished.toString()}</li>
  )
}

const initialTodos = [
  {id: 0, string: 'Mimir', finished: false},
  {id: 1, string: 'Jogar Lol', finished: false}, 
  {id: 2, string: 'Estudar', finished: false}
]
