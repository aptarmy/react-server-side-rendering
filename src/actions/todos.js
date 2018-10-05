const todosActions = {

	updateNewTodo(todo) {
		return {
			type: 'TODOS_UPDATE_NEW',
			payload: todo
		}
	},

	addNewTodo() {
		return {
			type: "TODOS_ADD_NEW"
		}
	},

	removeTodo(index) {
		return {
			type: "TODOS_REMOVE_BY_INDEX",
			payload: index
		}
	}

};

export default todosActions;
