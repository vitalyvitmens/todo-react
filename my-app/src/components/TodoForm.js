import styles from '../app.module.css'

export const TodoForm = ({
	handleSubmit,
	todo,
	setTodo,
	requestAddTodo,
	isUpdating,
}) => {
	return (
		<form className={styles.todoForm} onSubmit={handleSubmit}>
			<input
				type="text"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<button
				disabled={isUpdating}
				className={styles.btnBlue}
				type="submit"
				onClick={requestAddTodo}
			>
				{isUpdating ? null : 'Добавить'}
			</button>
		</form>
	)
}
