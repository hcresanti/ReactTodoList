import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  // Load Todos List form Local Storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (storedTodos.length !== 0) {
      console.log(storedTodos)
      setTodos(storedTodos)
    }
  }, [])


  // Save Todos List to Local Storage
  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])


  // Toggle state of todo completion
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  
  // Handle clicking the Add button
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })

    todoNameRef.current.value = null
  }

  // Handle clicking the Clear button
  // Clears every completed todo item
  function handleClearTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  
  // Main HTML
  return (
    <div className='container'> 
      <input className='input-box' ref={todoNameRef} type="text"/>
      <button className='button-30' onClick={handleAddTodo}>Add</button>
      <button className='button-30' onClick={handleClearTodos}>Clear</button>

      <div>
        {todos.filter(todo => !todo.complete).length} items remaining
      </div>

      <div className='list-container'>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
      </div>
    </div>
  )
}

export default App;
