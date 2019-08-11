/**
 * Make due date property a date
 *
 * @param  {Object[]} todos - Array of todo objects
 * @return {Object[]}
 */
export const todoDueDatesToDateObject = todos => {
  return todos.map(todo => {
    todo.due_date = new Date(todo.due_date);
    return todo;
  });
};

/**
 * Sort todo array by due date
 * 
 * @param  {Object[]} todos - Array of todo objects
 * @return {Object[]}
 */
export const sortTodosByDate = todos => {
  return todos.sort((a, b) => a.due_date - b.due_date);
};
