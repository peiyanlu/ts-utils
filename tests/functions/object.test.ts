import { expect, it } from 'vitest'
import { asInstanceOf, mapObject, omit, pick, toString, typedEntries } from '../../src/index.js'


class Foo {}

it('asInstanceOf', () => {
  const foo = new Foo()
  expect(asInstanceOf(foo, Foo)).toBe(foo)
  expect(asInstanceOf({}, Foo)).toBeUndefined()
})

it('omit', () => {
  const result = omit({ a: 1, b: 2 }, [ 'b' ])
  expect(result).toEqual({ a: 1 })
})

it('pick', () => {
  const result = pick({ a: 1, b: 2 }, [ 'b' ])
  expect(result).toEqual({ b: 2 })
})

it('toString', () => {
  expect(toString([])).toBe('[object Array]')
  expect(toString({})).toBe('[object Object]')
  expect(toString(() => {})).toBe('[object Function]')
})

it('typedEntries', () => {
  const id = Symbol('id')
  const obj = {
    name: 'hello',
    age: 10,
    enabled: true,
  }
  const objSymbol = {
    ...obj,
    [id]: '001',
  }
  
  expect(typedEntries(obj)).toEqual([
    [ 'name', 'hello' ],
    [ 'age', 10 ],
    [ 'enabled', true ],
  ])
  expect(typedEntries(objSymbol)).toEqual([
    [ 'name', 'hello' ],
    [ 'age', 10 ],
    [ 'enabled', true ],
  ])
  expect(typedEntries({})).toEqual([])
})

it('mapObject', () => {
  const obj = { a: 1, b: 2 }
  
  expect(
    mapObject(obj, (k, v) => [ k, v ]),
  ).toEqual(obj)
  
  expect(
    mapObject({}, (k, v) => [ k, v ]),
  ).toEqual({})
  
  expect(
    mapObject(obj, (k, v) => [ k, v ], [ 'a' ]),
  ).toEqual({ a: 1 })
  
  expect(
    mapObject(obj, (k, v) => [ k, v.toString() ], [ 'a' ]),
  ).toEqual({ a: '1' })
  
  expect(
    mapObject(obj, (k, v) => [ k.toUpperCase(), v ], [ 'a' ]),
  ).toEqual({ A: 1 })
})
