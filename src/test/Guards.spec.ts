import jest from 'jest'
import {isNil, isNumber, isObject, isString} from "../index"

test(`isNil`,() => {
	expect(isNil(null)).toBeTruthy()
	expect(isNil(undefined)).toBeTruthy()
	expect(isNil(1)).toBeFalsy()
})

test(`isNumber`,() => {
	expect(isNumber(1)).toBeTruthy()
	expect(isNumber("1")).toBeFalsy()
})

test(`isObject`,() => {
	expect(isObject({})).toBeTruthy()
})

test(`isString`,() => {
	expect(isString(1)).toBeFalsy()
	expect(isString("1")).toBeTruthy()
})