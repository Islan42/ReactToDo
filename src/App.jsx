import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState('Todos')
  const [newTodoString, setNewTodoString] = useState('')
  
  function newTodoHandler(todoString) {
    const newTodo = {id: todos.length, string: todoString, finished: false}
    setTodos([...todos, newTodo])
  }

  return (
    <>
      <NewToDoForm inputText={newTodoString} onChangeInput={setNewTodoString} onInsertTodo={newTodoHandler}/>
      <Filter onChangeFilter={setFilter} />
      <TodoList todos={todos}/>
    </>
  )
}

function NewToDoForm({ inputText, onChangeInput, onInsertTodo }) {
  function submitHandler(event) {
    event.preventDefault()
    onInsertTodo(inputText)
    onChangeInput('')
  }
  
  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="A fazer" value={inputText} onChange={(event) => onChangeInput(event.target.value)}/>
      <input type="submit" value="Inserir" />
    </form>
  )
}

function Filter({ onChangeFilter }) {
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


/* A FAZERES
  [] Focar no input após inserir um novo item
*/