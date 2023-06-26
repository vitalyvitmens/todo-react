import styles from '../app.module.css'

export const TodoForm = ({ handleSubmit, todo, setTodo, requestAddTodo }) => {
	return (
		<form className={styles.todoForm} onSubmit={handleSubmit}>
			<input
				type="text"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button type="submit" onClick={requestAddTodo}>
				Go
			</button>
		</form>
	)
}
