import type { AnyFunction, Constructor, Promisified } from './types.js'


/** 判断一个值是否为 Object */
export const isObject = (v: unknown) => typeof v === 'object'

/** 判断一个值是否为函数 */
export const isFunction = (v: unknown) => typeof v === 'function'

/** 安全判断对象是否为特定类实例 */
export const isInstanceOf = <T>(obj: any, constructor: Constructor<T>): boolean =>
  isObject(obj) && obj instanceof constructor

/** 安全转换对象为特定类实例 */
export const asInstanceOf = <T>(obj: any, constructor: Constructor<T>): T | undefined =>
  isInstanceOf<T>(obj, constructor) ? obj as T : undefined

/** 运行时删除对象指定属性（浅拷贝） */
export const omit = <T extends {}, K extends readonly (keyof T)[]>(t: T, keys: K): Omit<T, K[number]> => {
  const clone = { ...t }
  for (const key of keys) {
    delete clone[key]
  }
  return clone
}

/** 运行时挑选对象指定属性（浅拷贝） */
export const pick = <T extends {}, K extends readonly (keyof T)[]>(obj: T, keys: K): Pick<T, K[number]> => {
  const clone = {} as Pick<T, K[number]>
  for (const key of keys) {
    if (key in obj) {
      clone[key] = obj[key]
    }
  }
  return clone
}

/** Object 实例自身的方法 */
export const toString = (self: unknown) => Object.prototype.toString.call(self)

/** 判断一个值是否为同步函数（即 `[object Function]`） */
export const isSyncFunction = (v: unknown) => toString(v) === '[object Function]'

/** 判断一个值是否为异步函数（即 `[object AsyncFunction]`） */
export const isAsyncFunction = (v: unknown) => toString(v) === '[object AsyncFunction]'

/** 判断一个值是否为普通对象（即 `[object Object]`） */
export const isPlainObject = (value: unknown): value is object => toString(value) === '[object Object]'

/** 判断对象是否为空对象（无自身可枚举属性） */
export const isEmptyObject = (obj: object): boolean => Object.keys(obj).length === 0 && obj.constructor === Object

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

/** 延后执行 */
export const sleep = (ms: number): Promise<void> => new Promise<void>(r => setTimeout(r, ms))

/** 仅执行一次的方法 */
export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false
  let result: ReturnType<T>
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

/** 仅执行一次的异步方法 */
export const onceAsync = <T extends (...args: any[]) => Promise<any>>(fn: T): T => {
  let promise: ReturnType<T>
  
  return ((...args: Parameters<T>) => {
    if (!promise) {
      promise = fn(...args) as ReturnType<T>
    }
    return promise
  }) as unknown as T
}

/** undefined 值判断 */
export const isUndefined = (val: unknown): val is undefined => undefined === val

/** null 值判断 */
export const isNull = (val: unknown): val is null => null === val

/** 0 值判断 */
export const isZero = (val: number): val is 0 => 0 === val

/** 大写字符串的首字符 */
export const upperFirst = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

/** 参数数组化 */
export const castArray = <T = unknown>(arr: T | T[]) => {
  return Array.isArray(arr) ? arr : [ arr ]
}

/** 映射对象中指定属性的 value，并返回新的对象 */
export const mapObjectValues = <
  T extends Record<PropertyKey, unknown>,
  R,
  K extends readonly (keyof T)[]
>(obj: T, mapper: (value: T[keyof T], key: keyof T) => R, keys?: K): { [K in keyof T]: R } => {
  return Object.fromEntries(
    Object
      .entries(obj)
      .filter(([ k, _v ]) => keys ? keys.includes(k as keyof T) : true)
      .map(([ k, v ]) => [ k, mapper(v as T[keyof T], k as keyof T) ]),
  ) as { [K in keyof T]: R }
}

/** 映射对象的键和值，并返回新的对象 */
export const mapObject = <
  T extends Record<PropertyKey, unknown>,
  K extends PropertyKey,
  V,
>(obj: T, mapper: <P extends keyof T>(key: P, value: T[P]) => [ K, V ]): Record<K, V> => {
  return Object.fromEntries(
    Object
      .entries(obj)
      .map(([ key, value ]) => mapper(key as keyof T, value as T[keyof T])),
  ) as Record<K, V>
}

/** 过滤数组中的 undefined 值 */
export const noneUndefined = <T>(arr: readonly T[]): Exclude<T, undefined>[] => {
  return arr.filter((e): e is Exclude<T, undefined> => e !== undefined)
}

/** 过滤数组中的 null 值 */
export const noneNull = <T>(arr: readonly T[]): Exclude<T, null>[] => {
  return arr.filter((e): e is Exclude<T, null> => e !== null)
}

/** 过滤数组中的 null 和 undefined 值 */
export const noneNullable = <T>(arr: readonly T[],): NonNullable<T>[] => {
  return arr.filter((e): e is NonNullable<T> => e !== null && e !== undefined,)
}

/** ArrayBuffer → Uint8Array */
export const arrayBufferToUint8 = (arrayBuffer: ArrayBuffer): Uint8Array => {
  return new Uint8Array(arrayBuffer.slice())
}

/** Uint8Array → ArrayBuffer (copy-safe) */
export const uint8ToArrayBuffer = (uint8: Uint8Array): ArrayBuffer => {
  const data = new Uint8Array(uint8)
  return data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength,
  )
}

/** 复制为 uint8 */
export const safeUint8 = (data: ArrayBuffer | Uint8Array): Uint8Array => {
  return data instanceof Uint8Array ? data.slice() : new Uint8Array(data.slice())
}
