import 'jest'
import { guard,getValue, setGuardErrorHandler } from "../index"


function throwErr() {
	throw new Error('err')
}

test(`getValue`,() => {
	let errorHandled = false
	setGuardErrorHandler(() => errorHandled = true)
	expect(getValue(() => {
		throw new Error('err')
	},1)).toBe(1)
	expect(errorHandled).toBeTruthy()
	expect(getValue(throwErr)).toBeUndefined()
	expect(getValue(() => 123,1)).toBe(123)
})

test('guard',() => {
	expect(throwErr).toThrow()
	expect(() => guard(throwErr)).not.toThrow()
})