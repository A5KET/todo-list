/**
 * @enum {string}
 */
export const HTTPMethod = {
  Get: 'GET',
  Post: 'POST',
  Delete: 'DELETE',
  Put: 'PUT'
}


export class ResponseError extends Error {

}


/**
 * 
 * @param {string} url 
 * @param {HTTPMethod} method 
 * @param {Object} body
 * @param {Object} headers 
 * @returns 
 */
export async function JSONRequest(url, method, body, headers={}) {
  const response = await fetch(url, {
    method: method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    body: body ? JSON.stringify(body) : undefined
  })
  .then(response => response.json())
  .catch(error => console.log(error))

  if (response.error) {
    throw new ResponseError(response.error)
  }

  return response.data
}


export class APIClient {
  constructor(baseUrl='', defaultHeaders={}) {
    this.baseUrl = baseUrl
    this.defaultHeaders = defaultHeaders
  }

  get(url, headers={}) {
    return JSONRequest(this.createUrl(url), HTTPMethod.Get, undefined, this.getHeaders(headers))
  }

  post(url, body={}, headers={}) {
    return JSONRequest(this.createUrl(url), HTTPMethod.Post, body, headers)
  }

  put(url, body={}, headers={}) {
    return JSONRequest(this.createUrl(url), HTTPMethod.Put, body, headers)
  }

  delete(url, body={}, headers={}) {
    return JSONRequest(this.createUrl(url), HTTPMethod.Delete, body, headers)
  }

  getHeaders(headers) {
    return Object.assign(this.defaultHeaders, headers)
  }

  createUrl(url) {
    return this.baseUrl + url
  }
}