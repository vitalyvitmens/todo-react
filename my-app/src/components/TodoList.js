import styles from '../app.module.css'

export const TodoList = ({
	todos,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
}) => {
	return (
		<ul className={styles.allTodos}>
			{todos.map((t) => (
				<li className={styles.singleTodo} key={t.id}>
					<span className={styles.todoText}>
						{t.id}. {t.title}
					</span>
					<button
						onClick={() => {
							if (todo === '') {
								setTodo(t.title)
							} else {
								requestUpdateTodo(t.id)
								setTodo('')
							}
						}}
					>
						Edit
					</button>
					<button onClick={() => requestDeleteTodo(t.id)}>Delete</button>
				</li>
			))}
		</ul>
	)
}
