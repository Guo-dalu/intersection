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

export type COLLECTION_NAME = 'A' | 'B'

export type IntersectionResult = {
	time: number // ms
	commonSize: number // size of the intersection
}
