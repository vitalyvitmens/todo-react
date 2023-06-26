import styles from '../app.module.css'

export const TodoList = ({
	todos,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
}) => {
	return (
		<ul className={styles.allTodos}>
			{todos.map((t) => (
				<li className={styles.singleTodo} key={t.id}>
					<span className={styles.todoText}>
						{t.id}. {t.title}
					</span>
					<button
						className={!todo ? styles.btnYellow : styles.btnGreen}
						onClick={() => {
							if (todo === '') {
								setIsUpdating(true)
								setTodo(t.title)
							} else {
								requestUpdateTodo(t.id)
								setTodo('')
							}
						}}
					>
						Изменить
					</button>
					<button
						className={styles.btnRed}
						onClick={() => requestDeleteTodo(t.id)}
					>
						Удалить
					</button>
				</li>
			))}
		</ul>
	)
}
