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

/** 任意返回 Promise 的函数 */
export type AsyncFunction = (...args: any[]) => Promise<unknown>;

/** 仅包含异步方法的成员 */
export type PickAsyncMethods<T> = { [P in keyof T]: T[P] extends AsyncFunction ? T[P] : never; };

/** 异步方法的键名 */
export type AsyncMethodsOf<T> = { [P in keyof T]: T[P] extends AsyncFunction ? P : never }[keyof T];

/** 提取 Promise 返回值类型 */
export type PromiseReturnType<T extends AsyncFunction> = T extends (...args: any) => Promise<infer R> ? R : any;

/** 仅包含函数成员 */
export type PickMethods<T> = { [P in keyof T]: T[P] extends Function ? T[P] : never; };

/** 仅包含同步函数成员 */
export type PickSyncMethods<T> = Omit<PickMethods<T>, AsyncMethodsOf<T>>;

/** 提取同步方法（不返回 Promise）的键名 */
export type SyncMethodsOf<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => Promise<any>
    ? never
    : T[P] extends Function
      ? P
      : never;
}[keyof T];

/** 至少包含一个属性（非空对象约束） */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
