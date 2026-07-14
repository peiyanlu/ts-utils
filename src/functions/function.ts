import type { AnyFunction, Promisified } from '../types/index.js'


/** 仅执行一次的方法 */
export const once = <Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R => {
  let called = false
  let result: R
  
  return (...args: Args) => {
    if (!called) {
      result = fn(...args)
      called = true
    }
    return result
  }
}

/** 仅执行一次的异步方法 */
export const onceAsync = <Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
): (...args: Args) => Promise<R> => {
  let promise: Promise<R> | undefined
  
  return (...args: Args) => {
    if (!promise) {
      promise = fn(...args)
        .catch(err => {
          promise = undefined
          throw err
        })
    }
    return promise
  }
}

/** 同步函数转为异步 */
export const promisify = <T extends AnyFunction>(fn: T): Promisified<T> => {
  return (...args) => {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      try {
        const result = fn(...args)
        if (result instanceof Promise) {
          result.then(resolve).catch(reject)
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}
