import type { Constructor } from './types.js'


/** 安全判断对象是否为特定类实例 */
export function isInstanceOf<T>(obj: any, constructor: Constructor<T>): boolean {
  return typeof obj === 'object' && obj instanceof constructor
}

/** 安全转换对象为特定类实例 */
export function asInstanceOf<T>(obj: any, constructor: Constructor<T>): T | undefined {
  return isInstanceOf<T>(obj, constructor) ? obj as T : undefined
}

/** 运行时删除对象指定属性（浅拷贝） */
export function omit<T extends {}, K extends readonly (keyof T)[]>(t: T, keys: K): Omit<T, K[number]> {
  const clone = { ...t }
  for (const key of keys) {
    delete clone[key]
  }
  return clone;
}
