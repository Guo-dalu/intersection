import { expect, describe, it } from 'vitest'
import isSizeValid from './isSizeValid'

describe('check is size valid', () => {
	it('check integer', () => {
		expect(isSizeValid(9.2342)).toEqual(false)
	})

	it('check min size limit', () => {
		expect(isSizeValid(-100, -88, 1)).toEqual(false)
	})

	it('check max size limit', () => {
		expect(isSizeValid(0, -2, -1)).toEqual(false)
	})
	it('this one should get passed', () => {
		expect(isSizeValid(454, 1, 999)).toEqual(true)
	})
})
