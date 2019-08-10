/**
 * Wrapper for ajax requests with the Fetch API
 *
 * This wrapper assumes response JSON datatype, otherwise it will error
 *
 * @param   {string}           url         First argument of the fetch api, url string
 * @param   {object}           obj
 * @param   {string}           obj.method  Request method
 * @param   {object}           obj.body    Request body
 * @param   {object}           obj.options Additional options to second argument of the fetch api
 * @param   {function(object)} obj.success Callback function for a successful ajax request
 * @param   {function(object)} obj.error   Callback function for an unsuccessful request
 * @returns {Promise}                      Promise returned from fetch api
 *
 * @example
 * // Sample ajax fetch from our scheduler api
 * ajaxFetch('/api/user/1', {
 *   success: data => console.log(data),
 *   error: err => console.log(err)
 * });
 */
export async function ajaxFetch(
  url,
  { method, body, options = {}, success = console.log, error = console.error } = {}
) {
  try {
    // Send fetch request with JSON stringified body and default headers
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    if (!res.ok) {
      throw res;
    }

    // Assume our server returns json data
    const json = await res.json();
    return success(json);
  } catch (err) {
    return error(err);
  }
}
