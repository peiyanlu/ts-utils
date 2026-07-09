/** Blob → ArrayBuffer */
export const blobToArrayBuffer = async (blob: Blob): Promise<ArrayBuffer> => {
  return await blob.arrayBuffer()
}

/** ArrayBuffer → Blob */
export const arrayBufferToBlob = (buffer: ArrayBuffer, type?: string): Blob => {
  return new Blob([ buffer ], { type })
}

/** Blob → Uint8Array */
export const blobToUint8 = async (blob: Blob): Promise<Uint8Array> => {
  return new Uint8Array(await blob.arrayBuffer())
}

/** Uint8Array → Blob */
export const uint8ToBlob = (uint8: Uint8Array, type?: string): Blob => {
  return new Blob([ new Uint8Array(uint8) ], { type })
}

/** File → ArrayBuffer */
export const fileToArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
  return await file.arrayBuffer()
}

/** File → Uint8Array */
export const fileToUint8 = async (file: File): Promise<Uint8Array> => {
  return new Uint8Array(await file.arrayBuffer())
}

/** Blob → File */
export const blobToFile = (blob: Blob, name: string, options?: FilePropertyBag): File => {
  return new File([ blob ], name, { type: blob.type, ...options })
}

/** Uint8Array → File */
export const uint8ToFile = (uint8: Uint8Array, name: string, options?: FilePropertyBag): File => {
  return new File([ new Uint8Array(uint8) ], name, options)
}
