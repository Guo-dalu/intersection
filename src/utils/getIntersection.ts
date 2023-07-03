import type {
	IntersectionParams,
	IntersectionResult,
	MultipleIntersectionParams,
	MultipleIntersectionResult
} from '../app'
import { STATISTIC_LARGE_SIZE_RANGE, STATISTIC_SMALL_SIZE_RANGE } from '../constants'

/* eslint-disable  @typescript-eslint/no-explicit-any */
// get the time cost of fn, unit ms
export const measurePerformance =
	<T extends any[], R>(fn: (...args: T) => R) =>
	(...args: T): { result: R; time: number } => {
		const startTime = performance.now()
		const result = fn(...args)
		const endTime = performance.now()
		return {
			result,
			time: endTime - startTime
		}
	}
/* eslint-disable */

/**
 * Calculates the number of elements in arr1 that are also in arr2
 * do not care duplicate numbers, so if use this to compute the intersection size then which one to iterate matters
 *
 * @param {T[]} arr1 the array to be interate
 * @param {T[]} arr2 the array to be put into HashSet
 * @returns {number} the number of the intersection of arr1 and arr2
 */
export const getIntersection = <T>(arr1: T[], arr2: T[]): number => {
	const set = new Set(arr2)

	return arr1.filter((v) => set.has(v)).length
}

export const measureIntersection = measurePerformance(getIntersection)

/**
 * Create a collection with the given size and filled with random number
 * To make sure the intersection would not be either too large or too small, the range of each item is [0, size-1]
 *
 * @param {number} size size of collection(array)
 * @returns {number[]} the array of the given size and filled with random integer between 0 - (size -1)
 */
const getRandomArr = (size: number): number[] => {
	return Array.from({ length: size }).map(() => Math.round(Math.random() * (size - 1)))
}

/**
 *
 * @param {min?:number, max?:number} {min, max}
 * @returns random integer betwwen min and max
 */
export const getRandomInteger = ({ min = 0, max = 1 }: { min?: number; max?: number }): number => {
	if (max <= min) {
		throw new Error('max should be greater than min')
	}
	return min + Math.round(Math.random() * (max - min))
}

/** with collection1 of size1 and collection2 of size2, and which one to iterate over
 * get the size of the intersection aand the time cost of the function
 *
 * @param {IntersectionParams} param
 * @returns {IntersectionResult} result
 */
export const runIntersection = ({
	size1,
	size2,
	iterateCollection
}: IntersectionParams): IntersectionResult => {
	const iterateCollectionSize = iterateCollection === 'A' ? size1 : size2
	const setCollectionSize = iterateCollection === 'B' ? size1 : size2
	const iterateArr = getRandomArr(iterateCollectionSize)
	const hashSetArr = getRandomArr(setCollectionSize)

	const { time, result } = measureIntersection(iterateArr, hashSetArr)

	return {
		time,
		commonSize: result
	}
}

export const getMultipleIntersectionData = ({
	smallRange = STATISTIC_SMALL_SIZE_RANGE,
	largeRange = STATISTIC_LARGE_SIZE_RANGE,
	times
}: MultipleIntersectionParams): MultipleIntersectionResult => {
	const smallToSetList = [],
		largeToSetList = []
	for (let i = 0; i < times; i++) {
		const size1 = getRandomInteger({ min: smallRange[0], max: smallRange[1] }),
			size2 = getRandomInteger({ min: largeRange[0], max: largeRange[1] })
		const sum = size1 + size2
		const smallArr = getRandomArr(size1)
		const largeArr = getRandomArr(size2)
		const { time: largeToSetTime } = measureIntersection(smallArr, largeArr)
		largeToSetList.push({ size1, size2, sum, time: largeToSetTime })
		const { time: smallToSetTime } = measureIntersection(largeArr, smallArr)
		smallToSetList.push({ size1, size2, sum, time: smallToSetTime })
	}
	return { smallToSetList, largeToSetList }
}
