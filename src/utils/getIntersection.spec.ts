import { expect, describe, it } from 'vitest'
import { getIntersection } from './getIntersection'

describe('it would get the intersection of two collections', () => {
	it('with one of them is empty', () => {
		const result = getIntersection([], [1, 2, 3, 4, 5, 6, 7])
		expect(result).toBe(0)
	})
	it('without duplicate number', () => {
		const result = getIntersection([1, 2, 3, 4, 6], [6, 7, 4, 2, 100])
		expect(result).toBe(3)
	})
	it('with duplicate numbers', () => {
		const result = getIntersection([1, 1, 1, 4, 6], [1, 7, 4, 2, 100])
		expect(result).toBe(4)
	})
})
