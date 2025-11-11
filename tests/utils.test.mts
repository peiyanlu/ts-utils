import { describe, expect, it } from 'vitest'
import { asInstanceOf, isInstanceOf, omit } from '../src/index.js'


class Foo {}

describe('ts-utils', () => {
  it('omit removes keys', () => {
    const result = omit({ a: 1, b: 2 }, [ 'b' ])
    expect(result).toEqual({ a: 1 })
  })
  
  it('isInstanceOf works correctly', () => {
    const foo = new Foo()
    expect(isInstanceOf(foo, Foo)).toBe(true)
    expect(isInstanceOf({}, Foo)).toBe(false)
  })
  
  it('asInstanceOf returns undefined if not matching', () => {
    const foo = new Foo()
    expect(asInstanceOf(foo, Foo)).toBe(foo)
    expect(asInstanceOf({}, Foo)).toBeUndefined()
  })
})
