import { Class, Simplify, StringKeyOf } from '../types/index.js'
import { isInstanceOf } from './is.js'


/** 安全转换对象为特定类实例 */
export const asInstanceOf = <T>(obj: unknown, constructor: Class<T>): T | undefined =>
  isInstanceOf<T>(obj, constructor) ? obj : undefined

/** 运行时删除对象指定属性（浅拷贝） */
export const omit = <
  T extends object,
  const K extends readonly (keyof T)[],
>(obj: T, keys: K): Simplify<Omit<T, K[number]>> => {
  const clone = { ...obj }
  
  for (const key of keys) {
    delete clone[key]
  }
  
  return clone
}

/** 运行时挑选对象指定属性（浅拷贝） */
export const pick = <
  T extends object,
  const K extends readonly (keyof T)[],
>(obj: T, keys: K): Simplify<Pick<T, K[number]>> => {
  const clone = {} as Pick<T, K[number]>
  
  for (const key of keys) {
    clone[key] = obj[key]
  }
  
  return clone
}

/** Object 实例自身的方法 */
export const toString = (self: unknown) => Object.prototype.toString.call(self)

/** 类型化实体 */
export const typedEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as { [P in StringKeyOf<T>]: [ P, T[P] ] }[StringKeyOf<T>][]

/** 映射对象的键和值，并返回新的对象 */
export const mapObject = <
  T extends Record<PropertyKey, unknown>,
  S extends Extract<keyof T, string> = Extract<keyof T, string>,
  R extends PropertyKey = S,
  V = unknown,
>(
  obj: T,
  mapper: <P extends S>(key: P, value: T[P]) => [ R, V ],
  keys?: readonly S[],
) => {
  const result = {} as { [P in R]: V }
  const selectedKeys = keys ?? (Object.keys(obj) as S[])
  
  for (const key of selectedKeys) {
    const [ newKey, value ] = mapper(key, obj[key])
    result[newKey] = value
  }
  
  return result
}
