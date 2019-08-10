import { SET_INITIAL_DATA, SET_USER } from './actions';

export const appReducer = (state, { type, payload }) => {
  if (type === SET_INITIAL_DATA) {
    return state;
  }
  if (type === SET_USER) {
    return { ...state, user: payload };
  }
  return state;
};
