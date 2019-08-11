import apiFetch from './apiFetch';

export class Api {
  static initialLoad = success => apiFetch('/api/initialLoad', { success });

  static login({ body, success }) {
    return apiFetch('/api/login', {
      method: 'POST',
      body,
      success
    });
  }

  static logout(success) {
    return apiFetch('/api/logout', {
      method: 'POST',
      success
    });
  }

  static insertTodo({ body, success }) {
    return apiFetch('/api/todo', {
      method: 'POST',
      body,
      success
    });
  }

  static updateTodo({ body, success }) {
    return apiFetch('/api/todo', {
      method: 'PUT',
      body,
      success
    });
  }

  static deleteTodo({ body, success }) {
    return apiFetch('/api/todo', {
      method: 'DELETE',
      body,
      success
    });
  }
}
