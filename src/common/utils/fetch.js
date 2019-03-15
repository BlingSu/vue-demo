/**
 * @desc fetch
 * @param url
 * @param options {method, headerse, body, type, ...reset}
 * @returns { Promise<any> }
 */

import 'whatwg-fetch'
export default function fetchApi (url, options) {
  const isObj = obj => Object.prototype.toString.call(obj) === '[object Object]'
  return new Promise((resolve, reject) => {
    if (!isObj(options)) {
      options = {}
    }
    let baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://development.test.api'
    let headers = new Headers({})
    if (isObj(options.headers)) {
      for (let k in options.headers) {
        headers.set(k, options.headers[k])
      }
    }
    Reflect.deleteProperty(options, 'headers')
    if (options.method && options.method === 'GET') {
      if (isObj(options.body)) {
        let arr = []
        for (let k in options.body) {
          if (typeof options.body[k] !== 'undefined') {
            arr.push(`${k}=${options.body[k]}`)
          }
        }
        if (arr.length > 0) {
          url += `?${arr.join('&')}`
        }
      }
      Reflect.deleteProperty(options, 'body')
    } else {
      if (!options.type || options.type === 'json') {
        headers.set('Content-Type', 'application/json;charset=UTF-8')
        options.body = JSON.stringify(options.body)
      } else if (options.type === 'form') {
        headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
        let arr = []
        for (let k in options.body) {
          if (typeof options.body[k] !== 'undefined') {
            arr.push(`${k}=${options.body[k]}`)
          }
        }
        options.body = arr.join('&')
      } else if (options.type === 'file') {
        let form = new FormData()
        for (let k in options.body) {
          if (typeof options.body[k] !== 'undefined') {
            form.append(k, options.body[k])
          }
        }
        options.body = form
      }
    }
    if (!/^(https?):\/\//.test(url)) {
      url = baseURL + url
    }
    const req = new Request(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      ...options,
      headers
    })
    // example
    fetch(req).then(res => {
      if (!res.ok) {
        reject()
        return false
      }
      res.json().then(json => {
        if (json.code === '200') {
          resolve(json)
          return false
        }
        if (json.code == '401') {
          let timer = setTimeout(() => {
            clearTimeout(timer)
            location.href = '/login'
          }, 1500)
          console.log(`Unauthorized`)
          return false
        }
        reject(json.error)
      })
    }).catch(err => {
      reject(err)
    })
  })
}