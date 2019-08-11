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
 * @param  {boolean}  desc  - Sort descending order
 * @return {Object[]}
 */
export const sortTodosByDate = (todos, desc) => {
  return todos.sort((a, b) => (desc ? b.due_date - a.due_date : a.due_date - b.due_date));
};
