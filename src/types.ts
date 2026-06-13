/**
 * TypeScript Utility Types Collection
 * -----------------------------------
 * Contains common and advanced type helpers.
 */

/** 移除 readonly 修饰符 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/** 指定属性可选 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/** 指定属性必填 */
export type MarkRequired<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;

/** 类构造函数类型 */
export type Constructor<T> = new (...args: any[]) => T;

/** 提取非函数属性名 */
export type NonFunctionPropertyNamesOf<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/** 提取非函数属性 */
export type NonFunctionPropertiesOf<T> = Pick<T, NonFunctionPropertyNamesOf<T>>;

/** 任意函数 */
export type AnyFunction = (...args: any[]) => any;

/** 任意返回 Promise 的函数 */
export type AsyncFunction = (...args: any[]) => Promise<unknown>;

/** 仅包含异步方法的成员 */
export type PickAsyncMethods<T> = {
  [P in keyof T]: T[P] extends AsyncFunction ? T[P] : never;
};

/** 异步方法的键名 */
export type AsyncMethodsOf<T> = {
  [P in keyof T]: T[P] extends AsyncFunction ? P : never;
}[keyof T];

/** 同步或异步值 */
export type MaybePromise<T> = T | Promise<T>;

/** 提取 Promise 返回值类型 */
export type PromiseReturnType<T extends AsyncFunction> = T extends (...args: any) => Promise<infer R> ? R : any;

/** 仅包含函数成员 */
export type PickMethods<T> = {
  [P in keyof T]: T[P] extends Function ? T[P] : never;
};

/** 仅包含同步函数成员 */
export type PickSyncMethods<T> = Omit<PickMethods<T>, AsyncMethodsOf<T>>;

/** 提取同步方法（不返回 Promise）的键名 */
export type SyncMethodsOf<T> = {
  [P in keyof T]: T[P] extends AsyncFunction
    ? never
    : T[P] extends Function
      ? P
      : never;
}[keyof T];

/** 所有方法的键名 */
export type MethodsOf<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

/** 至少包含一个属性（非空对象约束） */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/** 参数类型与原函数一致；返回值变为 Promise<原返回类型> */
export type Promisified<T extends AnyFunction> = (...args: Parameters<T>) => Promise<ReturnType<T>>;

/** 取第 N 个参数类型定义 */
export type ParamAtSafe<F extends (...args: any) => any, I extends number> =
  Parameters<F> extends { [K in I]: infer R } ? R : never

/** 提取指定类型 T 的 keys */
export type Keys<T> = keyof T

/** 对象类型转可索引对象类型 */
export type Indexable<T> = {
  [K in keyof T]: T[K]
}

/** TS 原始数据类型 */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined

/** TS 内置数据类型 */
export type Builtin =
  | Primitive
  | Date
  | RegExp
  | Error
  | Map<any, any>
  | Set<any>
  | WeakMap<any, any>
  | WeakSet<any>

/** 递归 Required */
export type DeepRequired<T> =
// Builtin
  T extends Builtin
    ? T
    // Function
    : T extends AnyFunction
      ? T
      // Tuple（保留结构）
      : T extends readonly [ ...infer U ]
        ? { [K in keyof U]-?: DeepRequired<U[K]> }
        // Array / readonly array（统一为可写数组）
        : T extends readonly (infer U)[]
          ? DeepRequired<U>[]
          // Object
          : T extends object
            ? { [K in keyof T]-?: DeepRequired<T[K]> }
            : T

/** 递归 Partial */
export type DeepPartial<T> =
// Builtin
  T extends Builtin
    ? T
    // Function
    : T extends AnyFunction
      ? T
      // Tuple（保留结构）
      : T extends readonly [ ...infer U ]
        ? { [K in keyof U]?: DeepPartial<U[K]> }
        // Array / readonly array（统一为可写数组）
        : T extends readonly (infer U)[]
          ? DeepPartial<U>[]
          // Object
          : T extends object
            ? { [K in keyof T]?: DeepPartial<T[K]> }
            : T

/** 将对象中的所有函数类型转换为异步函数 */
export type Asyncify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : T[K]
}
