
import _isNil = require('lodash/isNil')
import _isObject = require('lodash/isObject')
import _isString = require('lodash/isString')
import _isNumber = require('lodash/isNumber')
import _isFunction = require('lodash/isFunction')

export type TNil = undefined|null

export function isNil(o:any):o is TNil {
	return _isNil(o)
}

/**
 * O is a valid object
 *
 * @param o
 */
export function isDefined<T>(o:T):o is T {
	return !isNil(o)
}

export function isObject(o:any):o is Object {
	return !isNil(o) && _isObject(o)
}

export function isPromise(o:any):o is Promise<any> {
	return !isNil(o) && isObject(o) && (o instanceof Promise || isFunction(o.then))
}


export function isObjectType<T>(o:any,type:{new():T}):o is T {
	return !isNil(o) && (o instanceof type || o.$$clazz === type.name)
}

export function isString(o:any):o is string {
	return !isNil(o) && _isString(o)
}

export function isNumber(o:any):o is number {
	return !isNil(o) && _isNumber(o) && !isNaN(o)
}

export function isFunction(o:any):o is Function {
	return !isNil(o) && _isFunction(o)
}

export function isSymbol(o:any):o is Symbol {
	return !isNil(o) && typeof o === 'symbol'
}

export type TTypeChecker<T> = (o:any) => o is T

export function makeTypeGuard<T>(type:{new():T},tester:(val:any) => boolean):TTypeChecker<T> {
	return tester as TTypeChecker<T>
}

export function toNumber(str:string|number):number {
	return isNumber(str) ? str : parseInt(str,10)
}


