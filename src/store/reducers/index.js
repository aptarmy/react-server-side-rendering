import { combineReducers } from 'redux';

import todosReducer from './todos';
import pageDetailReducer from './pageDetails';

const rootReducer = combineReducers({
	todos: todosReducer,
	pageDetail: pageDetailReducer
});

export default rootReducer;
