/** https:// 或 http:// */
export const isHttpUrl = (url: string) => /^https?:\/\//i.test(url)

/** file:// */
export const isFileUrl = (url: string) => /^file:\/\/\//i.test(url)

/** /page 或 #/page */
export const isInternalRoute = (url: string) => /^(#?\/(?!\/))/i.test(url)

/** localhost 或 127.0.0.1 或 [::1] */
export const isLocalhost = (url: string) => /^https?:\/\/(localhost|127\.0\.0\.1|\[::1])(?::\d+)?(?:\/|$)/i.test(url)
