import React, { Component } from 'react';
import { connect } from 'react-redux';

import todosActions from '../actions/todos.js';

class Home extends Component {

	handleChange(event) {
		const newTodo = { title: event.target.value };
		this.props.reduxDispatch.updateNewTodo(newTodo);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.reduxDispatch.addNewTodo();
	}

	handleRemove(index) {
		this.props.reduxDispatch.removeTodo(index);
	}

  render() {
    return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" onChange={this.handleChange.bind(this)} value={this.props.reduxState.newTodo.title} placeholder="todo..." />
					<input type="submit" value="Submit" />
				</form>
				<ul>
					{this.props.reduxState.todos.map((todo, index) => (<li key={index}>{todo.title} <button onClick={event => this.handleRemove(index)}>X</button></li>))}
				</ul>
			</React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
	reduxState: {
		todos: state.todos.todos,
		newTodo: state.todos.newTodo
	}
});

const mapDispatchToProps = (dispatch) => ({
	reduxDispatch: {
		addNewTodo() { dispatch(todosActions.addNewTodo());},
		updateNewTodo(todo) { dispatch(todosActions.updateNewTodo(todo));},
		removeTodo(index) { dispatch(todosActions.removeTodo(index)); }
	}
});

const HomeWithRedux = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeWithRedux;
