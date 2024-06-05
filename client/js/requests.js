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
  let response = await fetch(url, {
    method: method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    body: body ? JSON.stringify(body) : undefined
  })

  const text = await response.text()

  if (!text) {
    return undefined
  }

  try {
    response = JSON.parse(text)
  } catch (error) {
    console.log('parse error', text)
    return undefined
  }

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

  request(url, method, body, headers) {
    return JSONRequest(this.createUrl(url), method, body, this.getHeaders(headers))
  }

  get(url, headers={}) {
    return this.request(url, HTTPMethod.Get, undefined, headers)
  }

  post(url, body={}, headers={}) {
    return this.request(url, HTTPMethod.Post, body, headers)
  }

  put(url, body={}, headers={}) {
    return this.request(url, HTTPMethod.Put, body, headers)
  }

  delete(url, body={}, headers={}) {
    return this.request(url, HTTPMethod.Delete, body, headers)
  }

  getHeaders(headers) {
    return Object.assign(this.defaultHeaders, headers)
  }

  createUrl(url) {
    return this.baseUrl + url
  }
}