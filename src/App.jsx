import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState('Todos')
  const [newTodoString, setNewTodoString] = useState('')
  
  function newTodoHandler(todoString) {
    const newTodo = {id: todos.length, string: todoString, finished: false}
    setTodos([...todos, newTodo])
  }
  function changeFinishedHandler(todo){
    const index = todos.indexOf(todo)
    const newTodo = {id: todo.id, string: todo.string, finished: !todo.finished}
    const newTodos = [...todos.slice(0,index), newTodo, ...todos.slice(index + 1)]
    setTodos(newTodos)
  }
  
  function computeTodos() {
    let filtered
    switch(true) {
      case filter === 'Em aberto': {
        filtered = todos.filter((todo) => !todo.finished)
        break
      }
      case filter === 'Concluidos': {
        filtered = todos.filter((todo) => todo.finished)
        break
      }
      default: {
        const finished = todos.filter((todo) => todo.finished)
        const opened = todos.filter((todo) => !todo.finished)
        filtered = [...opened, ...finished]
      }
    }
    return filtered
  }
  
  const filteredTodos = computeTodos()

  return (
    <>
      <h1>React ToDo</h1>
      <NewToDoForm inputText={newTodoString} onChangeInput={setNewTodoString} onInsertTodo={newTodoHandler}/>
      <Filter filterValue={filter} onChangeFilter={setFilter} />
      <TodoList todos={filteredTodos} onChangeFinished={changeFinishedHandler}/>
      <p>{filter}</p>
      <p>{filteredTodos.toString()}</p>
    </>
  )
}

function NewToDoForm({ inputText, onChangeInput, onInsertTodo }) {
  function submitHandler(event) {
    event.preventDefault()
    onInsertTodo(inputText)
    onChangeInput('')
    //focus element again
  }
  
  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="A fazer" value={inputText} onChange={(event) => onChangeInput(event.target.value)}/>
      <input type="submit" value="Inserir" />
    </form>
  )
}

function Filter({ filterValue, onChangeFilter }) {
  const options = [{value: "Todos"}, {value: "Em aberto"}, {value: "Concluidos"}]
  const optionsList = options.map((option) => {
    return (
        <label key={option.value} htmlFor={option.value}>
          <input type="radio" name="filter" id={option.value} value={option.value} checked={option.value === filterValue} onChange={onChangeHandler}/>
          {option.value}
        </label>
      
    )
  })
  
  function onChangeHandler(event) {
    onChangeFilter(event.target.value)
  }
  
  return (
    <form>
      {optionsList}
    </form>
  )
}

function TodoList({ todos, onChangeFinished }) {
  const todoList = todos.map((todo) => {
    return <Todo key={todo.id} todo={todo} onChangeFinished={onChangeFinished}/>
  })
    
  return(
    <ul>
      {todoList}
    </ul>
  )
}

function Todo({ todo, onChangeFinished }) {
  //const [isChecked, setIsChecked] = useState(todo.finished)
  
  /*
  function changeHandler() {
    onChangeCheckbox(todo)
  }
  */
  
  return (
    <li>
      {todo.string}: {todo.finished.toString()}
      <span><input type="checkbox" checked={todo.finished} onChange={() => onChangeFinished(todo)}/></span>
    </li>
  )
}

const initialTodos = [
  {id: 0, string: 'Mimir', finished: false},
  {id: 1, string: 'Jogar Lol', finished: true}, 
  {id: 2, string: 'Estudar', finished: false}
]


/* A FAZERES
  [] Focar no input após inserir um novo item
  [] Melhorar Filter, se possível
*/