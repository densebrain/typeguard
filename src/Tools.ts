
import {isNil, isPromise} from "./Guards"

export type GuardErrorHandler = (err:Error) => void

let globalErrorHandler:GuardErrorHandler | null

export function setGuardErrorHandler(errorHandler:GuardErrorHandler | null = null) {
	globalErrorHandler = errorHandler
}

/**
 * Get a value in a guarded fashion
 * ensuring no exception
 *
 * @param fn
 * @param defaultValue
 * @returns {Promise<T | void> | any}
 * @param localErrorHandler
 */
export function getValue<T>(fn:() => T, defaultValue:T = null, localErrorHandler: ((err: Error) => void) | null = null):T extends Promise<infer T2> ? Promise<T2> : T {
	const errorHandler = localErrorHandler || globalErrorHandler
	let result = null

	try {
		result = fn()
		if (isPromise(result))
			return result
				.catch(err => {
					if (errorHandler)
						errorHandler(err)

					return defaultValue
				})
				.then(value => isNil(value) ? defaultValue : value) as any
	} catch (err) {
		if (errorHandler)
			errorHandler(err)
	}

	return isNil(result) ?
		defaultValue : result
}


/**
 * Execute a function guarded from exception
 *
 * @param fn
 * @param localErrorHandler
 * @returns {(fn:()=>any)=>(fn:()=>any)=>any}
 */
export function guard<T = any>(fn:() => T, localErrorHandler: ((err: Error) => void) | null = null):void | Promise<void> {
	const value = getValue(fn, undefined, localErrorHandler)
	if (isPromise(value))
		return value.then(() => undefined as void)

}
