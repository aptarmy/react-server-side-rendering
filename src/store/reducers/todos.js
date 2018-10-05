const defaultState = {
	todos: [], // will be shown as a list
	newTodo: { title: "" } // will be injected to add-new-todo form
};

const todos = (state=defaultState, action) => {
	switch(action.type) {
		case "TODOS_ADD_NEW":
			// if newTodo is empty, then do nothing
			if(state.newTodo.title.trim() === "") { return state; }
			state.todos.push(state.newTodo);
			state.newTodo = { title: "" };
			state =  JSON.parse(JSON.stringify(state));
			return state;
		case "TODOS_UPDATE_NEW":
			state.newTodo = action.payload;
			state = JSON.parse(JSON.stringify(state));
			return state;
		case "TODOS_REMOVE_BY_INDEX":
			state.todos.splice(action.payload, 1);
			state = JSON.parse(JSON.stringify(state));
			return state;
		default:
			return state;
	}
}

export default todos;
