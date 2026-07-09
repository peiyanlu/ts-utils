import { Class } from '../types/index.js'
import { toString } from './object.js'


/** 判断一个值是否为 Object（非 null） */
export const isObject = (v: unknown): v is object => typeof v === 'object' && v !== null

/** 判断一个值是否不是 Object */
export const isNotObject = (v: unknown): boolean => typeof v !== 'object' || v === null

/** 判断一个值是否为普通对象（{} 或 Object.create(null)） */
export const isPlainObject = (v: unknown): v is object => {
  if (!isObject(v)) return false
  const proto = Object.getPrototypeOf(v)
  return proto === Object.prototype || proto === null
}

/** 判断对象是否为空对象（无自身属性） */
export const isEmptyObject = (v: unknown): boolean => isPlainObject(v) && isZero(Reflect.ownKeys(v).length)

/** 判断字符串是否为空 */
export const isEmptyString = (v: string): boolean => isZero(v.length)

/** 判断数组是否为空 */
export const isEmptyArray = <T>(v: readonly T[]): boolean => isZero(v.length)

/** 判断一个值是否为函数 */
export const isFunction = (v: unknown) => typeof v === 'function'

/** 判断一个值是否为同步函数（即 `[object Function]`） */
export const isSyncFunction = (v: unknown) => toString(v) === '[object Function]'

/** 判断一个值是否为异步函数（即 `[object AsyncFunction]`） */
export const isAsyncFunction = (v: unknown) => toString(v) === '[object AsyncFunction]'

/** undefined 值判断 */
export const isUndefined = (v: unknown): v is undefined => undefined === v

/** null 值判断 */
export const isNull = (v: unknown): v is null => null === v

/** 0 值判断 */
export const isZero = (v: number): v is 0 => 0 === v

/** -1 值判断 */
export const isIndex = (v: number) => -1 < v

/** 断值不是 null/undefined */
export const isNonNullable = <T>(v: T): v is NonNullable<T> => v !== null && v !== undefined

/** 安全判断对象是否为特定类实例 */
export const isInstanceOf = <T>(obj: unknown, constructor: Class<T>): obj is T =>
  obj instanceof constructor
