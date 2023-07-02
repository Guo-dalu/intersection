import { expect, describe, it } from 'vitest'
import { getIntersection, getRandomInteger } from './getIntersection'

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

describe('it would get random integer between min and max', () => {
	it('with min = 1 and max = 90'),
		() => {
			expect(getRandomInteger({ min: 1, max: 90 })).toBeLessThanOrEqual(90)
			expect(getRandomInteger({ min: 1, max: 90 })).toBeGreaterThanOrEqual(1)
		}
	it('with max <= min throws error'),
		() => {
			expect(getRandomInteger({ max: -222 })).toThrowError()
		}
})
