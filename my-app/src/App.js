import { useState, useEffect } from 'react'
import { TodoForm, TodoList } from './components'
import styles from './app.module.css'

export const App = () => {
	const [todo, setTodo] = useState('')
	const [todos, setTodos] = useState([])
	const [editId, setEditId] = useState(false)

	const [refreshTodos, setRefreshTodos] = useState(false)
	const [isLoadingJsonServerComponent, setIsLoadingJsonServerComponent] =
		useState(false)

	useEffect(() => {
		setIsLoadingJsonServerComponent(true)

		fetch('http://localhost:8208/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodos(loadedTodo)
			})
			.finally(() => setIsLoadingJsonServerComponent(false))
	}, [refreshTodos])

	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = () => {
		if (todo !== '') {
			setIsCreating(true)

			fetch('http://localhost:8208/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: todo,
					completed: false,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					setTodo('')
					console.log(`Добавлена задача ${todo}, ответ сервера:`, response)
					setRefreshTodos(!refreshTodos)
				})
				.finally(() => setIsCreating(false))
		}
	}

	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = (id) => {
		setIsDeleting(true)

		fetch(`http://localhost:8208/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Задача удалена, ответ сервера:`, response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))
	}

	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = (id) => {
		setIsUpdating(true)

		fetch(`http://localhost:8208/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodo('')
				console.log(
					`Задача: ${todo} с id: ${response.id} обновлена, ответ сервера:`,
					response
				)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsUpdating(false))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (editId) {
			const editTodo = todos.find((i) => i.id === editId)
			const updatedTodos = todos.map((t) =>
				t.id === editTodo.id
					? (t = { id: t.id, todo })
					: { id: t.id, todo: t.todo }
			)
			setTodos(updatedTodos)
			setEditId(0)
			setTodo('')
			return
		}

		if (todo !== '') {
			setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos])
			setTodo('')
		}
	}

	// const handleDelete = (id) => {
	// 	const delTodo = todos.filter((to) => to.id !== id)
	// 	console.log('handleDelete:', delTodo)
	// 	setTodos([...delTodo])
	// }

	// const handleEdit = (id) => {
	// 	const editTodo = todos.find((i) => i.id === id)
	// 	setTodo(editTodo.todo)
	// 	setEditId(id)
	// }

	return (
		<div className={styles.App}>
			<div className={styles.container}>
				<h1>Todo List App</h1>
				<TodoForm
					handleSubmit={handleSubmit}
					todo={todo}
					editId={editId}
					// handleEdit={handleEdit}
					setTodo={setTodo}
					requestAddTodo={requestAddTodo}
					isUpdating={isUpdating}
				/>

				<TodoList
					todo={todo}
					todos={todos}
					setTodo={setTodo}
					requestUpdateTodo={requestUpdateTodo}
					requestDeleteTodo={requestDeleteTodo}
					setIsUpdating={setIsUpdating}
				/>
			</div>
		</div>
	)
}
