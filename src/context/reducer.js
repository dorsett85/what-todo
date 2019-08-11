import { SET_USER, UNSET_USER, ADD_TODO, UPDATE_TODO, DELETE_TODO } from './actions';
import {
  todoDueDatesToDateObject,
  sortTodosByDate
} from '../common/functions/todosUtils';

export const userReducer = (state, { type, payload }) => {
  if (type === SET_USER) {
    if (!payload._id) {
      return payload;
    }
    const todos = todoDueDatesToDateObject(payload.todos);
    sortTodosByDate(todos);
    payload.last_login = new Date(payload.last_login);
    return { ...payload, todos };
  }
  if (type === UNSET_USER) {
    return payload;
  }
  if (type === ADD_TODO) {
    const todos = todoDueDatesToDateObject([...state.todos, payload]);
    sortTodosByDate(todos);
    return { ...state, todos };
  }
  if (type === UPDATE_TODO) {
    payload.due_date = new Date(payload.due_date);
    let checkForDateSort;
    const todos = [...state.todos];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i]._id === payload._id) {
        if (todos[i].due_date.getTime() !== payload.due_date.getTime()) {
          checkForDateSort = true;
        }
        todos[i] = payload;
        break;
      }
    }
    if (checkForDateSort) {
      sortTodosByDate(todos);
    }
    return { ...state, todos };
  }
  if (type === DELETE_TODO) {
    const todos = state.todos.filter(todo => todo._id !== payload);
    return { ...state, todos };
  }
  return state;
};
