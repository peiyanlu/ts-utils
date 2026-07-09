import { describe, expect, it } from 'vitest'
import {
  arrayBufferToBlob,
  blobToArrayBuffer,
  blobToFile,
  blobToUint8,
  fileToArrayBuffer,
  fileToUint8,
  uint8ToBlob,
  uint8ToFile,
} from '../../src/web/index.js'


describe('blobToArrayBuffer', () => {
  it('should convert Blob to ArrayBuffer', async () => {
    const source = new Blob([ new Uint8Array([ 1, 2, 3 ]) ], {
      type: 'application/octet-stream',
    })
    
    const result = await blobToArrayBuffer(source)
    
    expect(new Uint8Array(result))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
    
    const uint8 = new Uint8Array(result)
    uint8[0] = 9
    
    expect(new Uint8Array(result))
      .toStrictEqual(new Uint8Array([ 9, 2, 3 ]))
    
    expect(await source.arrayBuffer())
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]).buffer)
  })
})

describe('arrayBufferToBlob', () => {
  it('should convert ArrayBuffer to Blob', async () => {
    const source = new Uint8Array([ 1, 2, 3 ]).buffer
    
    const result = arrayBufferToBlob(source, 'application/octet-stream')
    
    expect(result.type)
      .toBe('application/octet-stream')
    
    expect(new Uint8Array(await result.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})

describe('blobToUint8', () => {
  it('should convert Blob to Uint8Array', async () => {
    const source = new Blob([ new Uint8Array([ 1, 2, 3 ]) ])
    
    const result = await blobToUint8(source)
    
    expect(result)
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
    
    result[0] = 9
    
    expect(result)
      .toStrictEqual(new Uint8Array([ 9, 2, 3 ]))
    
    expect(new Uint8Array(await source.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})

describe('uint8ToBlob', () => {
  it('should convert Uint8Array to Blob', async () => {
    const source = new Uint8Array([ 1, 2, 3 ])
    
    const result = uint8ToBlob(source, 'application/octet-stream')
    
    expect(result.type)
      .toBe('application/octet-stream')
    
    expect(new Uint8Array(await result.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
    
    source[0] = 9
    
    expect(new Uint8Array(await result.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})

describe('fileToArrayBuffer', () => {
  it('should convert File to ArrayBuffer', async () => {
    const source = new File(
      [ new Uint8Array([ 1, 2, 3 ]) ],
      'test.bin',
      {
        type: 'application/octet-stream',
      },
    )
    
    const result = await fileToArrayBuffer(source)
    
    expect(new Uint8Array(result))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
    
    const uint8 = new Uint8Array(result)
    uint8[0] = 9
    
    expect(uint8)
      .toStrictEqual(new Uint8Array([ 9, 2, 3 ]))
    
    expect(new Uint8Array(await source.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})

describe('fileToUint8', () => {
  it('should convert File to Uint8Array', async () => {
    const source = new File(
      [ new Uint8Array([ 1, 2, 3 ]) ],
      'test.bin',
    )
    
    const result = await fileToUint8(source)
    
    expect(result)
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
    
    result[0] = 9
    
    expect(result)
      .toStrictEqual(new Uint8Array([ 9, 2, 3 ]))
    
    expect(new Uint8Array(await source.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})

describe('blobToFile', () => {
  it('should convert Blob to File', async () => {
    const source = new Blob(
      [ new Uint8Array([ 1, 2, 3 ]) ],
      {
        type: 'application/octet-stream',
      },
    )
    
    const result = blobToFile(source, 'test.bin')
    
    expect(result.name)
      .toBe('test.bin')
    
    expect(result.type)
      .toBe('application/octet-stream')
    
    expect(new Uint8Array(await result.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})

describe('uint8ToFile', () => {
  it('should convert Uint8Array to File', async () => {
    const source = new Uint8Array([ 1, 2, 3 ])
    
    const result = uint8ToFile(
      source,
      'test.bin',
      {
        type: 'application/octet-stream',
      },
    )
    
    expect(result.name)
      .toBe('test.bin')
    
    expect(result.type)
      .toBe('application/octet-stream')
    
    expect(new Uint8Array(await result.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
    
    source[0] = 9
    
    expect(new Uint8Array(await result.arrayBuffer()))
      .toStrictEqual(new Uint8Array([ 1, 2, 3 ]))
  })
})
