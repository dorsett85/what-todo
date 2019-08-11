export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SORT_BY_DUE_DATE = 'SORT_BY_DUE_DATE';

export const setUser = payload => ({ type: SET_USER, payload });
export const unsetUser = payload => ({ type: UNSET_USER, payload });

export const addTodo = payload => ({ type: ADD_TODO, payload });
export const updateTodo = payload => ({ type: UPDATE_TODO, payload });
export const deleteTodo = payload => ({ type: DELETE_TODO, payload });
export const sortByDueDate = payload => ({ type: SORT_BY_DUE_DATE, payload });
