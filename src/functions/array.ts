/** 参数数组化 */
export const castArray = <T>(v: T | readonly T[]) => {
  return Array.isArray(v) ? v : [ v ]
}

/** 过滤数组中的 undefined 值 */
export const nonUndefined = <T>(arr: readonly T[]): Exclude<T, undefined>[] => {
  return arr.filter((e): e is Exclude<T, undefined> => e !== undefined)
}

/** 过滤数组中的 null 值 */
export const nonNull = <T>(arr: readonly T[]): Exclude<T, null>[] => {
  return arr.filter((e): e is Exclude<T, null> => e !== null)
}

/** 过滤数组中的 null 和 undefined 值 */
export const nonNullable = <T>(arr: readonly T[]): NonNullable<T>[] => {
  return arr.filter((e): e is NonNullable<T> => e !== null && e !== undefined)
}

/** 按固定大小分组数组元素 */
export const chunk = <T>(arr: readonly T[], size: number) => {
  if (size <= 0) return []
  
  return arr
    .reduce<T[][]>(
      (res, v, i) => {
        (res[Math.floor(i / size)] ??= []).push(v)
        return res
      },
      [],
    )
}

/** 按固定间隔替换数组元素 */
export const replaceEvery = <T, V = T>(arr: readonly T[], step: number, val: V) => {
  if (step <= 0) return []
  
  return arr.map((v, i) => (i + 1) % step === 0 ? val : v)
}
