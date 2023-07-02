import type {
	IntersectionParams,
	IntersectionResult,
	MultipleIntersectionParams,
	MultipleIntersectionResult
} from '../app'
import { STATISTIC_MAX_SIZE, STATISTIC_MIN_SIZE } from '../constants'

/**
 * Calculates the number of elements in arr1 that are also in arr2
 * do not care duplicate numbers, so if use this to compute the intersection size then which one to iterate matters
 *
 * @param {T[]} arr1 the array to be interate
 * @param {T[]} arr2 the array to be put into HashSet
 * @returns {number} the number of the intersection of arr1 and arr2
 */
export const getIntersection = <T>(arr1: T[], arr2: T[]): number => {
	const set = new Set()
	arr2.forEach((element) => {
		set.add(element)
	})
	return arr1.filter((v) => set.has(v)).length
}

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
	const startTime = performance.now()

	const iterateCollectionSize = iterateCollection === 'A' ? size1 : size2
	const setCollectionSize = iterateCollection === 'B' ? size1 : size2
	const commonSize = getIntersection(
		getRandomArr(iterateCollectionSize),
		getRandomArr(setCollectionSize)
	)
	const endTime = performance.now()
	return {
		time: endTime - startTime,
		commonSize
	}
}

export const getMultipleIntersectionData = ({
	min = STATISTIC_MIN_SIZE,
	max = STATISTIC_MAX_SIZE,
	times,
	iterateCollection
}: MultipleIntersectionParams): MultipleIntersectionResult => {
	return Array.from({ length: times }).map(() => {
		const arr1 = getRandomArr(getRandomInteger({ min, max }))
		const arr2 = getRandomArr(getRandomInteger({ min, max }))
		const size1 = arr1.length,
			size2 = arr2.length
		const { time, commonSize } = runIntersection({ size1, size2, iterateCollection })
		return {
			size1,
			size2,
			time,
			commonSize
		}
	})
}
