/** Buffer → Uint8Array */
export const bufferToUint8 = (buffer: Buffer): Uint8Array => {
  return new Uint8Array(buffer)
}

/** Uint8Array → Buffer */
export const uint8ToBuffer = (uint8: Uint8Array): Buffer => {
  return Buffer.from(uint8.slice())
}

/** Buffer → ArrayBuffer (copy-safe) */
export const bufferToArrayBuffer = (buffer: Buffer): ArrayBuffer => {
  const data = new Uint8Array(buffer)
  return data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength,
  )
}

/** ArrayBuffer → Buffer */
export const arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
  return Buffer.from(arrayBuffer.slice())
}
