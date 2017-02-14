
import { isNil } from "./Guards"
/**
 * Get a value in a guarded fashion
 * ensuring no exception
 *
 * @param fn
 * @param defaultValue
 * @returns {any}
 */
export function getValue<T>(fn:() => T,defaultValue:T = null):T {
	let
		result
	
	try {
		result = fn()
	} catch (err) {
	}
	
	if (isNil(result))
		result = defaultValue
	
	return result
}


/**
 * Execute a function guarded from exception
 *
 * @param fn
 * @returns {(fn:()=>any)=>(fn:()=>any)=>any}
 */
export function guard(fn:() => any) {
	try {
		fn()
	} catch (err) {
		return
	}
}