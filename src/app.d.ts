import { RUN_SINGE, RUN_MULTIPLE, ERROR_FLAG } from './constants'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}

export type CollectionName = 'A' | 'B'

export type IntersectionResult = {
	time: number // ms
	commonSize?: number // size of the intersection
}

export interface IntersectionParams {
	size1: number
	size2: number
	iterateCollection: CollectionName
}

export interface MultipleIntersectionParams {
	times: number
	smallRange?: number[]
	largeRange?: number[]
}

export type MultipleIntersectionItem = IntersectionResult & {
	size1: number
	size2: number
	sum: number
}

export type MultipleIntersectionResult = {
	smallToSetList: MultipleIntersectionItem[]
	largeToSetList: MultipleIntersectionItem[]
}

export interface MessageData {
	message: RUN_SINGE | RUN_MULTIPLE | ERROR_FLAG
	data:
		| IntersectionParams
		| IntersectionResult
		| MultipleIntersectionParams
		| MultipleIntersectionResult
}
