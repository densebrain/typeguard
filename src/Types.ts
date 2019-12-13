
export type Optional<T> = T | null | undefined

export type ErrorHandler<E extends Error = Error> = (err: E) => void
