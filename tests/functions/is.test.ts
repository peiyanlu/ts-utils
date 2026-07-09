import { expect, it } from 'vitest'
import {
  isAsyncFunction,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isFunction, isIndex,
  isInstanceOf, isNonNullable,
  isNotObject, isNull,
  isObject,
  isPlainObject,
  isSyncFunction, isUndefined, isZero,
} from '../../src/index.js'


class Foo {}

it('isInstanceOf', () => {
  const foo = new Foo()
  expect(isInstanceOf(foo, Foo)).toBe(true)
  expect(isInstanceOf({}, Foo)).toBe(false)
})

it('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject(new Foo())).toBe(true)
  expect(isObject(null)).toBe(false)
})

it('isNotObject', () => {
  expect(isNotObject({})).toBe(false)
  expect(isNotObject(new Foo())).toBe(false)
  expect(isNotObject(null)).toBe(true)
})

it('isPlainObject', () => {
  expect(isPlainObject({})).toBe(true)
  expect(isPlainObject(Object.create(null))).toBe(true)
  expect(isPlainObject(new Foo())).toBe(false)
  expect(isPlainObject(null)).toBe(false)
})

it('isEmptyObject', () => {
  expect(isEmptyObject({})).toBe(true)
  expect(isEmptyObject(Object.create(null))).toBe(true)
  expect(isEmptyObject(new Foo())).toBe(false)
  expect(isEmptyObject(null)).toBe(false)
  expect(isEmptyObject({ a: 1 })).toBe(false)
})

it('isEmptyString', () => {
  expect(isEmptyString('')).toBe(true)
  expect(isEmptyString('abc')).toBe(false)
})

it('isEmptyArray', () => {
  expect(isEmptyArray([])).toBe(true)
  expect(isEmptyArray([ 1 ])).toBe(false)
  expect(isEmptyArray(new Array(1))).toBe(false)
})

it('isFunction', () => {
  expect(isFunction('')).toBe(false)
  expect(isFunction([])).toBe(false)
  expect(isFunction({})).toBe(false)
  expect(isFunction(Foo)).toBe(true)
  expect(isFunction(Array)).toBe(true)
  expect(isFunction(() => void 0)).toBe(true)
})

it('isSyncFunction', () => {
  expect(isSyncFunction(Foo)).toBe(true)
  expect(isSyncFunction(Array)).toBe(true)
  expect(isSyncFunction(() => void 0)).toBe(true)
  expect(isSyncFunction(async () => void 0)).toBe(false)
})

it('isAsyncFunction', () => {
  expect(isAsyncFunction(Foo)).toBe(false)
  expect(isAsyncFunction(Array)).toBe(false)
  expect(isAsyncFunction(() => void 0)).toBe(false)
  expect(isAsyncFunction(async () => void 0)).toBe(true)
})

it('isUndefined', () => {
  expect(isUndefined(undefined)).toBe(true)
  expect(isUndefined(null)).toBe(false)
  expect(isUndefined(10)).toBe(false)
})

it('isNull', () => {
  expect(isNull(undefined)).toBe(false)
  expect(isNull(null)).toBe(true)
  expect(isNull(10)).toBe(false)
})

it('isZero', () => {
  expect(isZero(0)).toBe(true)
  expect(isZero(1)).toBe(false)
})

it('isIndex', () => {
  expect(isIndex(1)).toBe(true)
  expect(isIndex(0)).toBe(true)
  expect(isIndex(-1)).toBe(false)
})

it('isNonNullable', () => {
  expect(isNonNullable(1)).toBe(true)
  expect(isNonNullable('0')).toBe(true)
  expect(isNonNullable(undefined)).toBe(false)
  expect(isNonNullable(null)).toBe(false)
})

it('isInstanceOf', () => {
  class Boo extends Foo{}
  expect(isInstanceOf(new Foo(), Foo)).toBe(true)
  expect(isInstanceOf(new Boo(), Foo)).toBe(true)
  expect(isInstanceOf({}, Foo)).toBe(false)
})
