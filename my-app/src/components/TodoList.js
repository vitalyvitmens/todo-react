import styles from '../app.module.css'

export const TodoList = ({ todos, handleDelete, handleEdit }) => {
	return (
		<ul className={styles.allTodos}>
			{todos.map((t) => (
				<li className={styles.singleTodo}>
					<span className={styles.todoText} key={t.id}>
						{t.todo}
					</span>
					<button onClick={() => handleEdit(t.id)}>Edit</button>
					<button onClick={() => handleDelete(t.id)}>Delete</button>
				</li>
			))}
		</ul>
	)
}
